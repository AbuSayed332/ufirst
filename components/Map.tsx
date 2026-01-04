import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

export const CustomMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'strategic' | 'live'>('strategic');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const officeLocation = "Road #16, House #984, Baitul Aman, Dhaka, Bangladesh";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeLocation)}`;
  // Precise embed for uFirst Limited area in Mohammadpur/Adabar
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902269994273!2d90.3582498!3d23.7508608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf6000000001%3A0x8979a405906f30d0!2suFirst%20Limited!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd`;

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
        <div className="w-full md:w-auto">
          <h5 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] md:tracking-[1em] text-cyan mb-2 md:mb-4 flex items-center gap-4">
            <span className="w-6 md:w-8 h-px bg-cyan"></span> Global Operational Hub
          </h5>
          <p className="text-4xl md:text-7xl font-display font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
            HQ <span className="text-vibrant">Location.</span>
          </p>
        </div>
        
        <div className="flex gap-2 md:gap-4 p-1.5 md:p-2 bg-slate-100 dark:bg-white/5 rounded-full backdrop-blur-3xl border border-white/5 w-full md:w-auto overflow-hidden">
          <button 
            onClick={() => setViewMode('strategic')}
            className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'strategic' ? 'bg-cyan text-white shadow-lg' : 'text-slate-400 hover:text-dark dark:hover:text-white'}`}
          >
            Tactical
          </button>
          <button 
            onClick={() => setViewMode('live')}
            className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'live' ? 'bg-orange text-white shadow-lg' : 'text-slate-400 hover:text-dark dark:hover:text-white'}`}
          >
            Satellite
          </button>
        </div>
      </div>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
        style={{ rotateX, rotateY, perspective: 1500, transformStyle: 'preserve-3d' }}
        className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] bg-slate-900 rounded-[30px] md:rounded-[60px] overflow-hidden group shadow-giant border border-white/5"
      >
        <AnimatePresence mode="wait">
          {viewMode === 'strategic' ? (
            <motion.div key="strategic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute inset-0 opacity-10 architectural-grid" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <motion.div animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-cyan rounded-full blur-[60px] md:blur-[100px] -m-10 md:m-[-80px]" />
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 md:border-4 border-cyan flex items-center justify-center animate-pulse relative z-10">
                      <div className="w-2 h-2 md:w-4 md:h-4 bg-orange rounded-full shadow-[0_0_20px_rgba(245,130,32,1)]" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 whitespace-nowrap text-center z-10">
                       <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">Active_Node_0x1</div>
                       <div className="text-[16px] font-display font-black text-white italic tracking-tighter">MOHAMMADPUR, DHAKA</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950">
                <iframe
                  width="100%" height="100%" frameBorder="0" 
                  style={{ border:0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)' }}
                  src={embedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
            </motion.div>
          )}
        </AnimatePresence>

        {/* TERMINAL OVERLAY */}
        <div className="absolute top-8 left-8 w-64 md:w-80 z-20 hidden lg:block" style={{ transform: 'translateZ(100px)' }}>
          <div className="backdrop-blur-3xl bg-slate-950/90 p-6 md:p-8 rounded-[35px] md:rounded-[45px] border border-white/10 shadow-2xl space-y-6 md:space-y-8">
             <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[9px] md:text-[10px] font-mono text-cyan/60">{currentTime} UTC</div>
             </div>
             
             <div className="font-mono text-[10px] md:text-[11px] space-y-3 md:space-y-4">
                <div className="text-white/40 uppercase tracking-widest font-black">HQ_TELEMETRY:</div>
                <div className="text-cyan flex justify-between"><span>NODE:</span> <span className="text-white">DHAKA_CENTRAL</span></div>
                <div className="text-cyan flex justify-between"><span>SYNC:</span> <span className="text-white">ESTABLISHED</span></div>
                <div className="text-cyan flex justify-between"><span>LOAD:</span> <span className="text-white">OPTIMAL</span></div>
             </div>

             <div className="pt-4 border-t border-white/10">
                <button 
                  onClick={() => window.open(directionsUrl, '_blank')}
                  className="w-full py-4 bg-cyan text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-vibrant"
                >
                  Get Navigation Data
                </button>
             </div>
          </div>
        </div>

        {/* MOBILE OVERLAY INFO */}
        <div className="absolute top-4 left-4 right-4 z-20 lg:hidden flex justify-between items-center bg-slate-950/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse"></div>
              <span className="text-[9px] font-mono text-cyan uppercase tracking-tighter">HQ_STREAM: ACTIVE</span>
           </div>
           <button 
             onClick={() => window.open(directionsUrl, '_blank')}
             className="text-[9px] font-black text-white bg-cyan px-4 py-1.5 rounded-full uppercase tracking-widest"
           >
             Go
           </button>
        </div>

        {/* COORDINATES ACCENT */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 text-right pointer-events-none" style={{ transform: 'translateZ(50px)' }}>
           <div className="backdrop-blur-xl bg-white/5 px-4 md:px-8 py-2 md:py-4 rounded-full border border-white/10">
              <span className="text-[8px] md:text-[10px] font-mono text-cyan/80 uppercase tracking-widest font-black">23.7509° N, 90.3582° E</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};