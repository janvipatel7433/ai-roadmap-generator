'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input'; // use new Input
import { Button } from '@/components/ui/button';
import { Send, MessageCircle, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat({ email }) {
  const formRef = useRef(null);
  const bottomRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // <-- NEW

  const {
    messages,
    handleSubmit,
    input,
    handleInputChange,
    setMessages,
  } = useChat({ body: { email } });

  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          const defaultMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Hi 👋 How may I help you?',
          };
          setMessages([defaultMessage]);
        }
      } catch (e) {
        console.error("Failed to parse chatMessages", e);
        const defaultMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hi 👋 How may I help you?',
        };
        setMessages([defaultMessage]);
      }
    } else {
      const defaultMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hi 👋 How may I help you?',
      };
      setMessages([defaultMessage]);
    }

    setIsMounted(true);
  }, [setMessages]);


  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const clearChat = () => {
    const defaultMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Hi 👋 How may I help you?',
    };
    const initialMessages = [defaultMessage];
    setMessages(initialMessages);
    localStorage.setItem('chatMessages', JSON.stringify(initialMessages));
  };

  // ⬇️ Wrap handleSubmit to toggle isTyping
  const customHandleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="h-screen w-full text-white flex items-center justify-center">
      <div className="w-full max-w-2xl flex flex-col h-full py-8 px-10 bg-white/20 text-white rounded-lg shadow-md">
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
            >
              {m.role === 'assistant' && (
                <Bot size={22} className="text-white mt-1" />
              )}
              <div
                className={`max-w-[80%] md:max-w-[70%] px-4 py-3 text-sm break-words shadow prose message-content prose-sm
                  ${m.role === 'user'
                    ? 'bg-gradient-to-r from-[#d64590] to-[#f0657d] text-white rounded'
                    : 'bg-white text-black rounded'
                  }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Typing bubble */}
          {/* Typing bubble */}
          {input && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start items-start gap-2 animate-pulse">
              <MessageCircle size={22} className="text-white mt-1" />
              <div className="bg-white text-black rounded px-4 py-3 text-sm shadow">
                Typing...
              </div>
            </div>
          )}


          <div ref={bottomRef} />
        </div>

        <div className="">
          <form onSubmit={customHandleSubmit} ref={formRef} className="relative max-w-2xl mx-auto">
            <Input
              className="w-full text-white focus-visible:outline-none bg-black/40 border-2 border-white/20 placeholder-white rounded py-3 px-5 pr-12 resize-none"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-[#d64590] to-[#f0657d] text-white rounded-full hover:opacity-90"
            >
              <Send size={20} />
            </Button>
          </form>

          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={clearChat}
              className="py-3 w-full bg-gradient-to-r from-[#d64590] to-[#f0657d] text-white border-0 rounded-md shadow-[0_0_0_2px_rgba(255,255,255,0.3)] cursor-pointer transition-all duration-500 ease-in-out whitespace-nowrap"
            >
              New Chat
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
