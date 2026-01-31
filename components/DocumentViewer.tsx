import React from 'react';
import ReactMarkdown from 'react-markdown';
import { SpecificationDoc } from '../types';
import { Download, AlertTriangle } from 'lucide-react';

interface DocumentViewerProps {
  doc: SpecificationDoc;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc }) => {
  const downloadMd = () => {
    const blob = new Blob([doc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-elbaph-bg min-h-full flex flex-col">
      <div className="border-b border-elbaph-border p-6 bg-elbaph-panel flex justify-between items-center sticky top-0 z-10">
        <div>
            <h2 className="text-xl font-mono font-bold text-white uppercase">{doc.title}</h2>
            <div className="flex items-center space-x-4 mt-1 text-xs font-mono text-elbaph-muted">
                <span>LAYER: {doc.layer}</span>
                <span>ID: {doc.id.substring(0, 8)}</span>
                <span>{new Date(doc.timestamp).toLocaleString()}</span>
            </div>
        </div>
        <button 
            onClick={downloadMd}
            className="flex items-center space-x-2 px-4 py-2 bg-elbaph-border hover:bg-gray-700 transition-colors text-xs font-mono uppercase tracking-wider"
        >
            <Download size={14} />
            <span>Export</span>
        </button>
      </div>
      
      <div className="p-8 max-w-5xl mx-auto w-full">
        {doc.status === 'generating' ? (
             <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <div className="text-elbaph-accent font-mono text-lg mb-2">GENERATING SPECIFICATION...</div>
                <div className="text-elbaph-muted text-sm font-mono">Running constraints check...</div>
             </div>
        ) : doc.status === 'error' ? (
            <div className="border border-red-900 bg-red-900/10 p-6 flex items-start space-x-4">
                <AlertTriangle className="text-red-500 shrink-0" />
                <div>
                    <h3 className="text-red-500 font-mono font-bold">GENERATION FAILED</h3>
                    <p className="text-gray-400 mt-2 font-mono text-sm">{doc.content}</p>
                </div>
            </div>
        ) : (
            <div className="prose prose-invert prose-headings:font-mono prose-headings:uppercase prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-elbaph-border prose-h2:pb-2 prose-h2:mt-8 prose-h3:text-lg prose-h3:text-elbaph-accent prose-p:text-gray-300 prose-li:text-gray-300 prose-pre:bg-elbaph-panel prose-pre:border prose-pre:border-elbaph-border max-w-none">
                <ReactMarkdown>{doc.content}</ReactMarkdown>
            </div>
        )}
      </div>
    </div>
  );
};
