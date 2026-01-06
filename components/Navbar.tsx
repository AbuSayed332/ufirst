// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Logo } from './Logo';
// import { businesses } from '../data/businesses';

// export const Navbar: React.FC<{ isDarkMode: boolean, toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<'divisions' | 'strategic' | null>(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollTo = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth' });
//       setIsMobileMenuOpen(false);
//     }
//     setActiveDropdown(null);
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-[5000] flex flex-col">
//       {/* GLOBAL TELEMETRY BAR */}
//       <div className="w-full bg-[#020617] text-white py-2 px-6 md:px-12 flex justify-between items-center text-[9px] font-mono tracking-widest border-b border-white/5 relative z-[5100]">
//         <div className="flex items-center gap-6">
//           <div className="flex items-center gap-2">
//             <span className="text-orange animate-pulse">●</span>
//             <span className="opacity-60 hidden xs:inline uppercase">Node: <span className="text-green-500 font-black">ACTIVE</span></span>
//           </div>
//           <div className="hidden sm:flex items-center gap-2">
//              <span className="text-cyan">📍</span>
//              <span className="opacity-80 uppercase tracking-tighter">HQ: Mohammadpur, Dhaka</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-6">
//            <a href="mailto:info@ufirstltd.com" className="hover:text-cyan transition-colors flex items-center gap-2 font-black">
//              <span className="hidden xs:inline">✉</span> INFO@UFIRSTLTD.COM
//            </a>
//            <div className="hidden md:flex items-center gap-4">
//               <a href="https://www.facebook.com/ufirstlimited" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-cyan transition-colors p-1">
//                 <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
//               </a>
//               <a href="https://www.linkedin.com/company/ufirstlimited" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan transition-colors p-1">
//                 <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
//               </a>
//            </div>
//         </div>
//       </div>

//       {/* MAIN COMMAND NAVIGATION */}
//       <nav className={`w-full flex justify-center transition-all duration-700 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
//         <div className={`w-[96%] max-w-[1440px] flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-[30px] md:rounded-[40px] bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 shadow-giant transition-all ${scrolled ? 'shadow-vibrant translate-y-[-2px]' : ''}`}>
          
//           <div className="flex items-center gap-6 md:gap-12">
//             <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
//               <Logo showTagline={false} className="scale-95 md:scale-100" />
//             </button>
            
//             {/* Desktop Nav */}
//             <div className="hidden xl:flex items-center gap-10">
//               <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/70 hover:text-cyan transition-all">Home</button>
//               <button onClick={() => scrollTo('about')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/70 hover:text-cyan transition-all">About</button>
              
