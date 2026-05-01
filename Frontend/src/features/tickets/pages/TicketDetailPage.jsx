import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
  ArrowLeft,
  Send,
  Sparkles,
  CheckCircle,
  RefreshCw,
  User,
  Bot,
  Headphones,
  Clock,
  Mail,
  UserCheck,
  ChevronDown,
  Loader2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useTicketDetail } from '../hooks/useTicketDetail';
import { useAgents } from '../../agents/hooks/useAgents';
import Spinner from '../../../shared/components/ui/Spinner';


/* ─── Status badge ───────────────────────────────────────────────── */
const statusConfig = {
  open: { label: 'Open', bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  assigned: { label: 'Assigned', bg: 'bg-blue-500/15', text: 'text-blue-400', dot: 'bg-blue-400' },
  resolved: { label: 'Resolved', bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.open;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

/* ─── Message bubble ─────────────────────────────────────────────── */
const MessageBubble = ({ msg }) => {
  const isCustomer = msg.sender === 'customer';
  const isAgent = msg.sender === 'agent';
  const isAI = msg.sender === 'ai';

  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isCustomer) {
    return (
      <div className="flex gap-3 justify-start">
        <div className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center shrink-0 mt-1">
          <User size={14} className="text-[#9ca3af]" />
        </div>
        <div className="max-w-[70%]">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-sm text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>
          <p className="text-xs text-[#4b5563] mt-1 ml-1 flex items-center gap-1">
            <Clock size={10} /> {time} · Customer
          </p>
        </div>
      </div>
    );
  }

  if (isAgent) {
    return (
      <div className="flex gap-3 justify-end">
        <div className="max-w-[70%]">
          <div className="bg-white text-[#111111] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>
          <p className="text-xs text-[#4b5563] mt-1 mr-1 flex items-center gap-1 justify-end">
            <Clock size={10} /> {time} · You
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
          <Headphones size={14} className="text-[#111111]" />
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-violet-900/40 border border-violet-500/30 flex items-center justify-center shrink-0 mt-1">
        <Bot size={14} className="text-violet-400" />
      </div>
      <div className="max-w-[70%]">
        <div className="bg-violet-950/40 border border-violet-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={11} className="text-violet-400" />
            <span className="text-xs text-violet-400 font-medium">AI Assistant</span>
          </div>
          <p className="text-sm text-[#c4b5fd] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
        </div>
        <p className="text-xs text-[#4b5563] mt-1 ml-1 flex items-center gap-1">
          <Clock size={10} /> {time} · AI
        </p>
      </div>
    </div>
  );
};

/* ─── Reassign dropdown ──────────────────────────────────────────── */
const ReassignDropdown = ({ currentAgentId, onReassign }) => {
  const [open, setOpen] = useState(false);
  const { users } = useAgents();
  const agents = users.filter((u) => (u.role === 'agent' || u.role === 'admin') && u.isApproved);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] border border-[#374151] text-[#9ca3af] hover:text-white hover:border-[#4b5563] transition-all"
      >
        <UserCheck size={13} />
        Reassign
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-[#111827] border border-[#1f2937] rounded-[10px] shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-[#1f2937]">
            <p className="text-xs text-[#6b7280] font-medium">Assign to agent</p>
          </div>
          {agents.length === 0 ? (
            <p className="text-xs text-[#4b5563] px-3 py-3">No agents available</p>
          ) : (
            agents.map((agent) => (
              <button
                key={agent._id}
                onClick={() => { onReassign(agent._id); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-[#1f2937] flex items-center gap-2 ${
                  String(agent._id) === String(currentAgentId)
                    ? 'text-white font-medium'
                    : 'text-[#9ca3af]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#374151] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-white">
                    {agent.name?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs leading-tight">{agent.name}</p>
                  <p className="truncate text-[10px] text-[#6b7280] leading-tight">{agent.email}</p>
                </div>
                {agent.isOnline && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────── */
const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tenantSlug } = useParams();

  const {
    ticket,
    messages,
    loading,
    messagesLoading,
    sending,
    aiLoading,
    sendReply,
    fetchAISuggestion,
    changeStatus,
    reassignTicket,
  } = useTicketDetail(ticketId);

  const [replyText, setReplyText] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const { fetchUsers } = useAgents();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!replyText.trim() || sending) return;
    const success = await sendReply(replyText);
    if (success) {
      setReplyText('');
      setAiSuggestion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  const handleGetAISuggestion = async () => {
    const suggestion = await fetchAISuggestion();
    if (suggestion) {
      setAiSuggestion(suggestion);
      setReplyText(suggestion);
      textareaRef.current?.focus();
    }
  };

  const handleStatusChange = (status) => changeStatus(status);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  if (!ticket && !loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <AlertCircle size={40} className="text-[#374151]" />
          <p className="text-[#9ca3af]">Ticket not found</p>
          <button
            onClick={() => navigate(`/${tenantSlug}/tickets`)}
            className="text-sm text-white underline"
          >
            Back to tickets
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const isResolved = ticket?.status === 'resolved';
  const assignedAgent = ticket?.assignedTo;

  return (
    <DashboardLayout noPad>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#1f2937] shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate(`/${tenantSlug}/tickets`)}
              className="text-[#6b7280] hover:text-white transition-colors shrink-0 p-1 rounded-[6px] hover:bg-[#1a1a1a]"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-sm font-semibold text-white truncate max-w-[400px]">
                  {ticket?.subject}
                </h1>
                {ticket && <StatusBadge status={ticket.status} />}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-[#6b7280] flex items-center gap-1">
                  <Mail size={11} />
                  {ticket?.customerEmail}
                </span>
                <span className="text-[#374151]">·</span>
                <span className="text-xs text-[#6b7280]">
                  #{ticket?._id?.slice(-8)?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && ticket && (
              <ReassignDropdown
                currentAgentId={assignedAgent?._id}
                onReassign={reassignTicket}
              />
            )}
            {!isResolved ? (
              <button
                onClick={() => handleStatusChange('resolved')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
              >
                <CheckCircle size={13} />
                Mark Resolved
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange('assigned')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] border border-[#374151] text-[#9ca3af] hover:text-white hover:border-[#4b5563] transition-all"
              >
                <RotateCcw size={13} />
                Reopen
              </button>
            )}
          </div>
        </div>

        {/* ── Body: Sidebar + Messages ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Messages ── */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
            {/* Thread */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {messagesLoading && messages.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <Spinner />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <Bot size={28} className="text-[#374151]" />
                  <p className="text-sm text-[#4b5563]">No messages yet</p>
                </div>
              ) : (
                messages.map((msg) => <MessageBubble key={msg._id} msg={msg} />)
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Reply box ── */}
            <div
              className={`px-6 py-4 border-t border-[#1f2937] bg-[#0a0a0a] ${
                isResolved ? 'opacity-60 pointer-events-none' : ''
              }`}
            >
              {isResolved && (
                <div className="flex items-center gap-2 mb-3 text-xs text-[#6b7280] bg-[#111827] border border-[#1f2937] rounded-[8px] px-3 py-2">
                  <AlertCircle size={13} />
                  This ticket is resolved. Reopen it to send a reply.
                </div>
              )}

              {/* AI suggestion banner */}
              {aiSuggestion && replyText === aiSuggestion && (
                <div className="flex items-center gap-2 mb-2 text-xs text-violet-400 bg-violet-950/30 border border-violet-500/20 rounded-[8px] px-3 py-2">
                  <Sparkles size={12} />
                  AI suggestion loaded — you can edit before sending
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your reply… (Ctrl+Enter to send)"
                    rows={3}
                    className="w-full resize-none bg-[#111827] border border-[#1f2937] rounded-[12px] px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#374151] transition-colors leading-relaxed"
                    disabled={isResolved}
                  />
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {/* AI Suggest */}
                  <button
                    onClick={handleGetAISuggestion}
                    disabled={aiLoading || isResolved}
                    title="Generate AI suggestion"
                    className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-violet-900/40 border border-violet-500/30 text-violet-400 hover:bg-violet-900/60 hover:border-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Sparkles size={16} />
                    )}
                  </button>
                  {/* Send */}
                  <button
                    onClick={handleSend}
                    disabled={!replyText.trim() || sending || isResolved}
                    className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-white text-[#111111] hover:bg-[#f3f4f6] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#374151] mt-2">
                <kbd className="bg-[#1f2937] px-1 py-0.5 rounded text-[10px]">Ctrl+Enter</kbd> to send ·{' '}
                <Sparkles size={10} className="inline text-violet-400" /> AI suggestion fills the box for editing
              </p>
            </div>
          </div>

          {/* ── Ticket Info Sidebar ── */}
          <div className="w-72 shrink-0 bg-[#0a0a0a] border-l border-[#1f2937] overflow-y-auto">
            <div className="p-5 space-y-6">
              {/* Ticket Info */}
              <div>
                <p className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider mb-3">
                  Ticket Info
                </p>
                <div className="space-y-3">
                  <InfoRow icon={<Clock size={13} />} label="Created">
                    {ticket?.createdAt
                      ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : '—'}
                  </InfoRow>
                  <InfoRow icon={<Mail size={13} />} label="Customer">
                    <span className="truncate">{ticket?.customerEmail || '—'}</span>
                  </InfoRow>
                  <InfoRow icon={<AlertCircle size={13} />} label="Status">
                    {ticket && <StatusBadge status={ticket.status} />}
                  </InfoRow>
                </div>
              </div>

              {/* Assigned Agent */}
              <div>
                <p className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider mb-3">
                  Assigned Agent
                </p>
                {assignedAgent ? (
                  <div className="flex items-center gap-3 bg-[#111827] rounded-[10px] p-3 border border-[#1f2937]">
                    <div className="w-9 h-9 rounded-full bg-[#374151] flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-white">
                        {assignedAgent.name?.[0]?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {assignedAgent.name}
                      </p>
                      <p className="text-xs text-[#6b7280] truncate">{assignedAgent.email}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            assignedAgent.isOnline ? 'bg-emerald-400' : 'bg-[#374151]'
                          }`}
                        />
                        <span className="text-[10px] text-[#6b7280]">
                          {assignedAgent.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#111827] rounded-[10px] p-3 border border-[#1f2937] text-center">
                    <p className="text-xs text-[#4b5563]">Unassigned</p>
                  </div>
                )}
              </div>

              {/* Message Stats */}
              <div>
                <p className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider mb-3">
                  Conversation
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <StatBox
                    label="Total"
                    value={messages.length}
                    color="text-white"
                  />
                  <StatBox
                    label="Customer"
                    value={messages.filter((m) => m.sender === 'customer').length}
                    color="text-[#60a5fa]"
                  />
                  <StatBox
                    label="Agent"
                    value={messages.filter((m) => m.sender === 'agent').length}
                    color="text-emerald-400"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <p className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  {!isResolved ? (
                    <button
                      onClick={() => handleStatusChange('resolved')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                    >
                      <CheckCircle size={13} />
                      Mark as Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange('assigned')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                    >
                      <RotateCcw size={13} />
                      Reopen Ticket
                    </button>
                  )}
                  <button
                    onClick={handleGetAISuggestion}
                    disabled={aiLoading}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-[8px] bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Sparkles size={13} />
                    )}
                    Get AI Suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* ─── Small helpers ──────────────────────────────────────────────── */
const InfoRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-2">
    <span className="text-[#4b5563] mt-0.5 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[10px] text-[#4b5563] uppercase tracking-wider">{label}</p>
      <div className="text-xs text-[#d1d5db] mt-0.5">{children}</div>
    </div>
  </div>
);

const StatBox = ({ label, value, color }) => (
  <div className="bg-[#111827] border border-[#1f2937] rounded-[8px] p-2 text-center">
    <p className={`text-lg font-bold ${color}`}>{value}</p>
    <p className="text-[10px] text-[#4b5563]">{label}</p>
  </div>
);

export default TicketDetailPage;
