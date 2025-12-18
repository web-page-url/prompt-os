import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface ResultDisplayProps {
  content: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="relative bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="bg-slate-950/50 border-b border-slate-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-slate-400 tracking-wider">OUTPUT_STREAM_READY</span>
          </div>
          <div className="flex gap-2">
             <button 
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-transparent hover:border-slate-600"
            >
              <RefreshCw size={14} />
              NEW PROMPT
            </button>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                  : 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh] prose prose-invert prose-headings:font-orbitron prose-p:text-slate-300 prose-pre:bg-black/50 prose-pre:border prose-pre:border-slate-800 prose-code:text-cyan-300">
           <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        
        {/* Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default ResultDisplay;