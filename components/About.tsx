// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// export const About: React.FC = () => {
//   const containerRef = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

//   return (
//     <section id="about" ref={containerRef} className="py-24 md:py-48 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors w-full">
//       <div className="absolute top-1/2 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand/5 rounded-full blur-[100px] md:blur-[180px] -translate-y-1/2 -translate-x-1/2" />
      
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 md:gap-24 items-start">
          
//           <motion.div style={{ y: y1 }} className="relative">
//             <div className="flex items-center gap-4 md:gap-8 mb-8 md:mb-12">
//                <div className="w-12 md:w-20 h-1.5 md:h-2 bg-orange rounded-full shadow-[0_0_15px_#f58220]" />
//                <span className="text-cyan font-black text-[12px] md:text-[14px] uppercase tracking-[0.5em] md:tracking-[1em]">The uFirst Heritage</span>
//             </div>
            
//             <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter leading-[0.9] mb-10 md:mb-16 text-slate-900 dark:text-white italic">
//               Absolute <br/><span className="text-vibrant">Sovereignty.</span>
//             </h2>
            
//             <div className="space-y-8 md:space-y-12 max-w-2xl">
//               <p className="text-2xl md:text-4xl lg:text-5xl text-slate-600 dark:text-slate-300 font-medium leading-tight tracking-tight">
//                 Established in <span className="text-brand dark:text-cyan font-black italic">2015</span>, uFirst Limited was architected to be the nexus of global industrial synchronicity.
//               </p>
//               <p className="text-lg md:text-2xl text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
//                 We bridge the gap between human excellence and automated industrial logic, managing 8 specialized nodes across technology, agro-commerce, and logistics.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mt-20 md:mt-32 pt-12 md:pt-20 border-t border-slate-100 dark:border-white/10">
//               {[
//                 { val: '2015', label: 'GENESIS', sub: 'Inception' },
//                 { val: '12+', label: 'DIVISIONS', sub: 'Global Nodes' },
//                 { val: 'ISO', label: '9001:2015', sub: 'Quality Logic' }
//               ].map((stat, i) => (
//                 <div key={i} className="group cursor-default">
//                   <div className="text-4xl md:text-6xl font-display font-black text-brand dark:text-cyan mb-1 group-hover:scale-105 transition-transform origin-left">{stat.val}</div>
//                   <div className="text-[9px] md:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1">{stat.label}</div>
//                   <div className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest">{stat.sub}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div style={{ y: y2 }} className="space-y-6 md:space-y-10 mt-16 lg:mt-0">
//             {[
//               { title: 'Sovereign Assets', text: 'Managing high-complexity infrastructure with automated industrial logic.', icon: '🏢' },
//               { title: 'Neural Logistics', text: 'Advanced EXIM protocols ensuring zero-latency supply chain sync.', icon: '🚢' },
//               { title: 'Future Yield', text: 'Modernizing agro-science through precision IOT and organic ethics.', icon: '🌱' },
//               { title: 'Clinical Precision', text: 'Next-gen healthcare hubs delivering patient-first medical nodes.', icon: '🏥' }
//             ].map((item, i) => (
//               <motion.div 
//                 key={i}
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="group flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-10 rounded-[35px] md:rounded-[45px] glass-card border-slate-200 dark:border-white/5 hover:border-cyan/40 transition-all duration-500 shadow-industrial"
//               >
//                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-[25px] md:rounded-[30px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand dark:group-hover:bg-cyan group-hover:text-white transition-all duration-300">
//                   <span className="text-3xl md:text-4xl transition-transform duration-300">{item.icon}</span>
//                 </div>
//                 <div>
//                   <h4 className="text-xl md:text-2xl font-display font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-cyan transition-colors italic tracking-tight">{item.title}</h4>
//                   <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-snug font-medium">{item.text}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const About: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="about" ref={containerRef} className="py-12 md:py-20 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors w-full">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand/5 rounded-full blur-[100px] md:blur-[180px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16 items-start">
          
          <motion.div style={{ y: y1 }} className="relative">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
               <div className="w-12 md:w-16 h-1.5 bg-orange rounded-full shadow-[0_0_15px_#f58220]" />
               <span className="text-cyan font-black text-[12px] md:text-[14px] uppercase tracking-[0.5em] md:tracking-[0.8em]">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.95] mb-8 md:mb-10 text-slate-900 dark:text-white italic">
              A Place of <br/><span className="text-vibrant">Excellence.</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 max-w-2xl">
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-medium leading-tight tracking-tight">
                Since <span className="text-brand dark:text-cyan font-black italic">2020</span>, uFirst Limited has emerged as a premier IT solutions provider, driving digital transformation through precision and innovation. Our mission is to empower businesses with cutting-edge technology that fosters growth and operational excellence. 
              </p>
              {/* <p className="text-base md:text-lg text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                Our expertise spans across custom software development, high-end web portals, and strategic digital marketing, ensuring our global clientele stays ahead in the modern industrial landscape.
              </p> */}
            </div>
            
            {/* Quick Stats Section */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-slate-100 dark:border-white/10">
              {[
                { val: '2020', label: 'EXPERIENCE', sub: 'Inception Year' },
                { val: '20+', label: 'CLIENTS', sub: 'Global Partners' },
                { val: '17+', label: 'EXPERTS', sub: 'Core Workforce' }
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-3xl md:text-4xl font-display font-black text-brand dark:text-cyan mb-1 group-hover:scale-105 transition-transform origin-left">{stat.val}</div>
                  <div className="text-[9px] md:text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                  <div className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest">{stat.sub}</div>
                </div>
              ))}
            </div> */}
          </motion.div>

          {/* Core Services Column */}
          <motion.div style={{ y: y2 }} className="space-y-4 md:space-y-6 mt-12 lg:mt-0">
            {[
              { 
                title: 'AI & Business Automation', 
                text: 'Cutting-edge AI integrations and bespoke automation solutions to streamline operations and enhance efficiency.', 
                icon: '🤖' 
              },
              { 
                title: 'Cybersecurity & Cloud Solutions Optimization', 
                text: 'Robust cybersecurity frameworks and cloud architecture designs to safeguard digital assets and ensure seamless scalability.', 
                icon: '☁️' 
              },
              { 
                title: 'Digital Transformation', 
                text: 'Comprehensive IT consulting and digital strategy services to modernize and optimize business operations.', 
                icon: '💡' 
              },
              // { 
              //   title: 'ERP & CRM Systems', 
              //   text: 'Full-cycle enterprise resource planning solutions and custom modules for seamless operational management.', 
              //   icon: '⚙️' 
              // }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row gap-4 md:gap-6 p-6 md:p-8 rounded-[25px] md:rounded-[35px] glass-card border-slate-200 dark:border-white/5 hover:border-cyan/40 transition-all duration-500 shadow-industrial"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[18px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand dark:group-hover:bg-cyan group-hover:text-white transition-all duration-300">
                  <span className="text-2xl transition-transform duration-300">{service.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-display font-black text-slate-900 dark:text-white mb-1 group-hover:text-brand dark:group-hover:text-cyan transition-colors italic tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-snug font-medium">
                    {service.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
