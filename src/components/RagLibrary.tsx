import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { PRELOADED_RAG_DOCUMENTS } from '../data/mockAcademicData';

interface RagLibraryProps {
  onGroundingQuerySelect: (query: string, subject: string) => void;
}

export const RagLibrary: React.FC<RagLibraryProps> = ({ onGroundingQuerySelect }) => {
  const [documents, setDocuments] = useState(PRELOADED_RAG_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(PRELOADED_RAG_DOCUMENTS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        department: 'CSE',
        category: 'Student Upload',
        pages: 28,
        uploadDate: new Date().toISOString().split('T')[0],
        content: `Parsed Document Chunks for ${file.name}:\nPage 1: Overview and Course Objectives.\nPage 7: Theoretical foundation and formal proofs.\nPage 14: Core algorithm diagrams, time complexity, and practical state transitions.\nPage 22: Summary of university semester question bank patterns.`
      };

      setDocuments(prev => [newDoc, ...prev]);
      setSelectedDocId(newDoc.id);
      setIsUploading(false);
      setUploadSuccess(`Successfully parsed and indexed "${file.name}" into 56 vector chunks!`);
      setTimeout(() => setUploadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Document Parser • Semantic Chunking • Vector RAG</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            College Notes → RAG Knowledge Base
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            EduMind grounds all answers directly inside your university notes, syllabi, and question banks with verified page citations.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition-all shadow-xs cursor-pointer shrink-0 active:scale-95">
          <UploadCloud className="w-4 h-4" />
          <span>Upload PDF / PPT / Notes</span>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.txt"
            onChange={handleSimulatedUpload}
            className="hidden"
          />
        </label>
      </div>

      {uploadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* RAG Architecture Pipeline Diagram */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-xs shadow-md">
        <div className="font-bold text-white mb-2 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>RAG Ingestion Architecture</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-[11px]">
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">PDF / PPT Upload</div>
          <div className="hidden sm:flex items-center justify-center text-slate-500">→</div>
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">Document Parser</div>
          <div className="hidden sm:flex items-center justify-center text-slate-500">→</div>
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">Semantic Chunking</div>
          <div className="hidden sm:flex items-center justify-center text-slate-500">→</div>
          <div className="p-2 bg-indigo-900/60 text-indigo-200 rounded-lg border border-indigo-500/40 font-semibold">
            Vector Retrieval
          </div>
        </div>
      </div>

      {/* Main Content Layout: Document List on Left, Document Viewer & Chunk Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Available Course Documents</span>
            </h2>
            <span className="text-xs text-slate-400">{documents.length} files</span>
          </div>

          <div className="space-y-2">
            {documents.map(doc => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-xs ${
                  selectedDocId === doc.id
                    ? 'bg-indigo-50/70 border-indigo-400 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-slate-900 text-sm leading-snug">
                    {doc.title}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold shrink-0 ml-2">
                    {doc.department}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400 mt-2 text-[11px]">
                  <span>{doc.category}</span>
                  <span>•</span>
                  <span>{doc.pages} pages</span>
                  <span>•</span>
                  <span>Uploaded {doc.uploadDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Document Details & Vector Chunks */}
        <div className="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Indexed & Ready for Q&A
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedDoc.title}</h3>
              <p className="text-xs text-slate-500">
                Department: {selectedDoc.department} • Type: {selectedDoc.category} • Total Pages: {selectedDoc.pages}
              </p>
            </div>

            <button
              onClick={() => onGroundingQuerySelect(`Explain this topic according to ${selectedDoc.title}`, selectedDoc.title)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <span>Query in Tutor →</span>
            </button>
          </div>

          {/* Document Content / Chunk Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Extracted Chunks & Page Excerpts</span>
            </h4>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap max-h-[340px] overflow-y-auto">
              {selectedDoc.content}
            </div>
          </div>

          {/* Quick RAG Questions */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Sample College-Grounded Questions for this Document:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onGroundingQuerySelect('Explain Unit 4 according to our college lecture notes', selectedDoc.title)}
                className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 hover:text-indigo-600 text-left transition-colors font-medium"
              >
                “Explain Unit 4 according to our college notes” →
              </button>
              <button
                onClick={() => onGroundingQuerySelect('What are the high-frequency exam questions from this unit?', selectedDoc.title)}
                className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 hover:text-indigo-600 text-left transition-colors font-medium"
              >
                “High-frequency exam questions from this unit” →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
