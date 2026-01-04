import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface Stage {
  id: string;
  name: string;
  color: string;
  desc: string;
}

interface Instruction {
  text: string;
  dest?: string;
  src?: string[];
  id: string;
  op: 'LOAD' | 'ADD' | 'SUB' | 'STORE' | 'NOP';
  val?: number;
}

interface Hazard {
  type: 'RAW' | 'WAR' | 'WAW';
  reg: string;
  fromStage: string;
  targetStage: string;
  resolution: 'Forwarded' | 'Stalled';
}

const INITIAL_STAGES: Stage[] = [
  { id: 'IF', name: 'FETCH', color: '#00adef', desc: 'Instruction Fetch' },
  { id: 'ID', name: 'DECODE', color: '#00adef', desc: 'Logic Decode' },
  { id: 'EX', name: 'EXEC', color: '#f58220', desc: 'Kinetic Flow' },
  { id: 'MEM', name: 'MEM', color: '#004b93', desc: 'Core Registry' },
  { id: 'WB', name: 'WRITE', color: '#f58220', desc: 'Global Log' },
];

const MOCK_INSTRUCTIONS: Instruction[] = [
  { id: 'i1', text: "LOAD R1, 0x0F", op: 'LOAD', dest: 'R1', src: [], val: 15 },
  { id: 'i2', text: "ADD R2, R1, 5", op: 'ADD', dest: 'R2', src: ['R1'], val: 5 },
  { id: 'i3', text: "SUB R3, R2, R1", op: 'SUB', dest: 'R3', src: ['R2', 'R1'] },
  { id: 'i4', text: "STORE R3, [0x100]", op: 'STORE', dest: undefined, src: ['R3'] },
  { id: 'i5', text: "LOAD R1, 0xAB", op: 'LOAD', dest: 'R1', src: [], val: 171 },
  { id: 'i6', text: "ADD R1, R1, R1", op: 'ADD', dest: 'R1', src: ['R1', 'R1'] },
];

