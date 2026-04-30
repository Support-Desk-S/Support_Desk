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
        <h1 className="text-2xl font-semibold text-[#111111]">AI Context</h1>
        <p className="text-sm text-[#6b7280] mt-1">
          Upload PDF documents to train your AI assistant with company-specific knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bot size={18} className="text-[#8b5cf6]" />
            <h2 className="text-sm font-semibold text-[#111111]">Upload Knowledge Base</h2>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={[
              'border-2 border-dashed rounded-[12px] p-8 text-center transition-all duration-200 cursor-pointer',
              dragging ? 'border-[#111111] bg-[#f3f4f6]' : 'border-[#e5e7eb] hover:border-[#d1d5db]',
            ].join(' ')}
            onClick={() => document.getElementById('ctx-file-input').click()}
          >
            <Upload size={24} className="mx-auto mb-3 text-[#9ca3af]" />
            <p className="text-sm font-medium text-[#111111] mb-1">
              {file ? file.name : 'Drop a PDF here or click to browse'}
            </p>
            <p className="text-xs text-[#6b7280]">Supports: PDF files only. Max 10MB.</p>
            <input
              id="ctx-file-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb]">
              <FileText size={18} className="text-[#8b5cf6] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111111] truncate">{file.name}</p>
                <p className="text-xs text-[#6b7280]">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <Button onClick={handleUpload} loading={uploading} size="sm">
                Upload
              </Button>
            </div>
          )}

          <div className="mt-5 p-4 bg-[#ede9fe] rounded-[10px]">
            <p className="text-xs font-semibold text-[#5b21b6] mb-1">How it works</p>
            <p className="text-xs text-[#6b7280]">
              Uploaded PDFs are split into chunks, embedded via MistralAI, and indexed in Pinecone.
              The AI will use this knowledge to answer customer queries automatically.
            </p>
          </div>
        </div>

        {/* Indexed Files */}
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">
            Indexed Documents ({uploadedFiles.length})
          </h2>

          {uploadedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText size={28} className="text-[#d1d5db] mb-3" />
              <p className="text-sm text-[#6b7280]">No documents indexed yet.</p>
              <p className="text-xs text-[#9ca3af]">Upload a PDF to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((ctx, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-[10px] border border-[#e5e7eb]">
                  <CheckCircle2 size={16} className="text-[#10b981] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#111111] font-medium truncate">{ctx.url || `Document ${idx + 1}`}</p>
                    <p className="text-xs text-[#9ca3af]">Indexed in Pinecone</p>
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
