
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businesses } from '../data/businesses';
import { Button } from './Button';

interface BusinessesProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onContact: (subject: string) => void;
}

export const Businesses: React.FC<BusinessesProps> = ({ selectedId, setSelectedId, onContact }) => {
  return (
    <section id="nodes" className="py-40 bg-white dark:bg-slate-950 relative overflow-hidden section-shadow transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
           <div className="max-w-3xl">
              <div className="flex items-center gap-8 mb-10">
                 <span className="w-24 h-2.5 bg-cyan rounded-full shadow-vibrant"></span>
                 <span className="text-brand dark:text-cyan font-black text-[16px] uppercase tracking-[1em] transition-colors">Strategic Matrix</span>
              </div>
              <h2 className="text-6xl md:text-[8rem] font-display font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter transition-colors">
                The 8 <br/><span className="text-vibrant italic">Divisions.</span>
              </h2>
           </div>
           <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium italic border-l-8 border-orange pl-10 max-w-sm">
             "Synchronizing multi-sector logic into a singular engine of impact."
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {businesses.map((biz, idx) => (
            <motion.div 
              key={biz.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedId(biz.id)}
              className="group cursor-pointer p-10 glass-card rounded-[60px] hover:border-cyan/40 hover:shadow-vibrant transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white">NODE_0{idx+1}</span>
              </div>
              <div className="w-32 h-32 rounded-[40px] bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-7xl mb-12 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm group-hover:shadow-2xl">
                {biz.icon}
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-cyan transition-colors mb-4 italic tracking-tighter leading-none">
                {biz.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 transition-colors">
                {biz.description}
              </p>
              <div className="mt-auto flex items-center gap-4 text-brand dark:text-cyan font-black text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all">
                <span>Access Node</span>
                <span className="text-2xl animate-bounce-x">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedId(null)} 
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-3xl z-[3000]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="fixed inset-6 md:inset-20 z-[3010] bg-white dark:bg-slate-900 rounded-[80px] shadow-intense flex flex-col lg:flex-row overflow-hidden border border-brand/10"
            >
              {businesses.filter(b => b.id === selectedId).map((biz, idx) => (
                <React.Fragment key={biz.id}>
                  <div className="w-full lg:w-[40%] vibrant-gradient-bg p-12 md:p-24 flex flex-col justify-between text-white relative">
                    <button onClick={() => setSelectedId(null)} className="text-white/60 hover:text-white font-black text-4xl mb-12 flex items-center gap-4 group">
                      <span className="group-hover:-translate-x-4 transition-transform">←</span>
                      <span className="text-lg uppercase">EXIT_NODE</span>
                    </button>
                    <div>
                      <div className="text-[12rem] mb-12 drop-shadow-2xl animate-float">{biz.icon}</div>
                      <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter italic leading-none">{biz.name}</h2>
                    </div>
                    <div className="text-[10px] font-mono font-black opacity-30 uppercase tracking-[0.6em]">uFirst_Division_Registry_0x{idx}</div>
                  </div>
                  <div className="flex-grow p-12 md:p-24 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">
                    <h3 className="text-brand dark:text-cyan font-black text-[16px] uppercase tracking-[1em] mb-12 transition-colors">Industrial Brief</h3>
                    <p className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter italic mb-16 transition-colors">
                      {biz.longDescription}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8 mb-20">
                      {biz.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-6 p-10 bg-slate-50 dark:bg-slate-800 rounded-[40px] border border-slate-100 dark:border-white/5 group hover:border-brand dark:hover:border-cyan transition-all">
                          <div className="w-4 h-4 rounded-full bg-cyan shadow-vibrant"></div>
                          <span className="text-2xl font-black italic tracking-tighter text-slate-800 dark:text-white transition-colors">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => {
                        onContact(biz.name);
                        setSelectedId(null);
                    }} className="w-full !py-12 !text-2xl !rounded-[40px] shadow-vibrant">INITIATE STRATEGIC DIALOGUE</Button>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
