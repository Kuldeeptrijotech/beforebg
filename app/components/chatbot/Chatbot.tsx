"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatHistoryMessage, ChatResponse, ChatbotSettings } from "@/app/types/chatbot";
import "./chatbot.css";

type UiMessage = ChatHistoryMessage & { id: string; error?: boolean; sources?: ChatResponse["sources"] };
const welcome: UiMessage = { id: "welcome", role: "assistant", content: "Hello! I’m the Trijotech AI assistant. I’m here to help with our services, SAP topics, technology questions, careers, and getting in touch. What would you like to explore?" };
const conversation = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const newConversation = (welcomeMessage = welcome.content): { id: string; messages: UiMessage[] } => ({ id: conversation(), messages: [{ ...welcome, content: welcomeMessage }] });

function SafeText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/?[^)]+\))/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/); if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((\/[^)]+|mailto:[^\s)]+)\)$/); if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return <span key={index}>{part.replace(/\n/g, "\n")}</span>;
  })}</>;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false); const [state, setState] = useState<{ id: string; messages: UiMessage[] } | null>(null); const [input, setInput] = useState(""); const [loading, setLoading] = useState(false); const [unread, setUnread] = useState(0);
  const [settings, setSettings] = useState<Pick<ChatbotSettings, "enabled" | "assistantName" | "welcomeMessage" | "suggestedQuestions" | "contactButton" | "maximumMessageLength"> | null>(null); const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null); const endRef = useRef<HTMLDivElement>(null); const abortRef = useRef<AbortController | null>(null); const lastFailed = useRef<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const response = await fetch("/api/chat/settings", { cache: "no-store" });
        const next = await response.json();
        if (!active) return;
        const normalized = {
          enabled: next.enabled !== false,
          assistantName: typeof next.assistantName === "string" && next.assistantName.trim() ? next.assistantName : "Trijotech AI Assistant",
          welcomeMessage: typeof next.welcomeMessage === "string" && next.welcomeMessage.trim() ? next.welcomeMessage : welcome.content,
          suggestedQuestions: Array.isArray(next.suggestedQuestions) && next.suggestedQuestions.length ? next.suggestedQuestions : ["Our Services", "About Trijotech", "Career Opportunities", "Contact Our Team"],
          contactButton: next.contactButton !== false,
          maximumMessageLength: Number.isFinite(next.maximumMessageLength) ? next.maximumMessageLength : 2000,
        };
        setSettings(normalized);
        setSuggestions(normalized.suggestedQuestions);
        setState((current) => current ?? newConversation(normalized.welcomeMessage));
      } catch {
        if (!active) return;
        const fallback = { enabled: true, assistantName: "Trijotech AI Assistant", welcomeMessage: welcome.content, suggestedQuestions: ["Our Services", "About Trijotech", "Career Opportunities", "Contact Our Team"], contactButton: true, maximumMessageLength: 2000 };
        setSettings(fallback);
        setSuggestions(fallback.suggestedQuestions);
        setState((current) => current ?? newConversation(fallback.welcomeMessage));
      }
    };
    void hydrate();
    return () => { active = false; };
  }, []);
  useEffect(() => { if (open) { setUnread(0); requestAnimationFrame(() => inputRef.current?.focus()); void fetch("/api/chat/analytics", { method: "POST" }); } }, [open]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state?.messages, loading]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "Escape" && open) setOpen(false); }; document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function send(value = input) {
    const message = value.trim(); if (!message || loading || !state || message.length > 2000) return;
    setInput(""); setLoading(true); lastFailed.current = "";
    const user: UiMessage = { id: conversation(), role: "user", content: message }; const nextMessages = [...state.messages, user]; setState({ ...state, messages: nextMessages });
    const controller = new AbortController(); abortRef.current = controller;
    try {
      const history = state.messages.filter((item) => item.id !== "welcome" && !item.error).slice(-8).map(({ role, content }) => ({ role, content }));
      const response = await fetch("/api/chat", { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, conversationId: state.id, history }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Sorry, I could not complete that request right now.");
      const assistant: UiMessage = { id: conversation(), role: "assistant", content: data.message, sources: data.sources }; setSuggestions(data.suggestions || settings?.suggestedQuestions || []); setState((current) => current ? { id: data.conversationId || current.id, messages: [...current.messages, assistant] } : current); if (!open) setUnread((count) => count + 1);
    } catch (error) { if ((error as Error).name !== "AbortError") { lastFailed.current = message; setState((current) => current ? { ...current, messages: [...current.messages, { id: conversation(), role: "assistant", error: true, content: navigator.onLine ? (error as Error).message : "You appear to be offline. Check your connection and try again." }] } : current); } }
    finally { if (abortRef.current === controller) abortRef.current = null; setLoading(false); }
  }
  function clear() { abortRef.current?.abort(); setState(newConversation(settings?.welcomeMessage)); setSuggestions(settings?.suggestedQuestions || []); setInput(""); setLoading(false); }
  if (!state || !settings?.enabled) return null;
  return <div ref={chatRef} className={`trijo-chat ${open ? "is-open" : ""}`}>
    {open && <section className="trijo-chat-window" role="dialog" aria-modal="false" aria-label="Trijotech AI assistant">
      <header><div className="trijo-chat-avatar" aria-hidden="true">T</div><div><strong>{settings.assistantName}</strong><span><i /> Online assistant</span></div><button type="button" onClick={clear} aria-label="Clear chat" title="Clear chat">↻</button><button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">×</button></header>
      <div className="trijo-chat-messages" aria-live="polite">{state.messages.map((message) => <div key={message.id} className={`trijo-message ${message.role} ${message.error ? "error" : ""}`}><div><SafeText text={message.content} />{message.sources?.length ? <small>Sources: {message.sources.map((source, index) => <span key={source.id}>{index > 0 && " · "}{source.url ? <a href={source.url}>{source.title}</a> : source.title}</span>)}</small> : null}{message.error && lastFailed.current && <button type="button" onClick={() => send(lastFailed.current)}>Retry</button>}</div></div>)}{loading && <div className="trijo-message assistant is-typing"><div className="trijo-typing" aria-label="Assistant is typing"><i /><i /><i /></div><span className="trijo-typing-label">Trijotech is typing…</span></div>}<div ref={endRef} /></div>
      {suggestions.length > 0 && <div className="trijo-starters">{suggestions.map((question) => <button type="button" key={question} onClick={() => send(question)}>{question}</button>)}</div>}
      <form onSubmit={(event) => { event.preventDefault(); void send(); }}><textarea ref={inputRef} value={input} maxLength={settings.maximumMessageLength} rows={1} placeholder="Ask about our services…" aria-label="Chat message" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }} /><button type="submit" disabled={!input.trim() || loading} aria-label="Send message">➤</button></form>
      <p className="trijo-chat-note">AI responses may need verification. Don’t share confidential information.</p>
    </section>}
    <button type="button" className="trijo-chat-launcher" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close AI assistant" : "Open AI assistant"}><span aria-hidden="true">{open ? "×" : "✦"}</span>{unread > 0 && <b aria-label={`${unread} unread message`}>{unread}</b>}</button>
  </div>;
}
