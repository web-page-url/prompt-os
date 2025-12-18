import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, BrainCircuit, ChevronRight, Zap, Eraser, AlertTriangle } from 'lucide-react';
import { FRAMEWORKS, MOCK_LOADING_STEPS } from './constants';
import { Framework } from './types';
import FrameworkCard from './components/FrameworkCard';
import { optimizePrompt } from './services/geminiService';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [rawPrompt, setRawPrompt] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for auto-scrolling
  const frameworkSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % MOCK_LOADING_STEPS.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!rawPrompt.trim() || !selectedFramework) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    // Scroll to bottom (where loader/result will be)
    setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const optimizedText = await optimizePrompt(rawPrompt, selectedFramework);
      setResult(optimizedText);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToFrameworks = () => {
    if (rawPrompt.trim().length > 0) {
      frameworkSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const resetApp = () => {
    setResult(null);
    setError(null);
    setSelectedFramework(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-950/80 to-slate-950"></div>
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-24">
        
        {/* Header Section */}
        <header className="text-center space-y-6 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-xs text-cyan-400 font-mono tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            PROMPT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 neon-glow">ALPHA</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Don't settle for basic outputs. Engineering superior intelligence requires superior inputs. 
            Choose a military-grade framework to structure your raw intent.
          </p>
        </header>

        {/* INPUT SECTION */}
        <section className="w-full max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-orbitron text-slate-200 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-cyan-400 text-sm">01</span>
                    RAW INPUT
                </h2>
                {rawPrompt && (
                   <button onClick={() => setRawPrompt('')} className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors">
                      <Eraser size={12} /> CLEAR
                   </button>
                )}
            </div>
            
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <textarea 
                        value={rawPrompt}
                        onChange={(e) => setRawPrompt(e.target.value)}
                        placeholder="e.g., I need a facebook ad for a new line of running shoes that focuses on eco-friendly materials..."
                        className="w-full h-40 bg-slate-950 border border-slate-800 text-slate-100 p-6 rounded-xl text-lg focus:outline-none focus:ring-0 placeholder:text-slate-600 resize-none font-sans leading-relaxed shadow-xl"
                        spellCheck={false}
                    />
                    <div className="absolute bottom-4 right-4 pointer-events-none">
                       {rawPrompt.length > 0 && (
                          <span className="text-xs font-mono text-cyan-500 animate-pulse">DATA RECEIVED</span>
                       )}
                    </div>
                </div>
            </div>
            
            {/* Action to Next Step */}
            {rawPrompt.length > 10 && !selectedFramework && (
                <div className="flex justify-center pt-4">
                    <button 
                        onClick={scrollToFrameworks}
                        className="animate-bounce flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        SELECT FRAMEWORK <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </section>

        {/* FRAMEWORKS SECTION */}
        <section ref={frameworkSectionRef} className={`transition-all duration-700 ${rawPrompt.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10 blur-sm pointer-events-none'}`}>
             <div className="w-full max-w-6xl mx-auto space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold font-orbitron text-slate-200 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-purple-400 text-sm">02</span>
                        SELECT ARCHITECTURE
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FRAMEWORKS.map((fw) => (
                        <FrameworkCard 
                            key={fw.id}
                            framework={fw}
                            isSelected={selectedFramework?.id === fw.id}
                            onSelect={setSelectedFramework}
                        />
                    ))}
                </div>
             </div>
        </section>

        {/* GENERATE ACTION */}
        <div className={`fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${selectedFramework && rawPrompt ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
             <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                    pointer-events-auto group relative
                    bg-white text-black font-black font-orbitron tracking-wider text-lg
                    py-4 px-12 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)]
                    hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    overflow-hidden flex items-center gap-3
                `}
             >
                {isGenerating ? (
                    <>
                        <BrainCircuit className="animate-spin" /> PROCESSING
                    </>
                ) : (
                    <>
                        INITIALIZE <Zap className="fill-black group-hover:text-yellow-500 transition-colors" />
                    </>
                )}
                
                {/* Shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
             </button>
        </div>

        {/* RESULT SECTION */}
        <section ref={resultSectionRef} className="pb-32 min-h-[50vh]">
            {isGenerating && (
                 <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-spin-reverse"></div>
                        <div className="absolute inset-4 border-b-4 border-white rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse">
                        {MOCK_LOADING_STEPS[loadingStep]}
                    </p>
                 </div>
            )}

            {error && (
                <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-500/50 rounded-xl p-6 text-center space-y-4 animate-fade-in-up">
                    <AlertTriangle className="mx-auto text-red-500 w-12 h-12" />
                    <h3 className="text-xl font-bold text-red-400">System Malfunction</h3>
                    <p className="text-slate-300">{error}</p>
                    <button onClick={handleGenerate} className="px-6 py-2 bg-red-900/50 hover:bg-red-900 text-red-200 rounded border border-red-800 transition-colors">
                        Retry Sequence
                    </button>
                </div>
            )}

            {result && !isGenerating && (
                <div className="space-y-8 animate-fade-in-up">
                     <div className="flex justify-center">
                         <div className="bg-gradient-to-b from-cyan-500/10 to-transparent p-px rounded-full mb-8">
                             <div className="bg-slate-950 rounded-full px-6 py-2 text-sm text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                 OPTIMIZATION COMPLETE • {selectedFramework?.name} PROTOCOL
                             </div>
                         </div>
                     </div>
                     <ResultDisplay content={result} onReset={resetApp} />
                </div>
            )}
        </section>

      </div>
    </div>
  );
};

export default App;