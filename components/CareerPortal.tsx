import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { businesses } from '../data/businesses';

export const CareerPortal: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: 'General Application',
    message: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulated API call - In a real scenario, this would use FormData to upload the file
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
    } catch (error) {
      console.error('CAREER_SYNC_ERROR:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-start">
        
        {/* Informational Side */}
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-6 mb-8">
               <span className="w-12 h-2 bg-orange rounded-full shadow-[0_0_15px_#f58220]"></span>
               <span className="text-orange font-black text-[12px] md:text-[14px] uppercase tracking-[0.6em] md:tracking-[0.8em]">Talent Node</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] italic mb-10">
              Join the <br/><span className="text-vibrant">Sovereign.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
              We are architecting the future of industrial synergy. Synchronize your career with the global uFirst engine.
            </p>
          </div>

          <div className="grid gap-4">
             {[
               { title: 'Global Mobility', desc: 'Sync with our 8 strategic divisions worldwide.', icon: '🌐' },
               { title: 'Neural Growth', desc: 'Continuous mastery labs and ISA laboratory access.', icon: '🧠' },
               { title: 'Elite Benefits', desc: 'Sovereign-grade packages for industrial high-performers.', icon: '💎' }
             ].map((benefit, i) => (
               <div key={i} className="flex items-center gap-6 p-6 glass-card rounded-[30px] border-slate-100 dark:border-white/5">
                 <div className="text-3xl">{benefit.icon}</div>
                 <div>
                   <h4 className="text-lg font-display font-black text-slate-900 dark:text-white italic tracking-tight">{benefit.title}</h4>
                   <p className="text-sm text-slate-500">{benefit.desc}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="p-8 rounded-[40px] bg-cyan/5 border border-cyan/10">
             <div className="text-[10px] font-black text-cyan uppercase tracking-widest mb-2">Sync Note</div>
             <p className="text-xs text-slate-500 font-medium italic">
               "We prioritize technical mastery, ethical integrity, and autonomous decision-making in our candidates."
             </p>
          </div>
        </div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-card p-8 md:p-16 rounded-[40px] md:rounded-[60px] border-slate-100 dark:border-white/5 shadow-giant bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-8">
                 <div className="text-8xl">🚀</div>
                 <h3 className="text-4xl md:text-6xl font-display font-black text-cyan tracking-tight italic">Dossier Synced.</h3>
                 <p className="text-slate-500 text-lg">Your professional data has been integrated into our recruitment lattice. Our HQ team will review your CV shortly.</p>
                 <Button onClick={() => setStatus('idle')} variant="secondary">SUBMIT ANOTHER NODE</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Full Identity</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Fs Ferdows"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[25px] p-6 text-base outline-none focus:border-cyan transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Sync Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[25px] p-6 text-base outline-none focus:border-cyan transition-all dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Target Division</label>
                  <select 
                    value={formData.position}
                    onChange={e => setFormData({...formData, position: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[25px] p-6 text-base outline-none focus:border-cyan transition-all dark:text-white appearance-none"
                  >
                    <option>General Application</option>
                    {businesses.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                </div>

                {/* CV Upload Zone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Dossier Upload (CV/Resume)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed rounded-[30px] p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      file ? 'bg-cyan/5 border-cyan shadow-vibrant' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 hover:border-cyan/40'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <div className="text-4xl mb-4">{file ? '📄' : '📤'}</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
                      {file ? file.name : 'Select or Drop CV'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2">PDF, DOCX up to 10MB</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Expertise Brief</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your industrial logic..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[30px] p-6 text-base outline-none focus:border-cyan transition-all dark:text-white resize-none"
                  />
                </div>

                <Button 
                  disabled={status === 'loading'} 
                  type="submit" 
                  className="w-full !py-8 !text-lg !rounded-full shadow-vibrant"
                >
                  {status === 'loading' ? 'TRANSMITTING DOSSIER...' : 'SYNC WITH RECRUITMENT NODES'}
                </Button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};