"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatHistoryMessage, ChatResponse, ChatbotSettings } from "@/app/types/chatbot";

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
  return <div ref={chatRef} className={`fixed bottom-6 right-6 z-[60] font-[Arial,Helvetica,sans-serif] max-[520px]:bottom-3 max-[520px]:right-3 [&_.trijo-chat-launcher]:relative [&_.trijo-chat-launcher]:grid [&_.trijo-chat-launcher]:h-[58px] [&_.trijo-chat-launcher]:w-[58px] [&_.trijo-chat-launcher]:cursor-pointer [&_.trijo-chat-launcher]:place-items-center [&_.trijo-chat-launcher]:rounded-full [&_.trijo-chat-launcher]:border [&_.trijo-chat-launcher]:border-cyan-300/35 [&_.trijo-chat-launcher]:bg-[linear-gradient(145deg,#111827,#071827_62%,#0891b2)] [&_.trijo-chat-launcher]:text-cyan-100 [&_.trijo-chat-launcher]:shadow-[0_16px_38px_rgba(3,7,19,.38),0_0_0_5px_rgba(34,211,238,.08)] [&_.trijo-chat-launcher]:transition [&_.trijo-chat-window]:absolute [&_.trijo-chat-window]:bottom-[74px] [&_.trijo-chat-window]:right-0 [&_.trijo-chat-window]:flex [&_.trijo-chat-window]:h-[min(440px,calc(100vh-180px))] [&_.trijo-chat-window]:w-[min(390px,calc(100vw-32px))] [&_.trijo-chat-window]:flex-col [&_.trijo-chat-window]:overflow-hidden [&_.trijo-chat-window]:rounded-[20px] [&_.trijo-chat-window]:border [&_.trijo-chat-window]:border-white/10 [&_.trijo-chat-window]:bg-[#0b1020] [&_.trijo-chat-window]:text-white [&_.trijo-chat-window]:shadow-[0_28px_80px_rgba(3,7,19,.56)] [&_.trijo-chat-window>header]:flex [&_.trijo-chat-window>header]:min-h-[72px] [&_.trijo-chat-window>header]:items-center [&_.trijo-chat-window>header]:gap-[10px] [&_.trijo-chat-window>header]:border-b [&_.trijo-chat-window>header]:border-white/10 [&_.trijo-chat-window>header]:bg-[linear-gradient(120deg,#050817,#101827_70%,#083344)] [&_.trijo-chat-window>header]:px-[15px] [&_.trijo-chat-window>header]:py-[14px] [&_.trijo-chat-avatar]:grid [&_.trijo-chat-avatar]:h-[42px] [&_.trijo-chat-avatar]:w-[42px] [&_.trijo-chat-avatar]:shrink-0 [&_.trijo-chat-avatar]:place-items-center [&_.trijo-chat-avatar]:rounded-[13px] [&_.trijo-chat-avatar]:border [&_.trijo-chat-avatar]:border-cyan-300/30 [&_.trijo-chat-avatar]:bg-cyan-400/10 [&_.trijo-chat-avatar]:font-extrabold [&_.trijo-chat-avatar]:text-cyan-200 [&_.trijo-chat-messages]:flex-1 [&_.trijo-chat-messages]:overflow-y-auto [&_.trijo-chat-messages]:bg-[#080d19] [&_.trijo-chat-messages]:px-[14px] [&_.trijo-chat-messages]:py-[17px] [&_.trijo-message]:mb-[11px] [&_.trijo-message]:flex [&_.trijo-message.user]:justify-end [&_.trijo-message>div]:max-w-[84%] [&_.trijo-message>div]:whitespace-pre-wrap [&_.trijo-message>div]:rounded-[14px] [&_.trijo-message>div]:border [&_.trijo-message>div]:border-white/10 [&_.trijo-message>div]:bg-[#141b2b] [&_.trijo-message>div]:px-3 [&_.trijo-message>div]:py-[9px] [&_.trijo-message>div]:text-[12px] [&_.trijo-message>div]:leading-[1.55] [&_.trijo-message>div]:text-white/75 [&_.trijo-message.user>div]:border-cyan-400/25 [&_.trijo-message.user>div]:bg-[linear-gradient(135deg,#0e7490,#155e75)] [&_.trijo-message.user>div]:text-cyan-50 [&_.trijo-starters]:flex [&_.trijo-starters]:gap-[6px] [&_.trijo-starters]:overflow-x-auto [&_.trijo-starters]:border-t [&_.trijo-starters]:border-white/10 [&_.trijo-starters]:px-[11px] [&_.trijo-starters]:py-[9px] [&_.trijo-chat-window>form]:flex [&_.trijo-chat-window>form]:items-end [&_.trijo-chat-window>form]:gap-2 [&_.trijo-chat-window>form]:border-t [&_.trijo-chat-window>form]:border-white/10 [&_.trijo-chat-window>form]:px-3 [&_.trijo-chat-window>form]:py-[11px] max-[520px]:[&_.trijo-chat-window]:fixed max-[520px]:[&_.trijo-chat-window]:inset-x-2 max-[520px]:[&_.trijo-chat-window]:bottom-2 max-[520px]:[&_.trijo-chat-window]:top-[88px] max-[520px]:[&_.trijo-chat-window]:h-auto max-[520px]:[&_.trijo-chat-window]:w-auto ${open ? "is-open max-[520px]:[&_.trijo-chat-launcher]:hidden" : ""}`}>
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
