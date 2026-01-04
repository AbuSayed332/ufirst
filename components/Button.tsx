
import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set((clientX - centerX) * 0.25);
    y.set((clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden select-none py-5 px-10 rounded-full border-none group";
  
  const variants = {
    primary: "bg-[#004b93] text-white shadow-[0_10px_20px_-10px_rgba(0,75,147,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(0,173,239,0.4)]",
    secondary: "bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10",
    ghost: "bg-transparent text-slate-500 hover:text-cyan"
  };

  return (
    <motion.button 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-20 flex items-center gap-3">
        {children}
        <motion.div 
           animate={{ x: [0, 4, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="w-3 h-[1px] bg-orange"
        />
      </span>
      
      {/* Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 via-transparent to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-4 w-4 h-[1px] bg-cyan opacity-40"></div>
      <div className="absolute bottom-0 right-4 w-4 h-[1px] bg-orange opacity-40"></div>
    </motion.button>
  );
};
