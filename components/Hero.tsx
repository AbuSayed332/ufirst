
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const slides = [
//   { image: "./assets/images/ban.jpeg", title: "uFirst Limited" },
//   { image: "./assets/images/bannar.jpg", title: "Enterprise Software" },
//   { image: "./assets/images/bannar1.jpg", title: "Digital Innovation" },
//   { image: "./assets/images/bannar2.jpg", title: "AI & Machine Learning" },
//   { image: "./assets/images/bang.jpeg", title: "Cloud & Security" },
//   { image: "./assets/images/pic1.png", title: "Digital Marketing" },
//   { image: "./assets/images/pic2.png", title: "Blockchain & Web3" },
//   { image: "./assets/images/pic3.png", title: "Training & Development" }
// ];

// export const Hero: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="w-full bg-black overflow-hidden">
//       <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[21/9] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             {/* Background Image */}
//             <img
//               src={slides[currentSlide].image}
//               alt={slides[currentSlide].title}
//               className="w-full h-full object-cover object-center scale-105"
//             />
            
//             {/* Dark Overlay for readability */}
//             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

//             {/* DECORATED HEADING */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="flex flex-col items-center"
//               >
//                 <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center uppercase tracking-tighter 
//                                bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-white
//                                drop-shadow-[0_5px_15px_rgba(0,255,255,0.3)]">
//                   {slides[currentSlide].title}
//                 </h1>
                
//                 {/* Decorative Underline Accent */}
//                 <motion.div 
//                   initial={{ width: 0 }}
//                   animate={{ width: '80%' }}
//                   transition={{ delay: 0.5, duration: 0.8 }}
//                   className="h-1.5 mt-4 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]"
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation Indicators */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`transition-all duration-500 rounded-full h-1.5 ${
//                 index === currentSlide 
//                   ? 'w-10 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]' 
//                   : 'w-2 bg-white/30 hover:bg-white/60'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Ensure lucide-react is installed

const slides = [
  { 
    image: "./assets/images/ban.jpeg", 
    title: "uFirst Limited", 
    subtitle: "A Place of Excellence" 
  },
  { 
    image: "./assets/images/bannar.jpg", 
    title: "Web & Mobile Application", 
    subtitle: "Design and Develop" 
  },
  { 
    image: "./assets/images/bannar1.jpg", 
    title: "Customized Solution", 
    subtitle: "Digital Transformation" 
  },
  { 
    image: "./assets/images/bannar2.jpg", 
    title: "Welcome to uFirst", 
    subtitle: "Innovating Your Future" 
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#020617] overflow-hidden">
      <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Left-weighted Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

            {/* CONTENT: Positioned Left with Right-to-Left Animation */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-32">
              <div className="max-w-3xl overflow-hidden">
                {/* Subtitle Animation */}
                <motion.p
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-cyan-400 font-bold text-xs md:text-sm uppercase tracking-[0.4em] mb-2"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Title Animation: Reduced Size for Readability */}
                <motion.h1
                  initial={{ x: 150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white italic tracking-tighter leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Decorative Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-1 w-24 bg-cyan-500 mt-6 origin-left shadow-[0_0_10px_#06b6d4]"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION ARROWS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-40 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-black/20 hover:bg-cyan-500/40 text-white backdrop-blur-md transition-all pointer-events-auto border border-white/10 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-black/20 hover:bg-cyan-500/40 text-white backdrop-blur-md transition-all pointer-events-auto border border-white/10 group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* DASHBOARD INDICATORS (Bottom Left) */}
        <div className="absolute bottom-10 left-8 md:left-20 flex items-center gap-4 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentSlide 
                  ? 'w-12 bg-cyan-400' 
                  : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
          <span className="text-white/40 font-mono text-[10px] ml-4 tracking-widest">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
};