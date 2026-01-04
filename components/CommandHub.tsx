import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businesses } from '../data/businesses';

interface CommandHubProps {
  onNodeClick: (id: string) => void;
}

export const CommandHub: React.FC<CommandHubProps> = ({ onNodeClick }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<number[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    setTelemetry(new Array(20).fill(0).map(() => 20 + Math.random() * 80));
    const interval = setInterval(() => {
      setTelemetry(prev => prev.map(t => Math.max(10, Math.min(100, t + (Math.random() - 0.5) * 15))));
    }, 2000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 1024;

  return (
    <section id="hub" className="py-20 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-[#020617] w-full">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-12">
           <div className="max-w-4xl">
              <div className="flex items-center gap-8 mb-10">
                 <div className="w-24 h-2 bg-cyan rounded-full shadow-vibrant" />
                 <span className="text-cyan font-black text-xs md:text-sm uppercase tracking-[1em]">Industrial Lattice</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter italic">
                Strategic <br/><span className="text-vibrant">Ecosystem.</span>
              </h2>
           </div>
           
           {!isMobile && (
             <div className="p-8 glass-card rounded-[40px] min-w-[320px] border border-white/5 hidden lg:block">
                <div className="flex justify-between items-center mb-8">
                  <div className="space-y-1">
                     <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Neural_Sync_Stream</div>
                     <div className="text-2xl font-display font-black text-brand dark:text-cyan italic">OPTIMAL_SYNC</div>
                  </div>
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e]" 
                  />
                </div>
                <div className="flex gap-1 h-16 items-end">
                   {telemetry.map((t, i) => (
                     <motion.div key={i} animate={{ height: `${t}%` }} className="flex-1 bg-cyan/40 rounded-t-sm" />
                   ))}
                </div>
             </div>
           )}
        </div>

        {isMobile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {businesses.map((biz, idx) => (
              <motion.button 
                key={biz.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNodeClick(biz.id)}
                className="flex flex-col items-center gap-6 p-10 bg-white dark:bg-slate-900 rounded-[35px] border border-slate-100 dark:border-white/5 shadow-giant"
              >
                <span className="text-6xl">{biz.icon}</span>
                <div className="text-center">
                   <span className="block text-[12px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1 italic">{biz.name}</span>
                   <span className="text-[9px] font-mono text-cyan/60 uppercase tracking-widest">SYNC_NODE_0x{idx}</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative h-[800px] flex items-center justify-center">
            {/* MASTER NODE */}
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="w-64 h-64 rounded-full bg-brand flex items-center justify-center border-[10px] border-white/10 shadow-[0_0_120px_rgba(0,75,147,0.3)] relative z-20"
            >
              <div className="text-center">
                 <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] mb-2">Master Node</div>
                 <div className="text-6xl font-display font-black text-white italic tracking-tighter">uFIRST</div>
              </div>
            </motion.div>

            {/* Strategic Division Nodes */}
            {businesses.map((biz, idx) => {
              const angle = (idx / businesses.length) * Math.PI * 2;
              const radius = 350;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = activeNode === biz.id;

              return (
                <div key={biz.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    style={{ x, y }}
                    onMouseEnter={() => setActiveNode(biz.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => onNodeClick(biz.id)}
                    className="group cursor-pointer flex flex-col items-center pointer-events-auto"
                  >
                    <div className={`w-28 h-28 rounded-[35px] bg-white dark:bg-slate-900 border-4 transition-all duration-500 flex items-center justify-center text-5xl shadow-xl relative z-10 ${
                      isActive ? 'border-cyan scale-110 shadow-vibrant' : 'border-slate-100 dark:border-white/5'
                    }`}>
                      {biz.icon}
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: 15 }} 
                          className="absolute top-full mt-6 glass-card p-6 rounded-[30px] border border-cyan/40 whitespace-nowrap z-40"
                        >
                          <div className="text-xl font-display font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{biz.name}</div>
                          <div className="text-[9px] font-mono text-cyan uppercase tracking-widest mt-2">Dossier: ACCESS_GRANTED</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Connectors */}
                    <svg className="absolute -z-10 w-[800px] h-[800px] pointer-events-none overflow-visible">
                      <motion.line 
                        x1="0" y1="0" x2={-x} y2={-y} 
                        stroke={isActive ? "#00adef" : "rgba(0,173,239,0.05)"}
                        strokeWidth={isActive ? "4" : "1"}
                        strokeDasharray={isActive ? "none" : "8 8"}
                        className="transition-all duration-500"
                      />
                    </svg>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};