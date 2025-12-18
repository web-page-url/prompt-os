import React from 'react';
import { Framework } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface FrameworkCardProps {
  framework: Framework;
  isSelected: boolean;
  onSelect: (framework: Framework) => void;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, isSelected, onSelect }) => {
  const getBorderColor = () => {
    if (isSelected) {
      switch (framework.color) {
        case 'cyan': return 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]';
        case 'amber': return 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]';
        case 'emerald': return 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]';
        case 'purple': return 'border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]';
        case 'rose': return 'border-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.5)]';
        default: return 'border-blue-500';
      }
    }
    return 'border-slate-800 hover:border-slate-600';
  };

  const getTextColor = () => {
    switch (framework.color) {
      case 'cyan': return 'text-cyan-400';
      case 'amber': return 'text-amber-400';
      case 'emerald': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'rose': return 'text-rose-400';
      default: return 'text-white';
    }
  };

  const getGradientText = () => {
     switch (framework.color) {
      case 'cyan': return 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500';
      case 'amber': return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500';
      case 'emerald': return 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500';
      case 'purple': return 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500';
      case 'rose': return 'bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-600';
      default: return 'text-white';
    }
  };

  return (
    <div 
      onClick={() => onSelect(framework)}
      className={`
        relative group cursor-pointer transition-all duration-300 transform 
        border bg-slate-900/50 backdrop-blur-md rounded-xl p-6
        ${getBorderColor()}
        ${isSelected ? 'scale-[1.02] bg-slate-800/80' : 'hover:scale-[1.02] hover:bg-slate-800/50'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-4xl font-black tracking-tighter brand-font mb-1 ${getGradientText()}`}>
            {framework.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
            {framework.fullName}
          </p>
        </div>
        <div className={`transition-colors duration-300 ${isSelected ? getTextColor() : 'text-slate-700'}`}>
          {isSelected ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 leading-relaxed">
        {framework.description}
      </p>

      {/* Components Visualization */}
      <div className="space-y-2">
        {framework.components.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`h-px flex-1 bg-gradient-to-r ${isSelected ? 'from-transparent via-slate-500 to-transparent opacity-50' : 'from-slate-800 via-slate-700 to-slate-800'}`}></div>
            <div className="flex flex-col items-center min-w-[80px]">
              <span className={`text-xs font-bold tech-font uppercase ${getTextColor()}`}>[{comp.label}]</span>
              <span className="text-[10px] text-slate-500">{comp.description}</span>
            </div>
            <div className={`h-px flex-1 bg-gradient-to-r ${isSelected ? 'from-transparent via-slate-500 to-transparent opacity-50' : 'from-slate-800 via-slate-700 to-slate-800'}`}></div>
          </div>
        ))}
      </div>

      {/* Futuristic Corners */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l rounded-tl-lg transition-colors duration-300 ${isSelected ? getTextColor().replace('text-', 'border-') : 'border-slate-800'}`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r rounded-tr-lg transition-colors duration-300 ${isSelected ? getTextColor().replace('text-', 'border-') : 'border-slate-800'}`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l rounded-bl-lg transition-colors duration-300 ${isSelected ? getTextColor().replace('text-', 'border-') : 'border-slate-800'}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r rounded-br-lg transition-colors duration-300 ${isSelected ? getTextColor().replace('text-', 'border-') : 'border-slate-800'}`}></div>
    </div>
  );
};

export default FrameworkCard;