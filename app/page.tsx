// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Navbar } from '@/components/Navbar';
// import { Hero } from '@/components/Hero';
// import { About } from '@/components/About';
// import { Contact } from '@/components/Contact';
// import { Footer } from '@/components/Footer';
// import { Leadership } from '@/components/Leadership';
// import { AIAdvisor } from '@/components/AIAdvisor';
// import { Cursor } from '@/components/Cursor';
// import { CommandHub } from '@/components/CommandHub';
// import { AcademyHub } from '@/components/AcademyHub';
// import { PerformanceMatrix } from '@/components/PerformanceMatrix';
// import { AgentAutomation } from '@/components/AgentAutomation';
// import { CustomMap } from '@/components/Map';
// import { CareerPortal } from '@/components/CareerPortal';
// import { corporateTopics, CorporateTopic } from '@/data/corporate';
// import { businesses } from '@/data/businesses';
// import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
// import { Button } from '@/components/Button';

// const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => {
//   return (
//     <section id={id} className={`relative w-full overflow-hidden py-10 md:py-24 ${className}`}>
//       {children}
//     </section>
//   );
// };

// const ProtocolTicker: React.FC = () => {
//   const [time, setTime] = useState("");
  
//   useEffect(() => {
//     setTime(new Date().getHours() + ":00 UTC");
//   }, []);

//   return (
//     <div className="w-full bg-[#020617] dark:bg-black border-y border-white/5 py-2 md:py-3 overflow-hidden whitespace-nowrap z-[4000] relative select-none">
//       <motion.div 
//         animate={{ x: [0, -2000] }}
//         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//         className="flex gap-16 md:gap-32 items-center"
//       >
//         {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
//           <div key={i} className="flex items-center gap-6 md:gap-10">
//             <div className="flex items-center gap-3">
//               <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-cyan shadow-[0_0_10px_#00adef] animate-pulse" />
//               <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em]">Node 0{i} Online</span>
//             </div>
//             <span className="text-slate-500 font-mono text-[8px] md:text-[9px] tracking-widest uppercase">SYNC_KEY: {time}</span>
//             <div className="h-4 w-px bg-white/5" />
//             <span className="text-orange font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">Protocol_v.24</span>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<CorporateTopic | null>(null);

//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (isDarkMode) document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   const handleTopicClick = (topicId: string) => {
//     const topic = corporateTopics.find(t => t.id === topicId);
//     if (topic) setSelectedTopic(topic);
//   };

//   const scrollTo = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-cyan selection:text-white transition-colors duration-700 overflow-x-hidden w-full">
//       <Cursor />

//       <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan z-[6000] origin-left shadow-[0_0_20px_#00adef]" style={{ scaleX }} />

//       <AnimatePresence>
//         {loading && (
//           <motion.div key="loader" exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }} className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center p-12">
//             <motion.div animate={{ rotate: 360, borderColor: ['#004b93', '#00adef', '#f58220', '#004b93'] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 md:w-24 md:h-24 border-t-4 md:border-t-6 border-l-4 md:border-l-6 rounded-full mb-8 shadow-[0_0_60px_rgba(0,173,239,0.3)]" />
//             <div className="text-[10px] md:text-xs font-mono font-black text-cyan uppercase tracking-[0.8em] md:tracking-[1em] animate-pulse text-center">INITIALIZING_SOVEREIGN_LATTICE</div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AIAdvisor />
      
//       <div className="relative z-10 w-full overflow-hidden">
//         <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
//         {/* <div className="pt-[90px] md:pt-[110px]">
//           <ProtocolTicker />
//         </div> */}

//         <main className="w-full flex flex-col">
//           <Hero />

//           <SectionWrapper id="about" className="!pt-6">
//             <About />
//           </SectionWrapper>

//           <section className="w-full max-w-[1600px] mx-auto px-6 py-10 md:py-20 overflow-hidden">
//              <PerformanceMatrix />
//           </section>

//           <SectionWrapper id="hub" className="bg-slate-50 dark:bg-slate-950/20">
//              <CommandHub onNodeClick={(id) => setSelectedBusinessId(id)} />
//           </SectionWrapper>

//           <SectionWrapper id="automation" className="bg-white dark:bg-[#020617]">
//              <AgentAutomation />
//           </SectionWrapper>

//           <SectionWrapper id="academy" className="bg-slate-50 dark:bg-slate-950/20">
//             <AcademyHub />
//           </SectionWrapper>

//           <SectionWrapper id="leadership" className="bg-white dark:bg-[#020617]">
//             <Leadership />
//           </SectionWrapper>

