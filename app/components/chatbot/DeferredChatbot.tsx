"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(idle);
    }

    const timer = globalThis.setTimeout(() => setReady(true), 500);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return ready ? <Chatbot /> : null;
}
