'use client';

import React, { useRef } from 'react';
import { Button } from './Button';
import { motion, useScroll, useTransform } from 'framer-motion';

// Fix: Make the prop optional to match usage in Home component
export const Hero: React.FC<{ onExplore?: (id: string) => void }> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden transition-colors bg-white dark:bg-[#020617] w-full px-4 pt-20"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[-10%] right-[-10%] w-[120%] md:w-[1200px] h-[120%] md:h-[1200px] bg-cyan/5 dark:bg-cyan/10 rounded-full blur-[80px] md:blur-[200px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[120%] md:w-[1000px] h-[120%] md:h-[1000px] bg-brand/5 dark:bg-brand/10 rounded-full blur-[80px] md:blur-[200px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto py-12 md:py-20">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter leading-[0.9] mb-6 md:mb-10 text-slate-900 dark:text-white transition-colors">
              <span className="block uppercase">Industrial</span>
              <span className="text-vibrant italic font-light drop-shadow-[0_10px_30px_rgba(0,173,239,0.3)]">Synergy.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }} 
            className="max-w-3xl mx-auto text-lg sm:text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium mb-10 md:mb-16 leading-snug tracking-tight px-4"
          >
            Synchronizing 8 sovereign divisions into a singular engine of <span className="text-slate-900 dark:text-white font-black italic">global impact.</span>
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center px-4">
            <Button 
              onClick={() => onExplore?.('hub')} 
              className="w-full sm:w-auto !px-8 md:!px-16 !py-6 md:!py-10 !text-sm md:!text-xl !rounded-full shadow-vibrant hover:scale-105"
            >
              LAUNCH LATTICE
            </Button>
            
            <div className="w-full sm:w-auto flex items-center gap-6 md:gap-10 px-6 md:px-10 py-5 md:py-8 rounded-[30px] md:rounded-full glass-card border-slate-200 dark:border-white/10 shadow-giant backdrop-blur-3xl transition-all">
              <div className="text-left">
                <div className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Sync</div>
                <div className="text-xl md:text-3xl font-display font-black text-brand dark:text-cyan tracking-tighter italic leading-none">OPTIMAL</div>
              </div>
              <div className="w-px h-10 md:h-16 bg-slate-200 dark:bg-white/10" />
              <div className="text-right">
                <div className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Impact</div>
                <div className="text-xl md:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-none">8 NODES</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};