//           <SectionWrapper id="location" className="bg-slate-50 dark:bg-slate-950/20">
//             <div className="max-w-7xl mx-auto px-6">
//               <CustomMap />
//             </div>
//           </SectionWrapper>

//           <SectionWrapper id="career" className="bg-white dark:bg-[#020617]">
//             <CareerPortal />
//           </SectionWrapper>

//           <SectionWrapper id="contact" className="bg-slate-50 dark:bg-slate-950/20">
//             <Contact initialSubject={selectedBusinessId ? selectedBusinessId : undefined} />
//           </SectionWrapper>
//         </main>

//         <Footer onTopicClick={handleTopicClick} />
//       </div>

//       <AnimatePresence>
//         {selectedBusinessId && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBusinessId(null)} className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-[7000]" />
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 md:inset-6 lg:inset-12 z-[7010] bg-white dark:bg-slate-900 md:rounded-[40px] shadow-giant flex flex-col lg:flex-row overflow-hidden border border-brand/20">
//               {businesses.filter(b => b.id === selectedBusinessId).map((biz) => (
//                 <React.Fragment key={biz.id}>
//                   <div className="w-full lg:w-[35%] bg-brand p-8 md:p-14 flex flex-col justify-between text-white relative overflow-hidden shrink-0">
//                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
//                     <button onClick={() => setSelectedBusinessId(null)} className="text-white/60 hover:text-white font-black text-2xl mb-6 flex items-center gap-3 group relative z-10">
//                       <span>←</span> <span className="text-[10px] uppercase tracking-[0.4em]">BACK_TO_HUB</span>
//                     </button>
//                     <div className="relative z-10">
//                       <div className="text-7xl md:text-9xl mb-4 animate-float opacity-90 drop-shadow-2xl">{biz.icon}</div>
//                       <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter italic leading-none">{biz.name}</h2>
//                     </div>
//                   </div>
//                   <div className="flex-grow p-8 md:p-16 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">
//                     <div className="flex items-center gap-4 mb-8">
//                        <div className="w-10 h-1.5 bg-cyan rounded-full shadow-vibrant" />
//                        <h3 className="text-brand dark:text-cyan font-black text-[10px] uppercase tracking-widest italic">Node Dossier</h3>
//                     </div>
//                     <p className="text-2xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter italic mb-10">
//                       {biz.longDescription}
//                     </p>
//                     <div className="grid sm:grid-cols-2 gap-4 mb-12">
//                       {biz.features.map((f: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: number) => (
//                         <div key={`${biz.id}-feature-${i}`} className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-[25px] border border-slate-100 dark:border-white/5">
//                           <div className="w-5 h-5 rounded-full bg-cyan shadow-vibrant flex items-center justify-center text-white font-black text-[8px]">0{i+1}</div>
//                           <span className="text-lg font-black italic text-slate-900 dark:text-white tracking-tight">{f}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <Button onClick={() => { scrollTo('contact'); setSelectedBusinessId(null); }} className="w-full !py-8 !text-base !rounded-full shadow-vibrant">INITIATE_SYNC_REQUEST</Button>
//                   </div>
//                 </React.Fragment>
//               ))}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// 'use client';



// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Navbar } from '@/components/Navbar';
// import { Hero } from '@/components/Hero';
// import { About } from '@/components/About';
// import { Contact } from '@/components/Contact';
// import { Footer } from '@/components/Footer';
// import { Leadership } from '@/components/Leadership';
// import { AIAdvisor } from '@/components/AIAdvisor';
// import { CommandHub } from '@/components/CommandHub';
// import { AcademyHub } from '@/components/AcademyHub';
// import { AgentAutomation } from '@/components/AgentAutomation';
// import { CareerPortal } from '@/components/CareerPortal';
// import { corporateTopics, CorporateTopic } from '@/data/corporate';
// import { businesses } from '@/data/businesses';
// import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
// import { Button } from '@/components/Button';

// /**
//  * REFINED ALIGNMENT STRATEGY:
//  * 1. py-16 md:py-24: Standard breathing room for sections.
//  * 2. max-w-[1440px]: Matches your Navbar's max-width for vertical "lines" of alignment.
//  */
// const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; className?: string; noContainer?: boolean }> = ({ children, id, className = "", noContainer = false }) => {
//   return (
//     <section id={id} className={`relative w-full overflow-hidden py-16 md:py-24 ${className}`}>
//       {noContainer ? children : (
//         <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
//           {children}
//         </div>
//       )}
//     </section>
//   );
// };

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<CorporateTopic | null>(null);

//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (isDarkMode) document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   const scrollTo = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-cyan selection:text-white transition-colors duration-700 overflow-x-hidden w-full">
      
