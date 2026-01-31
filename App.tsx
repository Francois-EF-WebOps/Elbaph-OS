import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocumentViewer } from './components/DocumentViewer';
import { LAYERS } from './constants';
import { LayerType, SpecificationDoc } from './types';
import { generateSpecification } from './services/gemini';
import { ChevronRight, FilePlus, Cpu, Pickaxe, Zap, Wheat, BookOpen, Users, Play } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  Wrench: <Cpu size={24} />,
  Mountain: <Pickaxe size={24} />,
  Zap: <Zap size={24} />,
  Wheat: <Wheat size={24} />,
  BookOpen: <BookOpen size={24} />,
  Users: <Users size={24} />,
};

function App() {
  const [view, setView] = useState<'dashboard' | 'library'>('dashboard');
  const [activeLayer, setActiveLayer] = useState<LayerType | null>(null);
  const [documents, setDocuments] = useState<SpecificationDoc[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const handleGenerate = async (filename: string, layer: LayerType) => {
    const newDoc: SpecificationDoc = {
      id: crypto.randomUUID(),
      title: filename,
      layer,
      content: '',
      timestamp: Date.now(),
      status: 'generating',
      command: `Generate ${filename}`
    };

    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    setActiveLayer(null); // Close modal/selector
    setView('dashboard'); // Ensure we are on the view where the doc renders

    try {
      const content = await generateSpecification(filename);
      setDocuments(prev => prev.map(d => 
        d.id === newDoc.id ? { ...d, content, status: 'complete' } : d
      ));
    } catch (error: any) {
      setDocuments(prev => prev.map(d => 
        d.id === newDoc.id ? { ...d, content: error.message, status: 'error' } : d
      ));
    }
  };

  const activeDoc = documents.find(d => d.id === activeDocId);

  return (
    <div className="flex min-h-screen bg-elbaph-bg text-elbaph-text font-sans selection:bg-elbaph-accent selection:text-black">
      <Sidebar currentView={view} setView={(v) => { setView(v); setActiveDocId(null); }} />

      <main className="ml-64 flex-1 relative">
        {/* Render Logic */}
        {view === 'library' ? (
          <div className="p-10">
            <h2 className="text-2xl font-mono font-bold mb-6 text-white uppercase tracking-wider">Specification Library</h2>
            <div className="grid gap-4">
              {documents.length === 0 && (
                <div className="p-8 border border-dashed border-elbaph-border text-center text-elbaph-muted font-mono">
                  NO SPECIFICATIONS GENERATED. INITIATE PROTOCOLS.
                </div>
              )}
              {documents.map(doc => (
                <div 
                    key={doc.id} 
                    onClick={() => { setActiveDocId(doc.id); setView('dashboard'); }}
                    className="p-4 bg-elbaph-panel border border-elbaph-border hover:border-elbaph-accent cursor-pointer group transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${doc.status === 'complete' ? 'bg-elbaph-success' : doc.status === 'error' ? 'bg-red-500' : 'bg-elbaph-accent animate-pulse'}`}></div>
                        <span className="font-mono font-bold text-lg group-hover:text-white">{doc.title}</span>
                    </div>
                    <span className="text-xs font-mono text-elbaph-muted">{new Date(doc.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-elbaph-muted uppercase tracking-wider">
                    {doc.layer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeDocId && activeDoc ? (
            <DocumentViewer doc={activeDoc} />
        ) : (
          <div className="p-10">
            <div className="mb-12">
              <h2 className="text-3xl font-mono font-bold text-white mb-2">SYSTEM ARCHITECTURE</h2>
              <p className="text-elbaph-muted max-w-2xl">
                Select a critical infrastructure layer to generate engineering specifications compliant with ELBAPH Tool-Sovereignty constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {LAYERS.map((layer) => (
                <div 
                  key={layer.id} 
                  className={`bg-elbaph-panel border border-elbaph-border hover:border-elbaph-accent transition-all duration-300 flex flex-col ${activeLayer === layer.id ? 'ring-2 ring-elbaph-accent' : ''}`}
                >
                  <div className="p-6 border-b border-elbaph-border flex items-start justify-between">
                    <div className="text-elbaph-text">
                        {ICONS[layer.icon]}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-elbaph-muted bg-black/20 px-2 py-1 rounded">
                        LAYER {LAYERS.indexOf(layer) + 1}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold font-mono text-white mb-2">{layer.label}</h3>
                    <p className="text-sm text-elbaph-muted mb-6 leading-relaxed">
                        {layer.description}
                    </p>

                    <div className="space-y-2">
                        <div className="text-xs font-mono text-elbaph-accent mb-2 uppercase tracking-wide">Standard Protocols</div>
                        {layer.defaultFiles.map(file => (
                            <button
                                key={file}
                                onClick={() => handleGenerate(file, layer.id)}
                                className="w-full text-left px-3 py-2 bg-black/40 hover:bg-elbaph-accent hover:text-black border border-elbaph-border hover:border-transparent text-xs font-mono transition-colors flex items-center justify-between group"
                            >
                                <span>{file}</span>
                                <Play size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 border border-elbaph-border bg-black/20">
                <h4 className="font-mono font-bold text-sm text-elbaph-muted mb-4 uppercase">Custom Specification Request</h4>
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="ENTER_FILENAME_OR_SYSTEM_NAME" 
                        className="flex-1 bg-elbaph-bg border border-elbaph-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-elbaph-accent text-white placeholder-gray-700"
                        id="custom-input"
                    />
                    <button 
                        onClick={() => {
                            const input = document.getElementById('custom-input') as HTMLInputElement;
                            if(input.value) handleGenerate(input.value + ".md", LayerType.TOOL_SOVEREIGNTY);
                        }}
                        className="px-6 py-3 bg-elbaph-text text-black font-mono font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <FilePlus size={16} />
                        <span>GENERATE</span>
                    </button>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