//               {/* DIVISIONS DROPDOWN */}
//               <div className="relative group" onMouseEnter={() => setActiveDropdown('divisions')} onMouseLeave={() => setActiveDropdown(null)}>
//                 <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeDropdown === 'divisions' ? 'text-cyan' : 'text-slate-800 dark:text-white/70'}`}>
//                   services <span className={`text-[6px] transition-transform duration-300 ${activeDropdown === 'divisions' ? 'rotate-180' : ''}`}>▼</span>
//                 </button>
//                 <AnimatePresence>
//                   {activeDropdown === 'divisions' && (
//                     <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white dark:bg-slate-900 backdrop-blur-3xl rounded-[30px] shadow-giant border border-slate-100 dark:border-white/10 py-4 p-2">
//                       <div className="grid grid-cols-2 gap-1">
//                         {businesses.map((biz, i) => (
//                           <button key={i} onClick={() => scrollTo('hub')} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group flex items-center gap-3">
//                             <span className="text-xl">{biz.icon}</span>
//                             <div>
//                               <div className="text-[9px] font-black text-slate-900 dark:text-white group-hover:text-cyan uppercase leading-tight">{biz.name}</div>
//                               <div className="text-[7px] font-mono text-slate-400 uppercase tracking-widest leading-none">NODE_0{i+1}</div>
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <button onClick={() => scrollTo('academy')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/70 hover:text-cyan transition-all">Masterclass</button>
//               <button onClick={() => scrollTo('career')} className="relative text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/70 hover:text-cyan transition-all flex items-center gap-2">
//                 Careers
//                 <span className="flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
//                 </span>
//               </button>
//               <button onClick={() => scrollTo('contact')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white/70 hover:text-cyan transition-all">Contact</button>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-lg">{isDarkMode ? '🌙' : '☀️'}</button>
            
//             <button onClick={() => scrollTo('contact')} className="hidden sm:flex items-center gap-3 bg-red-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-vibrant hover:bg-red-700 transition-all active:scale-95">
//               <span>✉</span> <span className="hidden md:inline">Connect</span>
//             </button>

//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl transition-all active:scale-90">
//               <span className={`w-6 h-0.5 bg-brand dark:bg-cyan transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
//               <span className={`w-6 h-0.5 bg-brand dark:bg-cyan transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
//               <span className={`w-6 h-0.5 bg-brand dark:bg-cyan transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU OVERLAY */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[4900] bg-white dark:bg-[#020617] p-8 pt-40 flex flex-col gap-8 xl:hidden">
//             <div className="flex flex-col gap-6">
//               <button onClick={() => { scrollTo('home'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">Home</button>
//               <button onClick={() => { scrollTo('about'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">About</button>
//               <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
//               <div className="space-y-4">
//                  <div className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan">Sovereign Nodes</div>
//                  <button onClick={() => { scrollTo('hub'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Strategic Matrix</button>
//                  <button onClick={() => { scrollTo('academy'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Masterclass Hub</button>
//                  <button onClick={() => { scrollTo('career'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Career Portal</button>
//               </div>
//               <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
//               <button onClick={() => { scrollTo('contact'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">Contact</button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { businesses } from '../data/businesses';

export const Navbar: React.FC<{ isDarkMode: boolean, toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'divisions' | 'strategic' | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[5000] flex flex-col">
      {/* GLOBAL TELEMETRY BAR - Transparency Added */}
      <div className={`w-full py-2 px-6 md:px-12 flex justify-between items-center text-[9px] font-mono tracking-widest border-b transition-all duration-500 relative z-[5100] ${
        scrolled ? 'bg-[#020617]/95 border-white/5' : 'bg-transparent border-white/10'
      }`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <span className="text-orange animate-pulse">●</span>
            <span className="opacity-60 hidden xs:inline uppercase">Node: <span className="text-green-500 font-black">ACTIVE</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white">
             <span className="text-cyan">📍</span>
             <span className="opacity-80 uppercase tracking-tighter">HQ: Mohammadpur, Dhaka</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <a href="mailto:info@ufirstltd.com" className="text-white hover:text-cyan transition-colors flex items-center gap-2 font-black text-white">
             <span className="hidden xs:inline">✉</span> info@ufirstltd.com
           </a>
           <div className="hidden md:flex items-center gap-4 text-white">
              <a href="https://www.facebook.com/ufirstlimited" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors p-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/ufirstlimited" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors p-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
           </div>
        </div>
      </div>

      {/* MAIN COMMAND NAVIGATION - Transparency and Adaptive Text Added */}
      <nav className={`w-full flex justify-center transition-all duration-700 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
        <div className={`w-[96%] max-w-[1440px] flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-[30px] md:rounded-[40px] transition-all duration-500 border ${
          scrolled 
            ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border-slate-200/50 dark:border-white/10 shadow-giant' 
            : 'bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 shadow-none'
        }`}>
          
          <div className="flex items-center gap-6 md:gap-12">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <Logo showTagline={false} className={`scale-95 md:scale-100 transition-all ${!scrolled ? 'brightness-0 invert' : ''}`} />
            </button>
            
            {/* Desktop Nav - Text color adjusts to transparency */}
            <div className="hidden xl:flex items-center gap-10">
              <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan ${scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white'}`}>Home</button>
              <button onClick={() => scrollTo('about')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan ${scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white'}`}>About</button>
              
              {/* DIVISIONS DROPDOWN */}
              <div className="relative group" onMouseEnter={() => setActiveDropdown('divisions')} onMouseLeave={() => setActiveDropdown(null)}>
                <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeDropdown === 'divisions' ? 'text-cyan' : (scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white')
                }`}>
                  services <span className={`text-[6px] transition-transform duration-300 ${activeDropdown === 'divisions' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'divisions' && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white dark:bg-slate-900 backdrop-blur-3xl rounded-[30px] shadow-giant border border-slate-100 dark:border-white/10 py-4 p-2">
                      <div className="grid grid-cols-2 gap-1">
                        {businesses.map((biz, i) => (
                          <button key={i} onClick={() => scrollTo('hub')} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group flex items-center gap-3">
                            <span className="text-xl">{biz.icon}</span>
                            <div>
                              <div className="text-[9px] font-black text-slate-900 dark:text-white group-hover:text-cyan uppercase leading-tight">{biz.name}</div>
                              {/* <div className="text-[7px] font-mono text-slate-400 uppercase tracking-widest leading-none">NODE_0{i+1}</div> */}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => scrollTo('academy')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan ${scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white'}`}>Product</button>
              <button onClick={() => scrollTo('career')} className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan flex items-center gap-2 ${scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white'}`}>
                Career
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                </span>
              </button>
              <button onClick={() => scrollTo('contact')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan ${scrolled ? 'text-slate-800 dark:text-white/70' : 'text-white'}`}>Contact</button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={toggleDarkMode} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-lg ${scrolled ? 'hover:bg-slate-100 dark:hover:bg-white/5' : 'hover:bg-white/20 text-white'}`}>{isDarkMode ? '🌙' : '☀️'}</button>
            
            <button onClick={() => scrollTo('contact')} className="hidden sm:flex items-center gap-3 bg-cyan-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-vibrant hover:bg-red-700 transition-all active:scale-95">
              <span>✉</span> <span className="hidden md:inline">Connect</span>
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`xl:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2.5 rounded-xl transition-all active:scale-90 ${scrolled ? 'bg-slate-100 dark:bg-white/5' : 'bg-white/10'}`}>
              <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-brand dark:bg-cyan' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-brand dark:bg-cyan' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-brand dark:bg-cyan' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - Styled for transparency */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[4900] bg-white/95 dark:bg-[#020617]/95 backdrop-blur-2xl p-8 pt-40 flex flex-col gap-8 xl:hidden">
            <div className="flex flex-col gap-6">
              <button onClick={() => { scrollTo('home'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">Home</button>
              <button onClick={() => { scrollTo('about'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">About</button>
              <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
              <div className="space-y-4">
                 <div className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan">Sovereign Nodes</div>
                 <button onClick={() => { scrollTo('hub'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Strategic Matrix</button>
                 <button onClick={() => { scrollTo('academy'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Masterclass Hub</button>
                 <button onClick={() => { scrollTo('career'); setIsMobileMenuOpen(false); }} className="block text-2xl font-bold text-slate-500 hover:text-cyan transition-colors">Career Portal</button>
              </div>
              <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
              <button onClick={() => { scrollTo('contact'); setIsMobileMenuOpen(false); }} className="text-4xl font-display font-black text-slate-900 dark:text-white text-left italic">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};