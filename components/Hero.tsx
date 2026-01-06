// 'use client';

// import React, { useRef } from 'react';
// import { Button } from './Button';
// import { motion, useScroll, useTransform } from 'framer-motion';

// // Fix: Make the prop optional to match usage in Home component
// export const Hero: React.FC<{ onExplore?: (id: string) => void }> = ({ onExplore }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, 60]);
//   const opacity = useTransform(scrollY, [0, 400], [1, 0]);

//   return (
//     <section 
//       id="home" 
//       ref={containerRef} 
//       className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden transition-colors bg-white dark:bg-[#020617] w-full px-4 pt-20"
//     >
//       {/* Background Atmosphere */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[120%] md:w-[1200px] h-[120%] md:h-[1200px] bg-cyan/5 dark:bg-cyan/10 rounded-full blur-[80px] md:blur-[200px] animate-pulse" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[120%] md:w-[1000px] h-[120%] md:h-[1000px] bg-brand/5 dark:bg-brand/10 rounded-full blur-[80px] md:blur-[200px]" />
//       </div>

//       <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto py-12 md:py-20">
//         <div className="w-full">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter leading-[0.9] mb-6 md:mb-10 text-slate-900 dark:text-white transition-colors">
//               <span className="block uppercase">Industrial</span>
//               <span className="text-vibrant italic font-light drop-shadow-[0_10px_30px_rgba(0,173,239,0.3)]">Synergy.</span>
//             </h1>
//           </motion.div>

//           <motion.p 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ delay: 0.5 }} 
//             className="max-w-3xl mx-auto text-lg sm:text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium mb-10 md:mb-16 leading-snug tracking-tight px-4"
//           >
//             Synchronizing 8 sovereign divisions into a singular engine of <span className="text-slate-900 dark:text-white font-black italic">global impact.</span>
//           </motion.p>

//           <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center px-4">
//             <Button 
//               onClick={() => onExplore?.('hub')} 
//               className="w-full sm:w-auto !px-8 md:!px-16 !py-6 md:!py-10 !text-sm md:!text-xl !rounded-full shadow-vibrant hover:scale-105"
//             >
//               LAUNCH LATTICE
//             </Button>
            
//             <div className="w-full sm:w-auto flex items-center gap-6 md:gap-10 px-6 md:px-10 py-5 md:py-8 rounded-[30px] md:rounded-full glass-card border-slate-200 dark:border-white/10 shadow-giant backdrop-blur-3xl transition-all">
//               <div className="text-left">
//                 <div className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Sync</div>
//                 <div className="text-xl md:text-3xl font-display font-black text-brand dark:text-cyan tracking-tighter italic leading-none">OPTIMAL</div>
//               </div>
//               <div className="w-px h-10 md:h-16 bg-slate-200 dark:bg-white/10" />
//               <div className="text-right">
//                 <div className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Impact</div>
//                 <div className="text-xl md:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-none">8 NODES</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from './Button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: "uFirst Limited",
    subtitle: "IT Solutions & Services",
    description: "Delivering innovative, reliable, and scalable technology solutions since 2020",
    stat1: { label: "Countries", value: "15+" },
    stat2: { label: "Clients", value: "20+" },
    cta: "Explore Services",
    image: "./assets/images/ban.jpeg" // Replace with your actual image path
  },
  {
    title: "Enterprise Software",
    subtitle: "Tailored Solutions",
    description: "E-governance, Banking, Education, ERP systems designed for your business needs",
    stat1: { label: "Technologies", value: "50+" },
    stat2: { label: "Projects", value: "100+" },
    cta: "View Solutions",
    image: "./assets/images/bannar.jpg"
  },
  {
    title: "Digital Innovation",
    subtitle: "Web & Mobile Apps",
    description: "Web2.0, Web3.0, Android & iOS applications with cutting-edge technology",
    stat1: { label: "Platforms", value: "Multi" },
    stat2: { label: "Experience", value: "4 Years" },
    cta: "Start Building",
    image: "./assets/images/bannar1.jpg"
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Future-Ready Solutions",
    description: "Deep Learning, Computer Vision, NLP, and Business Intelligence services",
    stat1: { label: "AI Tools", value: "Latest" },
    stat2: { label: "Data Science", value: "Advanced" },
    cta: "Discover AI",
    image: "./assets/images/bannar2.jpg"
  },
  {
    title: "Cloud & Security",
    subtitle: "Infrastructure Excellence",
    description: "AWS, Azure, Google Cloud with robust cybersecurity and data protection",
    stat1: { label: "Uptime", value: "99.9%" },
    stat2: { label: "Secure", value: "24/7" },
    cta: "Secure Now",
    image: "./assets/images/bang.jpeg"
  },
  {
    title: "Digital Marketing",
    subtitle: "Growth Strategies",
    description: "SEO, SEM, SMM, PPC campaigns to amplify your brand presence globally",
    stat1: { label: "ROI", value: "High" },
    stat2: { label: "Reach", value: "Global" },
    cta: "Grow Business",
    image: "/images/banner-6.jpg"
  },
  {
    title: "Blockchain & Web3",
    subtitle: "Decentralized Future",
    description: "Ethereum, Solidity, Smart Contracts, AR & VR solutions",
    stat1: { label: "Blockchain", value: "Ready" },
    stat2: { label: "Innovation", value: "Next-Gen" },
    cta: "Enter Web3",
    image: "/images/banner-7.jpg"
  },
  {
    title: "Training & Development",
    subtitle: "uFirst Academy",
    description: "Professional certifications, skill development, and industrial attachment programs",
    stat1: { label: "Courses", value: "15+" },
    stat2: { label: "Students", value: "500+" },
    cta: "Learn More",
    image: "/images/banner-8.jpg"
  }
];

