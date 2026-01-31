import React from 'react';
import { LayoutGrid, FileText, Database, ShieldAlert, Cpu } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'library';
  setView: (view: 'dashboard' | 'library') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-64 h-screen bg-elbaph-panel border-r border-elbaph-border flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-elbaph-border">
        <h1 className="text-xl font-bold font-mono tracking-tighter text-elbaph-text">
          <span className="text-elbaph-accent">ELBAPH</span><br/>ARCHITECT
        </h1>
        <p className="text-xs text-elbaph-muted mt-2 font-mono">
          SYSTEM_VER: 2.5.0<br/>
          STATUS: SOVEREIGN
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setView('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-none border-l-2 transition-all font-mono text-sm ${
            currentView === 'dashboard'
              ? 'bg-elbaph-bg border-elbaph-accent text-white'
              : 'border-transparent text-elbaph-muted hover:text-white hover:bg-elbaph-bg'
          }`}
        >
          <LayoutGrid size={18} />
          <span>LAYER_GRID</span>
        </button>

        <button
          onClick={() => setView('library')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-none border-l-2 transition-all font-mono text-sm ${
            currentView === 'library'
              ? 'bg-elbaph-bg border-elbaph-accent text-white'
              : 'border-transparent text-elbaph-muted hover:text-white hover:bg-elbaph-bg'
          }`}
        >
          <Database size={18} />
          <span>SPEC_LIBRARY</span>
        </button>
      </nav>

      <div className="p-6 border-t border-elbaph-border">
        <div className="flex items-start space-x-3 text-xs text-elbaph-muted">
          <ShieldAlert className="text-elbaph-accent shrink-0" size={16} />
          <p>
            WARNING: Ensure 100% local reproducibility before implementation.
          </p>
        </div>
      </div>
    </div>
  );
};
