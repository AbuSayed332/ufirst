import React, { useState } from 'react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { businesses } from '../data/businesses';

export const Contact: React.FC<{ initialSubject?: string }> = ({ initialSubject }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || businesses[0].name,
    message: ''
  });

  const officeLocation = "Road #16, House #984, Baitul Aman, Dhaka, Bangladesh";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeLocation)}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902269994273!2d90.3582498!3d23.7508608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf6000000001%3A0x8979a405906f30d0!2suFirst%20Limited!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('NETWORK_RESPONSE_NOT_OK');
      }
    } catch (error) {
      console.error('CONTACT_TRANSMISSION_ERROR:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-40 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-start">
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-6 mb-8">
                 <span className="w-12 h-2 bg-brand rounded-full"></span>
                 <span className="text-cyan font-black text-[12px] md:text-[14px] uppercase tracking-[0.6em] md:tracking-[0.8em]">Reach Portal</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black text-brand dark:text-cyan tracking-tighter leading-none italic mb-8 transition-colors">
                Access <br/>Excellence.
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
                Connect directly with the uFirst Strategic Command Hub for global industrial inquiries and partnerships.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: '✉', label: 'Electronic Mail', val: 'ceo@ufirstltd.com', href: 'mailto:ceo@ufirstltd.com' },
                { icon: '☏', label: 'Primary Line', val: '+880 1717 623 208', href: 'tel:+8801717623208' },
              ].map((link, i) => (
                <a 
                  key={i} 
                  href={link.href}
                  className="group flex items-center gap-6 md:gap-8 p-6 md:p-10 glass-card dark:bg-slate-800/50 rounded-[40px] md:rounded-[50px] border-slate-100 dark:border-white/5 hover:border-brand/40 dark:hover:border-cyan/40 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[24px] bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl md:text-3xl text-brand dark:text-cyan group-hover:bg-brand dark:group-hover:bg-cyan group-hover:text-white dark:group-hover:text-slate-900 transition-all">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{link.label}</div>
                    <div className="text-xl md:text-2xl font-display font-black text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-cyan transition-colors">{link.val}</div>
                  </div>
                </a>
              ))}

              {/* Enhanced Interactive Location Card */}
              <div className="group p-6 md:p-10 glass-card dark:bg-slate-800/50 rounded-[40px] md:rounded-[50px] border-slate-100 dark:border-white/5 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[24px] bg-cyan/10 flex items-center justify-center text-2xl md:text-3xl text-cyan">
                      📍
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Global Hub</div>
                      <div className="text-lg md:text-xl font-display font-black text-slate-900 dark:text-white leading-tight">
                        {officeLocation}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-48 rounded-[30px] overflow-hidden border border-white/10 group-hover:border-cyan/40 transition-all shadow-inner">
                    <iframe
                      width="100%" height="100%" frameBorder="0" 
                      style={{ border:0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)' }}
                      src={embedUrl}
                      allowFullScreen
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-cyan/5 transition-colors" />
                  </div>

                  <button 
                    onClick={() => window.open(directionsUrl, '_blank')}
                    className="w-full py-5 bg-cyan text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-vibrant flex items-center justify-center gap-3"
                  >
                    <span>Get Navigation Data</span>
                    <span className="text-lg">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-50 dark:bg-slate-800/30 p-8 md:p-24 rounded-[60px] md:rounded-[80px] border border-slate-100 dark:border-white/5 shadow-industrial"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="s" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 md:py-24 space-y-8">
                   <div className="text-8xl text-cyan">✓</div>
                   <h3 className="text-4xl md:text-5xl font-display font-black text-brand dark:text-cyan tracking-tight italic">Transmission Received.</h3>
                   <p className="text-slate-500 text-lg md:text-xl font-medium">Our strategic team will respond to your brief within 12 hours.</p>
                   <Button onClick={() => setStatus('idle')} variant="secondary">SEND ANOTHER BRIEF</Button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 md:py-24 space-y-8">
                   <div className="text-8xl">⚠️</div>
                   <h3 className="text-3xl font-display font-black text-red-500">Node Failure.</h3>
                   <p className="text-slate-500">The primary transmission relay is currently offline. Please try again or contact us via email.</p>
                   <Button onClick={() => setStatus('idle')} variant="ghost">RETRY_NODE</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-2 md:space-y-3">
                         <label className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                         <input 
                            required 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[25px] md:rounded-[30px] p-6 md:p-8 outline-none focus:border-brand dark:focus:border-cyan transition-all text-lg md:text-xl dark:text-white" 
                          />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                         <label className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-slate-400 ml-4">Corporate Email</label>
                         <input 
                            required 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[25px] md:rounded-[30px] p-6 md:p-8 outline-none focus:border-brand dark:focus:border-cyan transition-all text-lg md:text-xl dark:text-white" 
                          />
                      </div>
                   </div>
                   <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-slate-400 ml-4">Target Division</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[25px] md:rounded-[30px] p-6 md:p-8 outline-none focus:border-brand dark:focus:border-cyan transition-all text-lg md:text-xl appearance-none dark:text-white"
                      >
                        {businesses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                      </select>
                   </div>
                   <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-slate-400 ml-4">Inquiry Brief</label>
                      <textarea 
                        required 
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[30px] md:rounded-[40px] p-6 md:p-8 outline-none focus:border-brand dark:focus:border-cyan transition-all text-lg md:text-xl resize-none dark:text-white"
                      ></textarea>
                   </div>
                   <Button disabled={status === 'loading'} type="submit" className="w-full !py-8 md:!py-10 !text-xl md:!text-2xl !rounded-[30px] md:!rounded-[40px]">
                      {status === 'loading' ? 'TRANSMITTING...' : 'INITIATE DIALOGUE'}
                   </Button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};