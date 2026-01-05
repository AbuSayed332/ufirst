import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businesses } from '../data/businesses';

const ArchitectureLab: React.FC<{ arch: string }> = ({ arch }) => {
  const bitFields = {
    MIPS: [
      { name: 'Opcode', bits: 6, color: 'bg-brand' },
      { name: 'RS', bits: 5, color: 'bg-cyan' },
      { name: 'RT', bits: 5, color: 'bg-cyan' },
      { name: 'RD', bits: 5, color: 'bg-cyan' },
      { name: 'Shamt', bits: 5, color: 'bg-orange' },
      { name: 'Funct', bits: 6, color: 'bg-brand' },
    ],
    ARM: [
      { name: 'Cond', bits: 4, color: 'bg-brand' },
      { name: 'Op', bits: 2, color: 'bg-orange' },
      { name: 'S', bits: 1, color: 'bg-cyan' },
      { name: 'Rn', bits: 4, color: 'bg-cyan' },
      { name: 'Rd', bits: 4, color: 'bg-cyan' },
      { name: 'Operand2', bits: 12, color: 'bg-brand' },
      { name: 'Pad', bits: 5, color: 'bg-slate-200' },
    ],
    x86: [
      { name: 'Prefix', bits: 8, color: 'bg-slate-400' },
      { name: 'Opcode', bits: 8, color: 'bg-brand' },
      { name: 'ModRM', bits: 8, color: 'bg-cyan' },
      { name: 'SIB', bits: 8, color: 'bg-orange' },
      { name: 'Disp', bits: 16, color: 'bg-brand' },
      { name: 'Imm', bits: 16, color: 'bg-cyan' },
    ]
  };

  const selectedFields = bitFields[arch as keyof typeof bitFields] || bitFields.MIPS;

  return (
    <div className="mt-8 p-6 md:p-10 rounded-[35px] bg-slate-900 border border-white/5 shadow-giant overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan mb-1">Architecture Laboratory</h4>
          <p className="text-lg font-display font-black text-white italic">Synthetic {arch} Decoding</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="flex w-full h-12 md:h-16 rounded-2xl overflow-hidden border border-white/10 p-1">
            {selectedFields.map((field, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${(field.bits / selectedFields.reduce((acc, curr) => acc + curr.bits, 0)) * 100}%` }}
                className={`${field.color} border-r border-black/10 flex items-center justify-center relative`}
              >
                <span className="text-[7px] md:text-[9px] font-mono font-black text-white/90 truncate px-1">
                  {field.name}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[7px] font-mono text-slate-500 uppercase tracking-widest">
            <span>MSB [31]</span>
            <span>LSB [0]</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium bg-white/5 p-4 rounded-xl border border-white/5 italic">
          Mastering low-level bit-field logic is essential for the development of sovereign-grade firmware kernels within the uFirst ecosystem.
        </p>
      </div>
    </div>
  );
};

export const AcademyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState(businesses[0].id);
  const current = businesses.find(p => p.id === activeTab) || businesses[0];

  return (
    <section id="academy" className="py-20 md:py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#00adef 1px, transparent 1px), linear-gradient(90deg, #00adef 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-6">
              <span className="w-12 h-2 bg-brand rounded-full"></span>
              <span className="text-cyan font-black text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.8em]">Industrial Masterclass</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] italic">
              Division <br/><span className="text-vibrant">Mastery.</span>
            </h2>
          </div>
          <p className="text-lg text-slate-400 font-medium italic border-l-4 border-cyan pl-6 max-w-xs hidden md:block">
             "Synchronizing global industrial expertise into a single mastery hub."
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_2.2fr] gap-8 items-start">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
            {businesses.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`shrink-0 text-left px-6 py-5 rounded-[25px] border transition-all duration-300 relative overflow-hidden ${
                  activeTab === p.id 
                    ? 'bg-brand text-white border-brand shadow-vibrant' 
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-white/5 hover:border-cyan/20'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="text-[10px] font-display font-black tracking-tight italic leading-tight">{p.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 md:p-16 rounded-[40px] md:rounded-[60px] border-brand/5 shadow-intense relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <div className="text-[15rem] font-display font-black italic leading-none">{current.icon}</div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-[8px] font-black uppercase tracking-widest border border-cyan/20">Industrial Protocol v7.2</div>
                </div>

                <h3 className="text-4xl md:text-7xl font-display font-black text-brand dark:text-cyan tracking-tighter mb-8 italic leading-[0.9]">
                  {current.name}
                </h3>
                
                <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 font-medium leading-tight mb-8 tracking-tight italic border-l-4 border-orange pl-8">
                  {current.description}
                </p>

                <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-3xl font-medium">
                   {current.longDescription}
                </p>

                {activeTab === 'academy' && (
                  <div className="grid md:grid-cols-2 gap-4">
                     <ArchitectureLab arch="MIPS" />
                     <ArchitectureLab arch="ARM" />
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                  {current.features.map((f: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: number) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[30px] border border-slate-100 dark:border-white/5">
                      <div className="w-10 h-10 rounded-full bg-cyan/10 text-cyan flex items-center justify-center mb-4 font-black text-sm">0{i+1}</div>
                      <p className="text-[12px] text-slate-900 dark:text-white font-black leading-tight uppercase tracking-tight">{f}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-6">
                   <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" /> ISO 9001:2015 REGISTERED
                   </span>
                   <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> SOVEREIGN ARCHITECTURE
                   </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};