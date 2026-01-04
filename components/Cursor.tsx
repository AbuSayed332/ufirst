
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const trailConfig = { damping: 40, stiffness: 120, mass: 1.2 };

  const xSpring = useSpring(cursorX, springConfig);
  const ySpring = useSpring(cursorY, springConfig);
  
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  
  const velocity = useTransform([velocityX, velocityY], ([vx, vy]) => 
    Math.sqrt(Math.pow(Number(vx), 2) + Math.pow(Number(vy), 2))
  );

  const scale = useTransform(velocity, [0, 2000], [1, 2]);
  const opacity = useTransform(velocity, [0, 3000], [0.3, 0.8]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const hover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('button, a, [data-hover-text]');
      if (el) {
        setIsHovering(true);
        setHoverText(el.getAttribute('data-hover-text') || '');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', hover);
    window.addEventListener('mousedown', () => setIsClicking(true));
    window.addEventListener('mouseup', () => setIsClicking(false));

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', hover);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* LAYER 1: THE DELAYED NEURAL TRAIL */}
      <motion.div
        style={{ x: trailX, y: trailY, left: -40, top: -40 }}
        className="fixed w-20 h-20 border border-cyan/10 rounded-full blur-[4px]"
      />

      {/* LAYER 2: THE KINETIC RING */}
      <motion.div
        style={{ 
          x: xSpring, y: ySpring, 
          left: -20, top: -20,
          scale,
          opacity
        }}
        animate={{
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          borderRadius: isHovering ? "12px" : "100%",
          rotate: isHovering ? 90 : (isClicking ? 45 : 0),
          borderColor: isHovering ? "#00adef" : (isClicking ? "#f58220" : "rgba(0, 173, 239, 0.4)")
        }}
        className="fixed border-[1.5px] flex items-center justify-center transition-all duration-300"
      >
        <AnimatePresence>
          {isClicking && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute inset-0 bg-orange/20 rounded-full border border-orange"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* LAYER 3: TELEMETRY & TAP ICON */}
      <motion.div style={{ x: xSpring, y: ySpring }} className="fixed ml-12 -mt-12">
        <AnimatePresence>
          {hoverText || isClicking ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-4 bg-dark/80 backdrop-blur-xl p-3 border border-white/10 rounded-2xl shadow-giant"
            >
              {/* THE TAP ICON */}
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-[10px] font-black text-white">
                {isClicking ? 'SYNC' : 'NODE'}
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cyan tracking-widest font-black uppercase">
                  {isClicking ? 'NEURAL_LINK_OK' : (hoverText || 'SCANNING_LATTICE')}
                </span>
                <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden mt-1">
                   <motion.div 
                     animate={{ x: ['-100%', '100%'] }} 
                     transition={{ duration: 0.5, repeat: Infinity }} 
                     className="absolute inset-0 bg-orange"
                   />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* LAYER 4: PRECISION CORE */}
      <motion.div
        style={{ x: cursorX, y: cursorY, left: -4, top: -4 }}
        animate={{ 
          scale: isClicking ? 2.5 : 1,
          backgroundColor: isClicking ? '#f58220' : '#00adef',
          boxShadow: isClicking ? '0 0 20px #f58220' : '0 0 10px #00adef'
        }}
        className="fixed w-2 h-2 rounded-full z-10"
      />
    </div>
  );
};
