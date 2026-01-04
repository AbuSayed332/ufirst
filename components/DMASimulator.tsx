
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface TransferConfig {
  count: number;
  mode: 'Burst' | 'CycleSteal';
  interruptEnabled: boolean;
  interruptTrigger: 'TC' | 'Half' | 'Error'; 
}

export const DMASimulator: React.FC = () => {
  const [config, setConfig] = useState<TransferConfig>({
    count: 32,
    mode: 'Burst',
    interruptEnabled: true,
    interruptTrigger: 'TC',
  });

  const [status, setStatus] = useState<'IDLE' | 'BUS_REQ' | 'TRANSFERRING' | 'INTERRUPTING' | 'DONE'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [busMaster, setBusMaster] = useState<'CPU' | 'DMAC'>('CPU');
  const [logs, setLogs] = useState<{ type: 'SYSTEM' | 'BUS' | 'IRQ', text: string, timestamp: string }[]>([]);
  const [irqSignaled, setIrqSignaled] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  const timerRef = useRef<any>(null);

  const addLog = (type: 'SYSTEM' | 'BUS' | 'IRQ', text: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ type, text, timestamp }, ...prev].slice(0, 10));
  };

  const startTransfer = () => {
    if (manualMode) return;
    if (status !== 'IDLE' && status !== 'DONE') return;
    
    setStatus('BUS_REQ');
    addLog('SYSTEM', 'DMA_CORE_ACTIVATE: Synchronizing registers...');
    addLog('BUS', 'DMAC: Asserting HOLD to CPU logic...');
    
    setTimeout(() => {
      setBusMaster('DMAC');
      setStatus('TRANSFERRING');
      setProgress(0);
      setCurrentCount(config.count);
      addLog('BUS', 'CPU: HLDA Acknowledged. Bus mastership transferred.');
      addLog('SYSTEM', `DMA: Initiating ${config.mode} transfer sequence.`);
    }, 1200);
  };

  const triggerError = () => {
    if (status !== 'TRANSFERRING') return;
    if (timerRef.current) clearInterval(timerRef.current);
    
    addLog('IRQ', 'BUS_FAULT: Parity error detected at address 0x4002.');
    setStatus('INTERRUPTING');
    setIrqSignaled(true);
  };

  const reset = () => {
    setStatus('IDLE');
    setProgress(0);
    setCurrentCount(0);
    setBusMaster('CPU');
    setIrqSignaled(false);
    setLogs([]);
    setManualMode(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const forceBusMaster = (master: 'CPU' | 'DMAC') => {
    setBusMaster(master);
    addLog('BUS', `MANUAL_OVERRIDE: Forcing Bus Master to ${master}.`);
  };

  const forceStatus = (newStatus: typeof status) => {
    setStatus(newStatus);
    if (newStatus === 'INTERRUPTING') setIrqSignaled(true);
    else if (newStatus !== 'TRANSFERRING') setIrqSignaled(false);
    addLog('SYSTEM', `MANUAL_OVERRIDE: Forcing System Status to ${newStatus}.`);
  };

  useEffect(() => {
    if (status === 'TRANSFERRING' && !manualMode) {
      const stepTime = config.mode === 'Burst' ? 150 : 500;
      
      timerRef.current = setInterval(() => {
        setCurrentCount(prev => {
          const next = prev - 1;
          const completed = config.count - next;
          const percent = (completed / config.count) * 100;
          setProgress(percent);

          // Half-Transfer Trigger logic
          if (config.interruptEnabled && config.interruptTrigger === 'Half' && completed === Math.floor(config.count / 2)) {
            addLog('IRQ', 'SIGNAL: Half-Transfer reached. Raising Level-7 IRQ.');
            setIrqSignaled(true);
            // Non-blocking interrupt for Half-Xfer usually allows continuation
            setTimeout(() => setIrqSignaled(false), 1500);
          }

          if (next <= 0) {
            clearInterval(timerRef.current!);
            
            if (config.interruptEnabled && config.interruptTrigger === 'TC') {
              setStatus('INTERRUPTING');
              setIrqSignaled(true);
              addLog('IRQ', 'SIGNAL: Terminal Count (TC) reached. Blocking bus release until ACK.');
            } else {
              setBusMaster('CPU');
              setStatus('DONE');
              addLog('SYSTEM', 'DMA: Block transfer verified. Bus released.');
            }
            return 0;
          }
          return next;
        });
      }, stepTime);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, config, manualMode]);

  const handleISR = () => {
    addLog('SYSTEM', 'CPU: Executing Interrupt Service Routine (ISR)...');
    setTimeout(() => {
      setIrqSignaled(false);
      setBusMaster('CPU');
      setStatus('DONE');
      addLog('SYSTEM', 'CPU: ISR_COMPLETE. Data integrity validated. Bus returned to CPU.');
    }, 1500);
  };

  return (
    <section id="dma" className="py-32 bg-white relative overflow-hidden section-shadow">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
           <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-8">
                 <span className="w-16 h-2 bg-brand rounded-full"></span>
                 <span className="text-cyan font-black text-[12px] uppercase tracking-[0.8em]">Architectural Logic Hub</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none italic">
                DMA <br/><span className="text-vibrant">Subsystem.</span>
              </h2>
           </div>
           <div className="flex flex-wrap gap-4">
              <Button onClick={startTransfer} disabled={(status !== 'IDLE' && status !== 'DONE') || manualMode}>
                {status === 'IDLE' || status === 'DONE' ? 'INITIATE_XFER' : 'CORE_BUSY'}
              </Button>
              <Button variant="ghost" onClick={triggerError} disabled={status !== 'TRANSFERRING'} className="!border-red-100 !text-red-500 !bg-red-50/50">INJECT_FAULT</Button>
              <Button variant="ghost" onClick={reset} className="!border !border-slate-100 !rounded-[30px]">FLUSH_STATE</Button>
           </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          
          <div className="space-y-12">
            {/* Visual Simulator Card */}
            <div className="glass-card rounded-[60px] p-12 border-slate-100 shadow-industrial relative min-h-[500px] flex flex-col justify-center">
              
              {/* Bus Status Indicators */}
              <div className="absolute top-12 left-12 flex gap-4 z-20">
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${busMaster === 'DMAC' ? 'bg-cyan animate-pulse shadow-[0_0_10px_#00adef]' : 'bg-slate-200'}`} />
                    <span className="text-[9px] font-black uppercase text-slate-400">BUS_HOLD</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${irqSignaled ? 'bg-orange animate-pulse shadow-[0_0_10px_#f58220]' : 'bg-slate-200'}`} />
                    <span className="text-[9px] font-black uppercase text-slate-400">IRQ_PENDING</span>
                 </div>
              </div>

              {/* Node Layout */}
              <div className="grid grid-cols-3 gap-8 items-center relative py-12">
                
                {/* CPU NODE */}
                <div className="flex flex-col items-center gap-6">
                  <motion.div 
                    animate={{ 
                      borderColor: irqSignaled ? '#f58220' : (busMaster === 'CPU' ? '#004b93' : '#f1f5f9'),
                      backgroundColor: irqSignaled ? '#f5822005' : (busMaster === 'CPU' ? '#004b9305' : '#ffffff'),
                      boxShadow: irqSignaled ? '0 0 40px rgba(245,130,32,0.2)' : (busMaster === 'CPU' ? '0 20px 40px rgba(0,75,147,0.1)' : 'none'),
                      scale: irqSignaled ? 1.05 : 1
                    }}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] border-2 flex flex-col items-center justify-center relative overflow-hidden group"
                  >
                    <span className="text-4xl mb-2">🧠</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CPU_MASTER</span>
                    
                    <AnimatePresence>
                      {status === 'INTERRUPTING' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-orange/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center cursor-pointer z-30"
                          onClick={handleISR}
                        >
                          <span className="text-[10px] font-black text-white uppercase tracking-widest mb-2">VECTOR_FETCH</span>
                          <span className="text-[8px] font-mono text-white/70 mb-4 tracking-tighter">0x4002 (FAULT_ADDR)</span>
                          <button className="bg-white text-orange text-[9px] font-black px-6 py-2.5 rounded-full shadow-2xl hover:scale-110 transition-transform">RUN_ISR</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-[9px] font-mono text-slate-300">ARCH_CONTROL</span>
                </div>

                {/* DMA CONTROLLER */}
                <div className="flex flex-col items-center gap-6 relative">
                  {/* Bus Data Lines */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10 w-[200%] -left-[50%]">
                    <div className="h-px w-full bg-slate-100 relative">
                       {status === 'TRANSFERRING' && (
                         <motion.div 
                           animate={{ x: ['0%', '100%'] }} 
                           transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                           className="absolute top-0 w-24 h-full bg-cyan shadow-[0_0_15px_#00adef]"
                         />
                       )}
                    </div>
                  </div>

                  {/* IRQ Signal SVG Layer */}
                  <svg className="absolute inset-0 w-[200%] h-40 -left-1/2 -top-10 pointer-events-none overflow-visible">
                    <AnimatePresence>
                      {irqSignaled && (
                        <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          d="M 180 60 Q 90 20 0 60"
                          fill="none"
                          stroke="#f58220"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        >
                           <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1s" repeatCount="indefinite" />
                        </motion.path>
                      )}
                    </AnimatePresence>
                  </svg>

                  <motion.div 
                    animate={{ 
                      scale: status === 'TRANSFERRING' ? 1.1 : 1,
                      borderColor: status === 'TRANSFERRING' ? '#00adef' : (irqSignaled ? '#f58220' : '#f1f5f9')
                    }}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-[50px] bg-white border-2 shadow-industrial flex flex-col items-center justify-center p-6 text-center relative z-10"
                  >
                    <div className="absolute -top-3 px-4 py-1 bg-slate-900 rounded-full text-[8px] font-black text-white uppercase tracking-widest">u1_CONTROLLER</div>
                    
                    <div className="space-y-1 mb-4">
                       <span className="text-[8px] font-mono text-slate-400 uppercase">TC_REGISTER</span>
                       <div className="text-3xl font-display font-black text-brand tabular-nums">{currentCount.toString().padStart(2, '0')}</div>
                    </div>

                    <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                       <motion.div 
                         initial={{ width: 0 }} animate={{ width: `${progress}%` }} 
                         className="h-full bg-cyan shadow-[0_0_10px_#00adef]" 
                       />
                    </div>
                  </motion.div>
                  <span className="text-[9px] font-mono text-slate-300">DMA_LOGIC_CORE</span>
                </div>

                {/* IO PERIPHERAL */}
                <div className="flex flex-col items-center gap-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] border-2 border-slate-100 bg-white flex flex-col items-center justify-center opacity-60">
                    <span className="text-4xl mb-2">📡</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">IO_PERIPHERAL</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-300">DATA_NODE</span>
                </div>

              </div>
            </div>

            {/* Control Matrix */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="glass-card rounded-[40px] p-8 border-slate-100 bg-slate-50/50">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Hardware Config</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-slate-400">Block Count</label>
                        <select 
                          value={config.count} 
                          disabled={manualMode}
                          onChange={(e) => setConfig({...config, count: parseInt(e.target.value)})}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-brand"
                        >
                           <option value={16}>16 Blocks</option>
                           <option value={32}>32 Blocks</option>
                           <option value={64}>64 Blocks</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-slate-400">Access Mode</label>
                        <select 
                          value={config.mode} 
                          disabled={manualMode}
                          onChange={(e) => setConfig({...config, mode: e.target.value as any})}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-brand"
                        >
                           <option value="Burst">High Priority</option>
                           <option value="CycleSteal">Transparent</option>
                        </select>
                     </div>
                  </div>
               </div>

               <div className="glass-card rounded-[40px] p-8 border-slate-100 bg-slate-50/50">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Interrupt Controller</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-slate-400">Level Mask</label>
                        <button 
                          onClick={() => setConfig({...config, interruptEnabled: !config.interruptEnabled})}
                          disabled={manualMode}
                          className={`w-full py-3 rounded-xl text-[9px] font-black uppercase transition-all ${config.interruptEnabled ? 'bg-orange text-white shadow-vibrant' : 'bg-slate-200 text-slate-400'}`}
                        >
                          {config.interruptEnabled ? 'UNMASKED' : 'MASKED'}
                        </button>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-slate-400">Trigger Source</label>
                        <select 
                          value={config.interruptTrigger} 
                          onChange={(e) => setConfig({...config, interruptTrigger: e.target.value as any})}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none"
                          disabled={!config.interruptEnabled || manualMode}
                        >
                           <option value="TC">Term. Count</option>
                           <option value="Half">Half Xfer</option>
                           <option value="Error">Sys Error</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>

            {/* Architectural Overrides */}
            <div className="glass-card rounded-[40px] p-10 border-cyan/20 bg-cyan/[0.02] shadow-vibrant relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <button 
                    onClick={() => setManualMode(!manualMode)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${manualMode ? 'bg-cyan text-white border-cyan' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    <span className="text-[8px] font-black uppercase tracking-widest">{manualMode ? 'LOCK_SEQUENCER' : 'MANUAL_OVERRIDE'}</span>
                    <div className={`w-2 h-2 rounded-full ${manualMode ? 'bg-white animate-pulse' : 'bg-slate-200'}`} />
                  </button>
                </div>

                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand mb-10 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-brand rounded-full"></span> Subsystem Telemetry Controls
                </h4>

                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bus Mastership</div>
                      <div className="flex gap-4">
                         <button onClick={() => forceBusMaster('CPU')} disabled={!manualMode} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${busMaster === 'CPU' ? 'bg-brand text-white border-brand shadow-lg' : 'bg-white text-slate-400 border-slate-100'} disabled:opacity-30`}>CPU_OWNER</button>
                         <button onClick={() => forceBusMaster('DMAC')} disabled={!manualMode} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${busMaster === 'DMAC' ? 'bg-cyan text-white border-cyan shadow-lg' : 'bg-white text-slate-400 border-slate-100'} disabled:opacity-30`}>DMA_OWNER</button>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Interrupt State</div>
                      <div className="flex gap-4">
                         <button onClick={() => forceStatus('INTERRUPTING')} disabled={!manualMode} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${status === 'INTERRUPTING' ? 'bg-orange text-white border-orange shadow-lg' : 'bg-white text-slate-400 border-slate-100'} disabled:opacity-30`}>FORCE_IRQ</button>
                         <button onClick={() => forceStatus('IDLE')} disabled={!manualMode} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${status === 'IDLE' ? 'bg-brand text-white border-brand shadow-lg' : 'bg-white text-slate-400 border-slate-100'} disabled:opacity-30`}>NORMAL_OP</button>
                      </div>
                   </div>
                </div>
            </div>
          </div>

          {/* Telemetry Log */}
          <div className="flex flex-col gap-8">
            <div className="glass-card rounded-[50px] p-10 flex-grow border-slate-100 shadow-sm overflow-hidden flex flex-col">
               <div className="flex justify-between items-center mb-10">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Subsystem Diagnostics</h3>
                 <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[8px] font-black rounded-full border border-green-500/20 tracking-widest">SYS_HEALTH: 100%</span>
               </div>

               <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                  <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={log.timestamp + i}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className={`p-5 rounded-3xl border flex items-start gap-5 ${
                          log.type === 'IRQ' ? 'bg-orange/5 border-orange/20 shadow-[0_0_15px_rgba(245,130,32,0.1)]' : 
                          log.type === 'BUS' ? 'bg-cyan/5 border-cyan/20' : 'bg-slate-50 border-slate-100'
                        }`}
                      >
                         <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                           log.type === 'IRQ' ? 'bg-orange animate-pulse shadow-[0_0_8px_#f58220]' : 
                           log.type === 'BUS' ? 'bg-cyan' : 'bg-brand'
                         }`} />
                         <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1.5">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{log.type}_EVENT</span>
                               <span className="text-[8px] font-mono text-slate-300">{log.timestamp}</span>
                            </div>
                            <p className="text-[12px] font-mono font-bold text-slate-800 leading-tight tracking-tight">{log.text}</p>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-200">
                       <span className="text-5xl mb-6">🛰️</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Subsystem_Monitoring_Idle</span>
                    </div>
                  )}
               </div>
               
               <div className="mt-10 pt-10 border-t border-slate-100">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                     <span className="text-slate-400">Throughput_Efficiency</span>
                     <span className="text-brand">CH_ACTIVE: {progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div animate={{ width: `${progress}%` }} className="h-full bg-brand shadow-[0_0_10px_rgba(0,75,147,0.3)]" />
                  </div>
               </div>
            </div>

            <div className="glass-card rounded-[40px] p-8 bg-brand/5 border-brand/10">
               <div className="text-[10px] font-black text-brand uppercase tracking-widest mb-4">Protocol Compliance</div>
               <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                 All uFirst DMA controllers are designed to comply with <span className="text-brand font-bold">Priority-Interrupt Architectures</span>. By allowing automated Bus Hold/Release cycles, we maximize CPU compute density during high-volume IO sync.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
