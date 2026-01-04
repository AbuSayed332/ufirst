import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <div className="relative flex items-center transition-transform duration-500 hover:scale-105">
        <img 
          src="https://r.jina.ai/i/6ef10931593c4c938a4a5eb23b185077" 
          alt="uFirst Limited" 
          className="h-10 md:h-12 w-auto object-contain"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.logo-fallback')) {
               const span = document.createElement('span');
               span.className = 'logo-fallback text-[#004b93] font-black text-xl tracking-tighter px-2 uppercase';
               span.innerText = 'uFirst Ltd.';
               parent.appendChild(span);
            }
          }}
        />
      </div>
      {showTagline && (
        <div className="ml-3">
           <div className="text-[10px] font-black text-[#004b93] dark:text-cyan uppercase tracking-[0.4em] leading-none mb-1">uFirst Limited</div>
           <div className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">A Place of Excellence</div>
        </div>
      )}
    </div>
  );
};