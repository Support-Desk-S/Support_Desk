import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useWidgets } from '../hooks/useWidgets';
import Modal from '../../../shared/components/ui/Modal';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import Badge from '../../../shared/components/ui/Badge';
import Spinner from '../../../shared/components/ui/Spinner';
import { Plus, Copy, Eye, EyeOff, Trash2, RefreshCw, Key, MessageSquare, Settings2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Widget Preview
const WidgetPreview = ({ widget }) => (
  <div className="relative w-full h-32 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb] overflow-hidden flex items-end justify-end p-3">
    <div
      className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white text-sm"
      style={{ backgroundColor: widget.primaryColor || '#007bff' }}
    >
      <MessageSquare size={18} />
    </div>
  </div>
);

const INITIAL_FORM = {
  name: '', description: '', primaryColor: '#111111',
  title: 'Chat with us', subtitle: 'We are here to help',
  welcomeMessage: 'Hello! How can we help you today?',
  position: 'bottom-right', width: 350, height: 500,
};

const WidgetsPage = () => {
  const { widgets, loading, fetchWidgets, createWidget, deleteWidget, getApiKeys } = useWidgets();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [keysModalWidget, setKeysModalWidget] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [keysLoading, setKeysLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [showKeys, setShowKeys] = useState({});

  useEffect(() => { fetchWidgets(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createWidget(form);
      setIsCreateOpen(false);
      setForm(INITIAL_FORM);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create widget');
    } finally {
      setSubmitting(false);
    }
  };

  const openKeys = async (widget) => {
    setKeysModalWidget(widget);
    setKeysLoading(true);
    try {
      const keys = await getApiKeys(widget._id);
      setApiKeys(keys);
    } finally {
      setKeysLoading(false);
    }
  };

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111111]">Chat Widgets</h1>
          <p className="text-sm text-[#6b7280] mt-1">
            Create and manage embeddable chat widgets for your website.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} /> New Widget
        </Button>
      </div>

      {/* Widget Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16"><Spinner size="lg" /></div>
      ) : widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-[#f3f4f6] rounded-2xl flex items-center justify-center mb-4">
            <MessageSquare size={24} className="text-[#9ca3af]" />
          </div>
          <h3 className="text-sm font-semibold text-[#111111] mb-1">No widgets yet</h3>
          <p className="text-sm text-[#6b7280] mb-4">Create your first chat widget to embed on your website.</p>
          <Button onClick={() => setIsCreateOpen(true)} size="sm">
            <Plus size={14} /> Create Widget
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div key={widget._id} className="bg-white border border-[#e5e7eb] rounded-[14px] p-5 hover:shadow-md transition-shadow">
              {/* Preview */}
              <WidgetPreview widget={widget} />

              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">{widget.name}</h3>
                    {widget.description && (
                      <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">{widget.description}</p>
                    )}
                  </div>
                  <Badge variant={widget.isActive ? 'active' : 'inactive'} dot>
                    {widget.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#f3f4f6] rounded-[6px] text-xs text-[#6b7280]">
                    {widget.position}
                  </span>
                  <span className="px-2 py-1 bg-[#f3f4f6] rounded-[6px] text-xs text-[#6b7280]">
                    {widget.width}×{widget.height}px
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => openKeys(widget)}>
                    <Key size={13} /> API Keys
                  </Button>
                  <button
                    onClick={() => deleteWidget(widget._id)}
                    className="p-1.5 rounded-[8px] text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
                    title="Delete widget"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Widget Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Chat Widget"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button type="submit" form="create-widget-form" loading={submitting}>Create Widget</Button>
          </>
        }
      >
        <form id="create-widget-form" onSubmit={handleCreate} className="space-y-4">
          <Input label="Widget Name" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="My Support Widget" />
          <Input label="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional description" />
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-[#111111] block mb-1.5">Primary Color</label>
              <input type="color" value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                className="w-full h-10 border border-[#e5e7eb] rounded-[10px] cursor-pointer px-1" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-[#111111] block mb-1.5">Position</label>
              <select value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full h-10 px-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111]">
                {['bottom-right', 'bottom-left', 'top-right', 'top-left'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <Input label="Widget Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div>
            <label className="text-sm font-medium text-[#111111] block mb-1.5">Welcome Message</label>
            <textarea value={form.welcomeMessage}
              onChange={(e) => setForm({ ...form, welcomeMessage: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] resize-none" />
          </div>
        </form>
      </Modal>

      {/* API Keys Modal */}
      <Modal
        isOpen={!!keysModalWidget}
        onClose={() => setKeysModalWidget(null)}
        title={`API Keys — ${keysModalWidget?.name}`}
        size="md"
      >
        {keysLoading ? (
          <div className="flex items-center justify-center py-8"><Spinner /></div>
        ) : apiKeys.length === 0 ? (
          <p className="text-sm text-[#6b7280] text-center py-6">No API keys found for this widget.</p>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key._id} className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb]">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#111111] mb-0.5">{key.name}</p>
                  <code className="text-xs text-[#6b7280] font-mono">
                    {showKeys[key._id] ? key.key : '••••••••••••••••••••••••'}
                  </code>
                </div>
                <button onClick={() => setShowKeys((s) => ({ ...s, [key._id]: !s[key._id] }))}>
                  {showKeys[key._id] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                {key.key && (
                  <button onClick={() => copyKey(key.key)}>
                    <Copy size={14} className="text-[#9ca3af] hover:text-[#111111] transition-colors" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 p-4 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb]">
          <p className="text-xs font-semibold text-[#111111] mb-2">Embed Code</p>
          <code className="text-xs text-[#6b7280] break-all font-mono">
            {`<script src="https://yourplatform.com/widget.js" data-widget-id="${keysModalWidget?._id}"></script>`}
          </code>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default WidgetsPage;