export const PipelineVisualizer: React.FC = () => {
  const [pipeline, setPipeline] = useState<(Instruction | null)[]>(new Array(INITIAL_STAGES.length).fill(null));
  const [instructionIndex, setInstructionIndex] = useState(0);
  const [pc, setPc] = useState(0x400000);
  const [registers, setRegisters] = useState<number[]>(new Array(32).fill(0));
  const [lastModifiedReg, setLastModifiedReg] = useState<number | null>(null);
  const [activeHazards, setActiveHazards] = useState<Hazard[]>([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [forwardingEnabled, setForwardingEnabled] = useState(true);
  const [history, setHistory] = useState<{ cycle: number; action: string; type?: string }[]>([]);

  const getRegIdx = (name?: string) => {
    if (!name || !name.startsWith('R')) return -1;
    const idx = parseInt(name.substring(1));
    return isNaN(idx) ? -1 : idx;
  };

  const stepPipeline = () => {
    const idInst = pipeline[1]; // Instruction currently in Decode
    const hazards: Hazard[] = [];
    let shouldStall = false;

    if (idInst) {
      // Check for hazards against all instructions currently in EX, MEM, WB
      for (let i = 2; i < pipeline.length; i++) {
        const olderInst = pipeline[i];
        if (!olderInst) continue;

        // 1. RAW Detection (True Dependency)
        if (idInst.src?.some(s => s === olderInst.dest)) {
          const resolution = (forwardingEnabled && !(olderInst.op === 'LOAD' && i === 2)) ? 'Forwarded' : 'Stalled';
          if (resolution === 'Stalled') shouldStall = true;
          hazards.push({
            type: 'RAW',
            reg: olderInst.dest!,
            fromStage: INITIAL_STAGES[i].id,
            targetStage: 'ID',
            resolution
          });
        }

        // 2. WAR Detection (Anti-Dependency)
        // Happens if a younger instruction (ID) writes to a register that an older instruction is still reading
        if (idInst.dest && olderInst.src?.includes(idInst.dest)) {
          hazards.push({
            type: 'WAR',
            reg: idInst.dest,
            fromStage: INITIAL_STAGES[i].id,
            targetStage: 'ID',
            resolution: 'Forwarded' // Usually handled by in-order reads or renaming
          });
        }

        // 3. WAW Detection (Output Dependency)
        // Happens if two instructions write to the same destination
        if (idInst.dest && olderInst.dest === idInst.dest) {
          hazards.push({
            type: 'WAW',
            reg: idInst.dest,
            fromStage: INITIAL_STAGES[i].id,
            targetStage: 'ID',
            resolution: 'Forwarded' // Handled by in-order commit in this pipe
          });
        }
      }
    }

    if (shouldStall) {
      setActiveHazards(hazards);
      const newPipeline = [...pipeline];
      // Stall IF and ID stages
      for (let i = newPipeline.length - 1; i > 2; i--) newPipeline[i] = newPipeline[i - 1];
      newPipeline[2] = null; // Inject bubble into EX
      setPipeline(newPipeline);
      setHistory(prev => [{ cycle: Math.floor(pc / 4), action: 'STALL_REQ: RAW Hazard Detected', type: 'error' }, ...prev].slice(0, 8));
      return;
    }

    // Normal Step
    setActiveHazards(hazards);
    setLastModifiedReg(null);
    const newPipeline = [...pipeline];
    const wbInst = newPipeline[INITIAL_STAGES.length - 1];

    // Commit WB to architectural state
    if (wbInst && wbInst.dest) {
      const idx = getRegIdx(wbInst.dest);
      if (idx !== -1) {
        setRegisters(prev => {
          const next = [...prev];
          next[idx] = wbInst.val || Math.floor(Math.random() * 255);
          return next;
        });
        setLastModifiedReg(idx);
      }
    }

    // Shift Pipeline
    for (let i = newPipeline.length - 1; i > 0; i--) newPipeline[i] = newPipeline[i - 1];
    newPipeline[0] = MOCK_INSTRUCTIONS[instructionIndex];
    setInstructionIndex(prev => (prev + 1) % MOCK_INSTRUCTIONS.length);
    setPc(prev => prev + 4);
    setPipeline(newPipeline);
    
    if (hazards.length > 0) {
      setHistory(prev => [{ cycle: Math.floor(pc / 4), action: `SYNC_OK: Resolved ${hazards.length} hazards`, type: 'warn' }, ...prev].slice(0, 8));
    } else {
      setHistory(prev => [{ cycle: Math.floor(pc / 4), action: 'CLK: Pipeline Shifted', type: 'info' }, ...prev].slice(0, 8));
    }
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(stepPipeline, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlay, pipeline]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20">
      <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8 md:gap-12">
        
        <div className="flex flex-col gap-8">
          <div className="glass-card rounded-[60px] p-8 md:p-14 border-slate-100 dark:border-white/5 shadow-industrial relative overflow-hidden">
            {/* Background Hazard Glow */}
            <AnimatePresence>
              {activeHazards.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.05 }} 
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 bg-orange-500 pointer-events-none" 
                />
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-1 bg-cyan rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan">Sovereign Architecture Laboratory</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black italic tracking-tighter text-brand dark:text-white leading-none">
                  Pipeline <span className="text-cyan">Sequencer.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setForwardingEnabled(!forwardingEnabled)}
                  className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${forwardingEnabled ? 'bg-cyan/10 text-cyan border-cyan/40 shadow-vibrant' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                >
                  Forwarding: {forwardingEnabled ? 'ON' : 'OFF'}
                </button>
                <button onClick={() => setIsAutoPlay(!isAutoPlay)} className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${isAutoPlay ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {isAutoPlay ? 'STOP' : 'AUTO_SEQ'}
                </button>
                <button onClick={stepPipeline} className="px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-brand text-brand hover:bg-brand hover:text-white transition-all">
                  MANUAL_STEP
                </button>
              </div>
            </div>

            {/* Scrolling Pipeline Visualization */}
            <div className="w-full overflow-x-auto no-scrollbar pb-10">
              <div className="flex items-center gap-6 md:gap-10 min-w-[800px] justify-between px-2">
                {INITIAL_STAGES.map((stage, idx) => {
                  const currentInst = pipeline[idx];
                  const hasHazard = activeHazards.some(h => h.fromStage === stage.id || (h.targetStage === stage.id && idx === 1));
                  const hazardType = activeHazards.find(h => h.fromStage === stage.id)?.type;

                  return (
                    <div key={`${stage.id}-${idx}`} className="flex flex-col items-center shrink-0 w-32 md:w-48 group">
                      <motion.div 
                        animate={{ 
                          scale: currentInst ? 1.05 : 1, 
                          borderColor: hasHazard ? (hazardType === 'RAW' ? '#00adef' : (hazardType === 'WAR' ? '#f58220' : '#d946ef')) : (currentInst ? stage.color : 'rgba(203, 213, 225, 0.2)'),
                          backgroundColor: currentInst ? `${stage.color}05` : 'transparent',
                          boxShadow: hasHazard ? `0 0 30px ${hazardType === 'RAW' ? '#00adef33' : '#f5822033'}` : 'none'
                        }} 
                        className="w-28 h-28 md:w-40 md:h-40 rounded-[35px] md:rounded-[50px] border-2 flex flex-col items-center justify-center relative transition-all"
                      >
                        <span className="absolute top-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">{stage.id}</span>
                        
                        <AnimatePresence mode="wait">
                          {currentInst ? (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-4">
                              <div className="text-[10px] md:text-[12px] font-mono font-black text-slate-900 dark:text-white leading-tight">{currentInst.text}</div>
                              <div className="mt-2 text-[8px] font-mono text-cyan/60">{currentInst.id.toUpperCase()}</div>
                            </motion.div>
                          ) : (
                            <div className="text-[8px] font-mono text-slate-200 dark:text-slate-800 uppercase tracking-widest">BUBBLE</div>
                          )}
                        </AnimatePresence>

                        {hasHazard && (
                          <motion.div 
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-slate-900 border border-white/20 flex items-center justify-center text-[10px] font-black text-white shadow-xl z-20"
                          >
                            {hazardType}
                          </motion.div>
                        )}
                      </motion.div>
                      <span className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-cyan transition-colors">{stage.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hazard Resolution Panel */}
            <div className="mt-8 p-8 rounded-[40px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                 <div className="w-1.5 h-4 bg-cyan rounded-full" />
                 Hazard Resolution Matrix
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                 {['RAW', 'WAR', 'WAW'].map(type => {
                   const isActive = activeHazards.some(h => h.type === type);
                   const hazard = activeHazards.find(h => h.type === type);
                   return (
                     <div key={type} className={`p-6 rounded-3xl border transition-all ${isActive ? 'bg-white dark:bg-slate-800 border-cyan/40 shadow-lg' : 'opacity-40 border-slate-100 dark:border-white/5'}`}>
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[12px] font-black text-slate-900 dark:text-white">{type}</span>
                           <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan animate-pulse' : 'bg-slate-300'}`} />
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                           {isActive ? (
                             <>STATE: <span className="text-cyan">{hazard?.resolution}</span> via L3_BUS</>
                           ) : 'STATE: NOMINAL'}
                        </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[45px] p-10 border-slate-100 dark:border-white/5 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Architectural Core Registers (32-bit)</h3>
               <span className="text-[9px] font-mono text-cyan">0x00 - 0x1F</span>
             </div>
             <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
               {registers.map((val, i) => (
                 <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center transition-all ${lastModifiedReg === i ? 'border-cyan bg-cyan/10 shadow-vibrant scale-110 z-20' : 'border-slate-50 dark:border-white/5'}`}>
                   <span className="text-[8px] font-mono text-slate-400 mb-1">R{i}</span>
                   <span className="text-sm font-mono font-black text-slate-900 dark:text-white">{val.toString(16).toUpperCase().padStart(2, '0')}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="glass-card rounded-[50px] p-10 border-slate-100 dark:border-white/5 flex-grow overflow-hidden flex flex-col">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-10">Real-Time Log Stream</h3>
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-grow">
              {history.map((h, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`p-5 rounded-2xl border flex items-center justify-between font-mono text-[10px] ${
                    h.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 
                    h.type === 'warn' ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-white/5 text-slate-500'
                  }`}
                >
                  <span className="opacity-50">CLK_{h.cycle.toString().padStart(3, '0')}</span>
                  <span className="font-bold uppercase">{h.action}</span>
                </motion.div>
              ))}
              {history.length === 0 && <p className="text-[11px] font-mono text-slate-300 text-center py-20 italic">Initialize Sequencer...</p>}
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-white/10">
               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                     <span className="text-slate-400">Node_PC</span>
                     <span className="text-brand dark:text-white">0x{pc.toString(16).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                     <span className="text-slate-400">Active_Hazards</span>
                     <span className={`${activeHazards.length > 0 ? 'text-cyan animate-pulse' : 'text-slate-400'}`}>{activeHazards.length} DETECTED</span>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="p-10 rounded-[50px] bg-brand/5 border border-brand/10 dark:bg-cyan/5 dark:border-cyan/10">
             <div className="text-[11px] font-black text-brand dark:text-cyan uppercase tracking-[0.2em] mb-4">Sovereign Logic Note</div>
             <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
               The uFirst Sequencer implements <span className="text-cyan font-bold">Anti-Dependency Logic</span> to mitigate WAR/WAW bottlenecks. In production clusters, these are resolved using hardware-level register renaming nodes.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};
