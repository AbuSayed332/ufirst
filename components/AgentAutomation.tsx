import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  description: string;
  status: 'ACTIVE' | 'SYNCING' | 'IDLE';
}

const NODES: Node[] = [
  { id: 'ingress', label: 'Edge Ingress', icon: '📡', x: 10, y: 50, description: 'Global Data Entry Node', status: 'ACTIVE' },
  { id: 'parsing', label: 'Cognitive Parsing', icon: '🔍', x: 35, y: 25, description: 'Neural Pattern Recognition', status: 'ACTIVE' },
  { id: 'synthesis', label: 'Lattice Synthesis', icon: '💎', x: 35, y: 75, description: 'Strategic Intelligence Build', status: 'SYNCING' },
  { id: 'risk', label: 'Risk Mitigation', icon: '🛡️', x: 65, y: 25, description: 'Sovereign Security Audit', status: 'ACTIVE' },
  { id: 'audit', label: 'Sovereign Audit', icon: '⚖️', x: 65, y: 75, description: 'Governance Compliance Check', status: 'ACTIVE' },
  { id: 'execution', label: 'Final Execution', icon: '🚀', x: 90, y: 50, description: 'Autonomous Action Deployment', status: 'IDLE' },
];

const PATHS = [
  { from: 'ingress', to: 'parsing' },
  { from: 'ingress', to: 'synthesis' },
  { from: 'parsing', to: 'risk' },
  { from: 'synthesis', to: 'audit' },
  { from: 'risk', to: 'execution' },
  { from: 'audit', to: 'execution' },
  { from: 'parsing', to: 'synthesis' },
  { from: 'risk', to: 'audit' },
];