//       {/* Global Progress Bar */}
//       <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan z-[6000] origin-left shadow-[0_0_20px_#00adef]" style={{ scaleX }} />

//       <AnimatePresence>
//         {loading && (
//           <motion.div key="loader" exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }} className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center p-12">
//             <motion.div animate={{ rotate: 360, borderColor: ['#004b93', '#00adef', '#f58220', '#004b93'] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-t-4 border-l-4 rounded-full mb-8 shadow-[0_0_60px_rgba(0,173,239,0.3)]" />
//             <div className="text-[10px] font-mono font-black text-cyan uppercase tracking-[1em] animate-pulse">INITIALIZING_SYSTEM</div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AIAdvisor />
      
//       <div className="relative z-10 w-full">
//         <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
//         <main className="w-full flex flex-col">
//           {/* HERO: Usually has its own internal padding for centering */}
//           <Hero />

//           {/* ABOUT: Minimal top padding to pull it closer to Hero */}
//           <SectionWrapper id="about" className="!pt-8">
//             <About />
//           </SectionWrapper>

//           {/* ACADEMY: Contrast background to break visual monotony */}
//           <SectionWrapper id="academy" className="bg-slate-50 dark:bg-slate-950/40">
//             <AcademyHub />
//           </SectionWrapper>

//           {/* SERVICES: Command Hub */}
//           <SectionWrapper id="service">
//              <CommandHub onNodeClick={(id) => setSelectedBusinessId(id)} />
//           </SectionWrapper>

//           {/* AUTOMATION: Clean White/Dark Space */}
//           {/* <SectionWrapper id="automation" className="bg-white dark:bg-[#020617] border-y border-slate-100 dark:border-white/5">
//              <AgentAutomation />
//           </SectionWrapper> */}
          
//           {/* LEADERSHIP */}
//           <SectionWrapper id="leadership">
//             <Leadership />
//           </SectionWrapper>

//           {/* CAREER */}
//           <SectionWrapper id="career" className="bg-slate-50 dark:bg-slate-950/40">
//             <CareerPortal />
//           </SectionWrapper>

//           {/* CONTACT */}
//           <SectionWrapper id="contact" className="!pb-32">
//             <Contact initialSubject={selectedBusinessId ? selectedBusinessId : undefined} />
//           </SectionWrapper>
//         </main>

//         <Footer onTopicClick={(topicId) => {
//            const topic = corporateTopics.find(t => t.id === topicId);
//            if (topic) setSelectedTopic(topic);
//         }} />
//       </div>

//       {/* NODE DOSSIER MODAL */}
//       <AnimatePresence>
//         {selectedBusinessId && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBusinessId(null)} className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[7000]" />
//             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-4 md:inset-12 lg:inset-20 z-[7010] bg-white dark:bg-slate-900 rounded-[30px] md:rounded-[50px] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-white/10">
//               {businesses.filter(b => b.id === selectedBusinessId).map((biz) => (
//                 <React.Fragment key={biz.id}>
//                   {/* Left Panel: Branding */}
//                   <div className="w-full lg:w-[35%] bg-brand p-8 md:p-12 flex flex-col justify-between text-white relative shrink-0">
//                     <button onClick={() => setSelectedBusinessId(null)} className="opacity-60 hover:opacity-100 flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all">
//                       <span>←</span> EXIT_DOSSIER
//                     </button>
//                     <div>
//                       <div className="text-7xl mb-4">{biz.icon}</div>
//                       <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">{biz.name}</h2>
//                     </div>
//                   </div>
                  
//                   {/* Right Panel: Content */}
//                   <div className="flex-grow p-8 md:p-16 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">
//                     <div className="max-w-2xl">
//                         <div className="flex items-center gap-4 mb-6">
//                             <div className="w-12 h-1 bg-cyan" />
//                             <span className="text-cyan font-black text-[10px] uppercase tracking-widest">Technical Specifications</span>
//                         </div>
//                         <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-10 italic">
//                         {biz.longDescription}
//                         </p>
//                         <div className="grid sm:grid-cols-2 gap-4 mb-12">
//                         {biz.features.map((f: string, i: number) => (
//                             <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
//                             <span className="text-cyan font-mono text-xs">0{i+1}</span>
//                             <span className="text-sm font-bold uppercase tracking-wide">{f}</span>
//                             </div>
//                         ))}
//                         </div>
//                         <Button onClick={() => { scrollTo('contact'); setSelectedBusinessId(null); }} className="group px-10 py-5 rounded-full bg-cyan hover:bg-white hover:text-cyan transition-all font-black text-xs tracking-widest uppercase flex items-center gap-4">
//                             INITIATE_COLLABORATION <span className="group-hover:translate-x-2 transition-transform">→</span>
//                         </Button>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               ))}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Leadership } from '@/components/Leadership';
import { AIAdvisor } from '@/components/AIAdvisor';
import { CommandHub } from '@/components/CommandHub';
import { AcademyHub } from '@/components/AcademyHub';
import { CareerPortal } from '@/components/CareerPortal';
import { corporateTopics, CorporateTopic } from '@/data/corporate';
import { businesses } from '@/data/businesses';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/components/Button';

