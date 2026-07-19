import React, { useState, useCallback } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { uploadContextFileApi } from '../services/aiContext.service';
import Button from '../../../shared/components/ui/Button';
import { useSelector } from 'react-redux';
import { Upload, FileText, CheckCircle2, AlertCircle, Bot } from 'lucide-react';
import toast from 'react-hot-toast';

const AiContextPage = () => {
  const { currentTenant } = useSelector((state) => state.tenant);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(currentTenant?.aiContext || []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      toast.error('Only PDF files are supported');
    }
  }, []);

  const handleFileInput = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadContextFileApi(file);
      setUploadedFiles(res.data.data?.aiContext || []);
      setFile(null);
      toast.success('Context uploaded & indexed successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white tracking-tight">AI Context</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Upload PDF documents to train your AI assistant with company-specific knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Bot size={18} className="text-zinc-400" />
            <h2 className="text-sm font-semibold">Upload Knowledge Base</h2>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={[
              'border-2 border-dashed rounded-[10px] p-8 text-center transition-all duration-200 cursor-pointer',
              dragging ? 'border-white/30 bg-white/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.01]',
            ].join(' ')}
            onClick={() => document.getElementById('ctx-file-input').click()}
          >
            <Upload size={24} className="mx-auto mb-3 text-zinc-500" />
            <p className="text-sm font-medium text-white mb-1">
              {file ? file.name : 'Drop a PDF here or click to browse'}
            </p>
            <p className="text-xs text-zinc-400">Supports: PDF files only. Max 10MB.</p>
            <input
              id="ctx-file-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-[#0a0a0c] rounded-[10px] border border-white/10">
              <FileText size={18} className="text-zinc-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                <p className="text-xs text-zinc-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <Button onClick={handleUpload} loading={uploading} size="sm" variant="primary">
                Upload
              </Button>
            </div>
          )}

          <div className="mt-5 p-4 bg-white/5 border border-white/5 rounded-[10px]">
            <p className="text-xs font-semibold text-white mb-1">How it works</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Uploaded PDFs are split into chunks, embedded via MistralAI, and indexed in Pinecone.
              The AI will use this knowledge to answer customer queries automatically.
            </p>
          </div>
        </div>

        {/* Indexed Files */}
        <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6">
          <h2 className="text-sm font-semibold text-white mb-4">
            Indexed Documents ({uploadedFiles.length})
          </h2>

          {uploadedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText size={28} className="text-zinc-600 mb-3" />
              <p className="text-sm text-zinc-400">No documents indexed yet.</p>
              <p className="text-xs text-zinc-500 mt-1">Upload a PDF to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((ctx, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-[10px] border border-white/5 bg-[#0a0a0c]">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium truncate">{ctx.url || `Document ${idx + 1}`}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">Indexed in Pinecone</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AiContextPage;
