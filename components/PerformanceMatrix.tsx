import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PerformanceMatrix: React.FC = () => {
  const [stats, setStats] = useState([
    { label: 'Uptime Protocol', value: 99.98, unit: '%', detail: 'NODE_DHAKA_HQ' },
    { label: 'Neural Sync Load', value: 842, unit: 'TPS', detail: 'LATTICE_BUS' },
    { label: 'Strategic Reach', value: 12, unit: 'NODES', detail: 'GLOBAL_SYNC' },
    { label: 'Latency Alpha', value: 8.4, unit: 'MS', detail: 'EDGE_RELAY' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(s => ({
        ...s,
        value: s.value + (Math.random() - 0.5) * 0.002
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card p-6 md:p-8 rounded-[30px] md:rounded-[40px] relative group overflow-hidden border-slate-100 dark:border-white/5 hover:border-cyan/30 transition-all duration-500 shadow-industrial"
        >
          {/* Subtle Background Neural Pulse */}
          <div className="absolute inset-0 bg-cyan/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono text-cyan tracking-[0.2em] font-black uppercase">{stat.detail}</span>
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#f58220]" 
              />
            </div>
            
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">{stat.label}</h4>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-5xl font-display font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                {stat.value.toFixed(2)}
              </span>
              <span className="text-[10px] text-orange font-mono font-black uppercase">{stat.unit}</span>
            </div>

            <div className="h-[2px] w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 animate={{ x: ['-100%', '200%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                 className="absolute top-0 h-full bg-cyan w-1/3 blur-[1px]"
               />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};