export const Hero: React.FC<{ onExplore?: (id: string) => void }> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden transition-colors w-full pt-20"
    >
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[-10%] right-[-10%] w-[120%] md:w-[1200px] h-[120%] md:h-[1200px] bg-cyan/10 dark:bg-cyan/20 rounded-full blur-[80px] md:blur-[200px] animate-pulse mix-blend-overlay" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[120%] md:w-[1000px] h-[120%] md:h-[1000px] bg-brand/10 dark:bg-brand/20 rounded-full blur-[80px] md:blur-[200px] mix-blend-overlay" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto py-12 md:py-20 px-4">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter leading-[0.9] mb-6 md:mb-10 text-white transition-colors drop-shadow-2xl">
                <span className="block uppercase">{slide.title}</span>
                <span className="text-vibrant italic font-light drop-shadow-[0_10px_30px_rgba(0,173,239,0.5)]">{slide.subtitle}</span>
              </h1>

              <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-3xl text-white/90 font-medium mb-10 md:mb-16 leading-snug tracking-tight px-4 drop-shadow-lg">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center px-4 mb-8">
                <Button 
                  onClick={() => onExplore?.('hub')} 
                  className="w-full sm:w-auto !px-8 md:!px-16 !py-6 md:!py-10 !text-sm md:!text-xl !rounded-full shadow-vibrant hover:scale-105"
                >
                  {slide.cta.toUpperCase()}
                </Button>
                
                <div className="w-full sm:w-auto flex items-center gap-6 md:gap-10 px-6 md:px-10 py-5 md:py-8 rounded-[30px] md:rounded-full glass-card border-white/20 shadow-giant backdrop-blur-3xl transition-all bg-white/10">
                  <div className="text-left">
                    <div className="text-[8px] md:text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1">{slide.stat1.label}</div>
                    <div className="text-xl md:text-3xl font-display font-black text-cyan tracking-tighter italic leading-none drop-shadow-lg">{slide.stat1.value}</div>
                  </div>
                  <div className="w-px h-10 md:h-16 bg-white/20" />
                  <div className="text-right">
                    <div className="text-[8px] md:text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1">{slide.stat2.label}</div>
                    <div className="text-xl md:text-3xl font-display font-black text-white tracking-tighter leading-none drop-shadow-lg">{slide.stat2.value}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-12 h-2 bg-vibrant rounded-full'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};