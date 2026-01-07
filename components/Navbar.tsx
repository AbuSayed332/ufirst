// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Logo } from './Logo';
// import { businesses } from '../data/businesses';

// export const Navbar: React.FC<{ isDarkMode: boolean, toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<'divisions' | null>(null);

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

//   const navLinks = [
//     { name: 'Home', id: 'home' },
//     { name: 'About', id: 'about' },
//     { name: 'Services', id: 'service', hasDropdown: true },
//     { name: 'Product', id: 'academy' },
//     { name: 'Career', id: 'career', hasBadge: true },
//     { name: 'Contact', id: 'contact' },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-[5000] flex flex-col">
//       {/* GLOBAL TELEMETRY BAR */}
//       <div className={`w-full py-2 px-6 md:px-12 flex justify-between items-center text-[9px] font-mono tracking-widest border-b transition-all duration-500 relative z-[5100] ${
//         scrolled ? 'bg-[#020617]/95 border-white/5' : 'bg-transparent border-white/10'
//       }`}>
//         <div className="flex items-center gap-6">
//           <div className="flex items-center gap-2 text-white">
//             <span className="text-orange-500 animate-pulse">●</span>
//             <span className="opacity-60 hidden xs:inline uppercase">Node: <span className="text-green-500 font-black">ACTIVE</span></span>
//           </div>
//           <div className="hidden sm:flex items-center gap-2 text-white">
//              <span className="opacity-80 uppercase tracking-tighter">📍 HQ: Mohammadpur, Dhaka</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-6">
//            <a href="mailto:info@ufirstltd.com" className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 font-black">
//              <span className="hidden xs:inline">✉</span> info@ufirstltd.com
//            </a>
//         </div>
//       </div>

//       {/* MAIN COMMAND NAVIGATION */}
//       <nav className={`w-full flex justify-center transition-all duration-700 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
//         <div className={`w-[96%] max-w-[1440px] flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-[30px] md:rounded-[40px] transition-all duration-500 border ${
//           scrolled 
//             ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border-slate-200/50 dark:border-white/10 shadow-xl' 
//             : 'bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20'
//         }`}>
          
//           <div className="flex items-center gap-12">
//             <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
//               <Logo showTagline={false} className={`scale-95 md:scale-100 transition-all ${!scrolled ? 'brightness-0 invert' : ''}`} />
//             </button>
            
//             {/* Desktop Nav */}
//             <div className="hidden xl:flex items-center gap-2">
//               {navLinks.map((link) => (
//                 <div 
//                   key={link.name}
//                   className="relative group"
//                   onMouseEnter={() => link.hasDropdown && setActiveDropdown('divisions')}
//                   onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
//                 >
//                   <button
//                     onClick={() => link.id === 'home' ? window.scrollTo({top:0, behavior:'smooth'}) : scrollTo(link.id)}
//                     className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 flex items-center gap-2 z-10
//                       ${scrolled ? 'text-slate-700 dark:text-white/80' : 'text-white'}
//                       group-hover:text-cyan-500
//                     `}
//                   >
//                     {link.name}
                    
//                     {link.hasDropdown && (
//                       <span className={`text-[7px] transition-transform duration-300 ${activeDropdown === 'divisions' ? 'rotate-180' : ''}`}>▼</span>
//                     )}

//                     {link.hasBadge && (
//                       <span className="flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
//                       </span>
//                     )}

//                     {/* Hover Background Pill */}
//                     <motion.div
//                       className="absolute inset-0 z-[-1] rounded-full bg-slate-200/50 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
//                       layoutId="navpill"
//                     />
//                   </button>

//                   {/* Services Dropdown */}
//                   {link.hasDropdown && (
//                     <AnimatePresence>
//                       {activeDropdown === 'divisions' && (
//                         <motion.div 
//                           initial={{ opacity: 0, y: 10 }} 
//                           animate={{ opacity: 1, y: 0 }} 
//                           exit={{ opacity: 0, y: 10 }} 
//                           className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[450px] bg-white dark:bg-slate-900 backdrop-blur-3xl rounded-[30px] shadow-2xl border border-slate-100 dark:border-white/10 p-3"
//                         >
//                           <div className="grid grid-cols-2 gap-2">
//                             {businesses.map((biz, i) => (
//                               <button key={i} onClick={() => scrollTo('hub')} className="w-full text-left px-4 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group flex items-center gap-4">
//                                 <span className="text-2xl">{biz.icon}</span>
//                                 <div>
//                                   <div className="text-[10px] font-black text-slate-900 dark:text-white group-hover:text-cyan-500 uppercase">{biz.name}</div>
//                                   <div className="text-[8px] opacity-50 font-mono">NODE_0{i+1}</div>
//                                 </div>
//                               </button>
//                             ))}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={toggleDarkMode} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-lg ${scrolled ? 'hover:bg-slate-100 dark:hover:bg-white/5' : 'hover:bg-white/20 text-white'}`}>
//               {isDarkMode ? '🌙' : '☀️'}
//             </button>
            
