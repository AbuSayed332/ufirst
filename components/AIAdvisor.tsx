'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'USI Strategic Intelligence v5.0 Active. Neural lattice established. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "Processing your request through strategic nodes...",
        "Analyzing global market data for optimal insights...",
        "Cross-referencing with 8 sovereign division databases...",
        "Neural lattice response: Further analysis required for comprehensive results.",
        "Strategic recommendation generated. Deployment protocols initiated.",
        "CORE_OFFLINE: Simulated response - Real API integration required for live data."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: randomResponse
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[2000] w-14 h-14 md:w-20 md:h-20 bg-brand rounded-full shadow-intense flex items-center justify-center border border-cyan/40 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan/30 to-transparent" />
        <span className="text-2xl z-10 transition-transform duration-500 group-hover:scale-110">{isOpen ? '✕' : '🦾'}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-4 left-4 md:left-auto md:right-10 md:w-[450px] h-[700px] glass-card rounded-[40px] shadow-intense overflow-hidden flex flex-col border border-white/10 z-[2000] !bg-slate-900/95"
          >
            <div className="p-8 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/40 shadow-vibrant">
                  <span className="text-cyan text-sm font-black">U.S.I</span>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Sovereign_OS v5.0</h3>
                  <p className="text-[8px] font-mono text-green-500 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 
                    SIMULATED_MODE
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-black text-cyan/60 uppercase tracking-widest">
                Demo Version
              </div>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-6 rounded-[24px] text-[11px] font-medium leading-relaxed ${
                    m.role === 'user' ? 'bg-brand text-white' : 'bg-white/10 text-slate-100 border border-white/5 shadow-lg'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3 text-cyan font-mono text-[8px] animate-pulse p-4">
                  <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
                  ANALYZING_GLOBAL_NODES...
                </div>
              )}
            </div>

            <div className="p-8 bg-white/5 border-t border-white/5 space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query Strategic Nodes..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-[11px] font-mono text-white outline-none focus:border-cyan/40 transition-all"
                />
                <button 
                  onClick={handleSend} 
                  disabled={isTyping || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-cyan flex items-center justify-center text-brand shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};