export const AgentAutomation: React.FC = () => {
  const [activePackets, setActivePackets] = useState<{ id: string; pathIdx: number; color: string }[]>([]);
  const [telemetry, setTelemetry] = useState<{ id: string; msg: string; type: string; time: string }[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [systemLoad, setSystemLoad] = useState(64);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulation Engine with optimized frequency for mobile
  useEffect(() => {
    const packetInterval = setInterval(() => {
      const pathIdx = Math.floor(Math.random() * PATHS.length);
      const newPacket = {
        id: Math.random().toString(36).substr(2, 9),
        pathIdx,
        color: Math.random() > 0.5 ? '#00adef' : '#f58220',
      };
      // Reduce packet density on mobile for clarity and performance
      setActivePackets(prev => [...prev, newPacket].slice(isMobile ? -8 : -20));
      
      const node = NODES[Math.floor(Math.random() * NODES.length)];
      const logs = [
        { msg: `PKT_TRANS: Node_${node.id.toUpperCase()} sequence valid`, type: 'SUCCESS' },
        { msg: `Neural Load: ${systemLoad}% - Optimized`, type: 'INFO' },
        { msg: `Sovereign Audit: Integrity 100%`, type: 'SUCCESS' },
        { msg: `Handshake: Node_0x${Math.floor(Math.random()*100)}`, type: 'INFO' }
      ];
      const log = logs[Math.floor(Math.random() * logs.length)];
      setTelemetry(prev => [{ ...log, id: Math.random().toString(), time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) }, ...prev].slice(0, 10));
      
      setSystemLoad(prev => Math.max(40, Math.min(95, prev + (Math.random() - 0.5) * 5)));
    }, isMobile ? 1000 : 600);

    return () => clearInterval(packetInterval);
  }, [systemLoad, isMobile]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-40 relative">
      <div className="grid lg:grid-cols-[1.5fr_0.5fr] gap-6 md:gap-12 items-start">
        
        <div className="relative flex flex-col">
          {/* Header */}
          <div className="mb-8 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 md:gap-6 mb-4 md:mb-8"
            >
              <div className="w-12 md:w-20 h-1.5 md:h-2 bg-brand rounded-full shadow-vibrant" />
              <span className="text-cyan font-black text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.8em]">Autonomous Lattice v7.2</span>
            </motion.div>
            <h2 className="text-4xl md:text-9xl font-display font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter italic">
              Neural Agent <br/><span className="text-vibrant">Automation.</span>
            </h2>
          </div>

          {/* Visualizer Container - Adaptive Aspect Ratio */}
          <div className="glass-card rounded-[30px] md:rounded-[60px] p-4 md:p-16 border-slate-100 dark:border-white/5 shadow-giant relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl aspect-[4/5] md:aspect-[16/10] min-h-[450px] md:min-h-[600px]">
            
            {/* Scanline Effect for Cyberpunk Look */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%]" />

            {/* SVG Lattice Mesh */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full absolute inset-0 pointer-events-none p-6 md:p-20 overflow-visible">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,173,239,0.05)" />
                  <stop offset="50%" stopColor="rgba(0,173,239,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,173,239,0.05)" />
                </linearGradient>
              </defs>

              {/* Static Connections */}
              {PATHS.map((path, i) => {
                const from = NODES.find(n => n.id === path.from)!;
                const to = NODES.find(n => n.id === path.to)!;
                return (
                  <g key={`path-${i}`}>
                    <line 
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                      stroke="url(#lineGrad)" 
                      strokeWidth={isMobile ? "1.5" : "0.8"} 
                    />
                    <motion.line 
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                      stroke="#00adef" 
                      strokeWidth="0.4"
                      strokeDasharray="1, 15"
                      animate={{ strokeDashoffset: [0, -30] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="opacity-20"
                    />
                  </g>
                );
              })}

              {/* Data Packets */}
              <AnimatePresence>
                {activePackets.map(packet => {
                  const path = PATHS[packet.pathIdx];
                  const from = NODES.find(n => n.id === path.from)!;
                  const to = NODES.find(n => n.id === path.to)!;
                  return (
                    <motion.g key={packet.id}>
                      <motion.circle
                        initial={{ cx: `${from.x}%`, cy: `${from.y}%`, r: 0 }}
                        animate={{ 
                          cx: [`${from.x}%`, `${to.x}%`], 
                          cy: [`${from.y}%`, `${to.y}%`],
                          r: [0, isMobile ? 1.5 : 0.8, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        fill={packet.color}
                        filter="url(#glow)"
                      />
                      <motion.circle
                        initial={{ cx: `${from.x}%`, cy: `${from.y}%`, r: 0 }}
                        animate={{ 
                          cx: [`${from.x}%`, `${to.x}%`], 
                          cy: [`${from.y}%`, `${to.y}%`],
                          r: [0, isMobile ? 2 : 1.2, 0],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        fill={packet.color}
                        filter="url(#glow)"
                      />
                    </motion.g>
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Interactive Nodes Overlay */}
            <div className="absolute inset-0 p-6 md:p-20">
              {NODES.map(node => (
                <div 
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative group">
                    <motion.div
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setHoveredNode(hoveredNode === node.id ? null : node.id)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 md:w-24 md:h-24 rounded-[20px] md:rounded-[40px] flex items-center justify-center text-2xl md:text-5xl transition-all duration-500 relative z-20 cursor-pointer ${
                        hoveredNode === node.id 
                        ? 'bg-brand dark:bg-cyan text-white shadow-vibrant' 
                        : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/10 shadow-lg'
                      }`}
                    >
                      {node.icon}
                      
                      {/* Status Ring */}
                      <div className={`absolute -inset-1.5 md:-inset-2 rounded-[24px] md:rounded-[44px] border-2 border-dashed opacity-40 transition-all ${
                        node.status === 'ACTIVE' ? 'border-green-500 animate-[spin_15s_linear_infinite]' : 'border-slate-300'
                      }`} />
                    </motion.div>

                    {/* Node Data Projection - Improved for Mobile Positioning */}
                    <AnimatePresence>
                      {hoveredNode === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className={`absolute ${node.y > 50 ? 'bottom-full mb-6' : 'top-full mt-6'} left-1/2 -translate-x-1/2 w-48 md:w-64 glass-card p-4 md:p-6 rounded-[25px] md:rounded-[30px] border border-cyan/30 z-[100] shadow-2xl pointer-events-none`}
                        >
                          <div className="text-[8px] md:text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">NODE: {node.id.toUpperCase()}</div>
                          <div className="text-sm md:text-lg font-display font-black text-slate-900 dark:text-white leading-tight mb-2 italic">{node.label}</div>
                          <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 leading-tight mb-3">{node.description}</p>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-white/10">
                             <span className="text-[8px] font-black text-slate-400 uppercase">LOAD_S_ID</span>
                             <span className="text-[8px] font-mono text-cyan">0x{(Math.random()*100).toFixed(0)}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Telemetry Sidebar - Responsive Flow */}
        <div className="flex flex-col gap-6 md:gap-8 lg:sticky lg:top-40">
          {/* Main Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
             <div className="glass-card p-5 md:p-6 rounded-[25px] md:rounded-[35px] border-white/5 dark:bg-slate-900 shadow-industrial">
                <div className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Throughput</div>
                <div className="text-2xl md:text-3xl font-display font-black text-brand dark:text-cyan italic">{(systemLoad * 1.4).toFixed(0)}<span className="text-xs ml-1">TPS</span></div>
             </div>
             <div className="glass-card p-5 md:p-6 rounded-[25px] md:rounded-[35px] border-white/5 dark:bg-slate-900 shadow-industrial">
                <div className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Neural Load</div>
                <div className="text-2xl md:text-3xl font-display font-black text-orange italic">{systemLoad.toFixed(1)}<span className="text-xs ml-1">%</span></div>
             </div>
          </div>

          {/* Log Monitor - Better Height for Mobile */}
          <div className="glass-card rounded-[30px] md:rounded-[45px] p-6 md:p-8 border-slate-100 dark:border-white/5 shadow-giant bg-white dark:bg-slate-950 flex flex-col h-[350px] md:h-[450px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-vibrant" />
                 <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-cyan">Live_Output</h3>
              </div>
              <span className="text-[7px] font-mono text-slate-500">STABLE_REL</span>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-2 font-mono text-[9px] md:text-[10px]">
              <AnimatePresence mode="popLayout">
                {telemetry.map((log) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    key={log.id} 
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                      log.type === 'SUCCESS' ? 'bg-green-500/5 border-green-500/10 text-green-500/80' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="text-[7px] opacity-40 shrink-0">[{log.time}]</span>
                    <span className="font-bold tracking-tighter leading-tight uppercase">{log.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
               <div className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sync Integrity</div>
               <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${systemLoad}%` }} 
                    className="h-full bg-gradient-to-r from-brand to-cyan"
                  />
               </div>
            </div>
          </div>

          <div className="p-6 md:p-10 rounded-[30px] md:rounded-[45px] bg-brand/5 dark:bg-cyan/5 border border-brand/10 dark:border-cyan/10 hidden sm:block">
             <div className="text-[10px] md:text-[11px] font-black text-brand dark:text-cyan uppercase tracking-[0.3em] mb-4">Sovereign Note</div>
             <p className="text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
               "The uFirst Neural Lattice synchronizes nodes using <span className="font-bold text-slate-900 dark:text-white">Proof-of-Excellence</span>, ensuring total logical accuracy."
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};