//             <button onClick={() => scrollTo('contact')} className="hidden sm:flex items-center gap-3 bg-cyan-600 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-700 transition-all active:scale-95 shadow-lg shadow-cyan-500/20">
//               <span>✉</span> <span>Connect</span>
//             </button>

//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`xl:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2.5 rounded-xl transition-all ${scrolled ? 'bg-slate-100 dark:bg-white/5' : 'bg-white/10'}`}>
//               <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
//               <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
//               <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[4900] bg-white dark:bg-[#020617] p-8 pt-32 flex flex-col gap-8 xl:hidden">
//             {navLinks.map((link) => (
//               <button 
//                 key={link.name} 
//                 onClick={() => { scrollTo(link.id); setIsMobileMenuOpen(false); }} 
//                 className="text-4xl font-black text-slate-900 dark:text-white text-left italic hover:text-cyan-500 transition-colors"
//               >
//                 {link.name}
//               </button>
//             ))}
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
  const [activeDropdown, setActiveDropdown] = useState<'divisions' | null>(null);

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

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'service', hasDropdown: true },
    { name: 'Product', id: 'academy' },
    { name: 'Career', id: 'career', hasBadge: true },
   
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[5000] flex justify-center pointer-events-none">
      {/* Container for the floating nav - pointer-events-auto restores clicks to the child */}
      <nav className={`w-full max-w-[1440px] px-4 md:px-10 transition-all duration-700 pointer-events-auto ${scrolled ? 'pt-4' : 'pt-6 md:pt-10'}`}>
        <div className={`flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-[30px] md:rounded-[40px] transition-all duration-500 border ${
          scrolled 
            ? 'bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/50 dark:border-white/10 shadow-2xl' 
            : 'bg-white/5 dark:bg-white/5 backdrop-blur-md border-white/10 shadow-none'
        }`}>
          
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:opacity-80 transition-opacity">
              <Logo showTagline={false} className={`scale-95 md:scale-100 transition-all ${!scrolled ? 'brightness-0 invert' : ''}`} />
            </button>
            
            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown('divisions')}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => link.id === 'home' ? window.scrollTo({top:0, behavior:'smooth'}) : scrollTo(link.id)}
                    className={`relative px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-2 z-10
                      ${scrolled ? 'text-slate-800 dark:text-white/80' : 'text-white'}
                      group-hover:text-cyan-500
                    `}
                  >
                    {link.name}
                    
                    {link.hasDropdown && (
                      <span className={`text-[7px] opacity-50 transition-transform duration-300 ${activeDropdown === 'divisions' ? 'rotate-180' : ''}`}>▼</span>
                    )}

                    {link.hasBadge && (
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}

                    {/* Magnetic Hover Background */}
                    <motion.div
                      className="absolute inset-0 z-[-1] rounded-full bg-slate-200/50 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      layoutId="navpill"
                    />
                  </button>

                  {/* Services Dropdown Panel */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === 'divisions' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                          animate={{ opacity: 1, y: 0, scale: 1 }} 
                          exit={{ opacity: 0, y: 15, scale: 0.95 }} 
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[32px] shadow-giant border border-slate-100 dark:border-white/10 p-3"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {businesses.map((biz, i) => (
                              <button key={i} onClick={() => scrollTo('service')} className="w-full text-left px-5 py-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group flex items-center gap-4">
                                <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{biz.icon}</span>
                                <div>
                                  <div className="text-[10px] font-black text-slate-900 dark:text-white group-hover:text-cyan-500 uppercase tracking-wider">{biz.name}</div>
                                  <div className="text-[7px] opacity-40 font-mono mt-1 tracking-widest">SYSTEM_NODE_0{i+1}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Area (Dark Mode + Connect) */}
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all text-xl ${scrolled ? 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-white' : 'hover:bg-white/20 text-white'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            
            <button onClick={() => scrollTo('contact')} className="hidden sm:flex items-center gap-3 bg-cyan-600 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95 shadow-[0_10px_20px_rgba(8,145,178,0.3)]">
              <span>✉</span> <span>Connect</span>
            </button>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`xl:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5 p-2.5 rounded-2xl transition-all ${scrolled ? 'bg-slate-100 dark:bg-white/5' : 'bg-white/10'}`}>
              <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-900 dark:bg-cyan-400' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            className="fixed inset-0 z-[4900] bg-white/90 dark:bg-[#020617]/90 p-8 pt-40 flex flex-col gap-8 xl:hidden pointer-events-auto"
          >
            {navLinks.map((link, idx) => (
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={link.name} 
                onClick={() => { scrollTo(link.id); setIsMobileMenuOpen(false); }} 
                className="text-5xl font-black text-slate-900 dark:text-white text-left italic hover:text-cyan-500 transition-colors uppercase tracking-tighter"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};