/**
 * COMPACT ALIGNMENT STRATEGY:
 * Tightened py-8 md:py-16 for faster content delivery.
 */
const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; className?: string; noContainer?: boolean }> = ({ children, id, className = "", noContainer = false }) => {
  return (
    <section id={id} className={`relative w-full overflow-hidden py-8 md:py-14 ${className}`}>
      {noContainer ? children : (
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
          {children}
        </div>
      )}
    </section>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<CorporateTopic | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-cyan selection:text-white transition-colors duration-700 overflow-x-hidden w-full">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan z-[6000] origin-left shadow-[0_0_20px_#00adef]" style={{ scaleX }} />

      <AnimatePresence>
        {loading && (
          <motion.div key="loader" exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }} className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center p-12">
            <motion.div animate={{ rotate: 360, borderColor: ['#004b93', '#00adef', '#f58220', '#004b93'] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-t-4 border-l-4 rounded-full mb-8 shadow-[0_0_60px_rgba(0,173,239,0.3)]" />
            <div className="text-[10px] font-mono font-black text-cyan uppercase tracking-[1em] animate-pulse">INITIALIZING_SYSTEM</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIAdvisor />
      
      <div className="relative z-10 w-full">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="w-full flex flex-col">
          <Hero />

          {/* ABOUT: Negative margin-top to pull content closer to the Hero mask */}
          <SectionWrapper id="about" className="!pt-0 -mt-4 md:-mt-8">
            <About />
          </SectionWrapper>

          <SectionWrapper id="academy" className="bg-slate-50 dark:bg-slate-950/40">
            <AcademyHub />
          </SectionWrapper>

          <SectionWrapper id="service">
             <CommandHub onNodeClick={(id) => setSelectedBusinessId(id)} />
          </SectionWrapper>
          
          <SectionWrapper id="leadership">
            <Leadership />
          </SectionWrapper>

          <SectionWrapper id="career" className="bg-slate-50 dark:bg-slate-950/40">
            <CareerPortal />
          </SectionWrapper>

          <SectionWrapper id="contact" className="!pb-16">
            <Contact initialSubject={selectedBusinessId ? selectedBusinessId : undefined} />
          </SectionWrapper>
        </main>

        <Footer onTopicClick={(topicId) => {
           const topic = corporateTopics.find(t => t.id === topicId);
           if (topic) setSelectedTopic(topic);
        }} />
      </div>

      {/* NODE DOSSIER MODAL (Compact Version) */}
      <AnimatePresence>
        {selectedBusinessId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBusinessId(null)} className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[7000]" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="fixed inset-2 md:inset-10 lg:inset-20 z-[7010] bg-white dark:bg-slate-900 rounded-[24px] md:rounded-[40px] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-white/10">
              {businesses.filter(b => b.id === selectedBusinessId).map((biz) => (
                <React.Fragment key={biz.id}>
                  <div className="w-full lg:w-[30%] bg-brand p-6 md:p-10 flex flex-col justify-between text-white relative shrink-0">
                    <button onClick={() => setSelectedBusinessId(null)} className="opacity-60 hover:opacity-100 flex items-center gap-2 text-[9px] font-black tracking-widest uppercase">
                      ← EXIT
                    </button>
                    <div>
                      <div className="text-6xl mb-2">{biz.icon}</div>
                      <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">{biz.name}</h2>
                    </div>
                  </div>
                  
                  <div className="flex-grow p-6 md:p-12 overflow-y-auto bg-white dark:bg-slate-900 flex flex-col justify-center">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-1 bg-cyan" />
                            <span className="text-cyan font-black text-[9px] uppercase tracking-widest">Dossier v.24</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-8">
                        {biz.longDescription}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {biz.features.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                              <span className="text-cyan font-mono text-[10px]">0{i+1}</span>
                              <span className="text-xs font-bold uppercase tracking-tight">{f}</span>
                            </div>
                        ))}
                        </div>
                        <Button onClick={() => { scrollTo('contact'); setSelectedBusinessId(null); }} className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan font-black text-[10px] tracking-widest uppercase shadow-lg shadow-cyan-500/20">
                            INITIATE_SYNC
                        </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}