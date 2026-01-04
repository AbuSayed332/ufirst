import React from 'react';
import { Logo } from './Logo';
import { corporateTopics } from '../data/corporate';

interface FooterProps {
  onTopicClick: (topicId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTopicClick }) => {
  const coreLinks = corporateTopics.filter(t => t.category === 'Core');
  const governanceLinks = corporateTopics.filter(t => t.category === 'Governance');

  const socials = [
    { 
      id: 'FB', 
      label: 'Facebook',
      url: 'https://www.facebook.com/ufirstlimited',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      )
    },
    { 
      id: 'LI', 
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ufirstlimited',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
      )
    },
    { 
      id: 'TW', 
      label: 'Twitter',
      url: 'https://twitter.com/ufirstlimited',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      )
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 py-12 md:py-24 border-t border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-12 md:gap-20 items-start">
          
          <div className="space-y-10">
            <Logo showTagline={true} className="mb-6" />
            
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg leading-snug font-medium tracking-tight">
              uFirst Limited: A global powerhouse committed to the pursuit of excellence across technology, infrastructure, and human services.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {socials.map(social => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center border border-slate-100 dark:border-white/10 rounded-2xl text-slate-400 hover:border-cyan hover:text-cyan hover:bg-cyan/5 transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-6 h-1 bg-cyan rounded-full"></div>
                  <span className="text-[9px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">Chief Engineer</span>
               </div>
               <div className="text-xl font-display font-black text-slate-900 dark:text-white italic tracking-tighter">
                  Fs Ferdows
               </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
             <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-brand dark:text-cyan">Corporate Core</h4>
             <ul className="space-y-3 md:space-y-5">
                {coreLinks.map(topic => (
                  <li key={topic.id}>
                    <button 
                      onClick={() => onTopicClick(topic.id)}
                      className="text-lg text-slate-500 dark:text-slate-400 font-bold hover:text-orange transition-all tracking-tight flex items-center group text-left border-none bg-transparent"
                    >
                      <span className="w-0 h-0.5 bg-orange group-hover:w-4 transition-all mr-0 group-hover:mr-3"></span>
                      {topic.title}
                    </button>
                  </li>
                ))}
             </ul>
          </div>

          <div className="space-y-6 md:space-y-8">
             <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-brand dark:text-cyan">Governance</h4>
             <ul className="space-y-3 md:space-y-5">
                {governanceLinks.map(topic => (
                  <li key={topic.id}>
                    <button 
                      onClick={() => onTopicClick(topic.id)}
                      className="text-lg text-slate-500 dark:text-slate-400 font-bold hover:text-orange transition-all tracking-tight flex items-center group text-left border-none bg-transparent"
                    >
                      <span className="w-0 h-0.5 bg-orange group-hover:w-4 transition-all mr-0 group-hover:mr-3"></span>
                      {topic.title}
                    </button>
                  </li>
                ))}
             </ul>
          </div>

        </div>

        <div className="mt-16 md:mt-24 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-slate-400 dark:text-slate-600 text-[10px] font-black tracking-widest uppercase text-center md:text-left transition-colors">
              © {new Date().getFullYear()} uFirst Limited. Absolute Sovereignty.
           </div>
           <div className="flex flex-wrap justify-center items-center gap-6 text-[9px] font-black text-brand dark:text-slate-400 uppercase tracking-[0.4em] transition-colors">
              <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan"></div>
                 ISO 9001:2015
              </span>
              <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange"></div>
                 HQ: Dhaka
              </span>
           </div>
        </div>
      </div>
    </footer>
  );
};