import React from 'react';
import { motion } from 'framer-motion';

export const Leadership: React.FC = () => {
  const leader = {
    role: "Managing Director & CEO",
    name: "Engr. Md. Nur Alam Sumon",
    credentials: "B.Sc Engr. in CSE (RUET), ACMPian 4.0 (IBA, DU)",
    bio: "A visionary engineer and strategic leader architecting the future of multi-sector excellence. Engr. Sumon leads uFirst Limited with a philosophy of absolute precision.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    tag: "EXECUTIVE_SOVEREIGNTY",
    stats: [
      { label: "Engineering Excellence", value: 100 },
      { label: "Strategic Leadership", value: 98 },
      { label: "Industrial Logic", value: 99 }
    ]
  };

  return (
    <section id="leadership" className="py-24 md:py-48 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-brand/5 dark:bg-cyan/5 rounded-[60px] blur-[60px]"></div>
            <div className="relative glass-card p-10 md:p-16 rounded-[60px] border-brand/10 shadow-2xl transition-colors">
              <div className="flex items-center gap-4 mb-10">
                 <span className="w-12 h-1.5 bg-orange rounded-full"></span>
                 <span className="text-brand dark:text-cyan font-black text-xs md:text-sm uppercase tracking-[0.6em] transition-colors">The Core Logic</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-brand dark:text-cyan tracking-tighter leading-[0.9] italic mb-10">
                Visionary <br/><span className="text-slate-900 dark:text-white">Leadership.</span>
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white dark:bg-slate-800 rounded-[35px] border border-slate-100 dark:border-white/5 shadow-sm">
                   <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter mb-1">{leader.name}</h3>
                   <p className="text-cyan font-black text-[10px] md:text-xs tracking-widest uppercase mb-3">{leader.credentials}</p>
                   <p className="text-slate-400 font-black text-sm md:text-base tracking-[0.2em] uppercase">{leader.role}</p>
                </div>
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-300 leading-snug font-medium italic">
                  "{leader.bio}"
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-10">
            <div className="grid gap-6">
              {leader.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{stat.label}</span>
                    <span className="text-2xl md:text-3xl font-display font-black text-brand dark:text-cyan">{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-brand to-cyan shadow-vibrant"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 grid grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-[35px] text-center border-orange/10 transition-colors">
                <div className="text-3xl md:text-5xl font-display font-black text-orange mb-1">128+</div>
                <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Nodes Managed</div>
              </div>
              <div className="glass-card p-8 rounded-[35px] text-center border-brand/10 transition-colors">
                <div className="text-3xl md:text-5xl font-display font-black text-brand dark:text-cyan mb-1">∞</div>
                <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Pursuit Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
