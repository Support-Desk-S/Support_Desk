import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
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
} from "lucide-react";
import DashboardLayout from "../../../shared/components/layout/DashboardLayout";
import { useTicketDetail } from "../hooks/useTicketDetail";
import { useAgents } from "../../agents/hooks/useAgents";
import Spinner from "../../../shared/components/ui/Spinner";

/* ─── Status badge ───────────────────────────────────────────────── */
const statusConfig = {
  open: {
    label: "Open",
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  assigned: {
    label: "Assigned",
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  resolved: {
    label: "Resolved",
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.open;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

/* ─── Message bubble ─────────────────────────────────────────────── */
const MessageBubble = ({ msg }) => {
  const isCustomer = msg.sender === "customer";
  const isAgent = msg.sender === "agent";
  const isAI = msg.sender === "ai";

  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isCustomer) {
    return (
      <div className="flex gap-3 justify-start">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-1">
          <User size={12} md:size={14} className="text-zinc-400" />
        </div>
        <div className="max-w-[70%]">
          <div className="bg-[#0a0a0c] border border-white/5 rounded-[12px] rounded-tl-sm px-4 py-3">
            <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
          <p className="text-xs text-zinc-500 mt-1 ml-1 flex items-center gap-1">
            <Clock size={12} md:size={14} /> {time} · Customer
          </p>
        </div>
      </div>
    );
  }

  if (isAgent) {
    return (
      <div className="flex gap-3 justify-end">
        <div className="max-w-[70%]">
          <div className="bg-white text-black rounded-[12px] rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
          <p className="text-xs text-zinc-500 mt-1 mr-1 flex items-center gap-1 justify-end">
            <Clock size={12} md:size={14} /> {time} · You
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
          <Headphones size={12} md:size={14} className="text-black" />
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-1">
        <Bot size={12} md:size={14} className="text-violet-400" />
      </div>
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="bg-violet-500/5 border border-violet-500/10 rounded-[12px] rounded-tl-sm px-4 py-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={11} className="text-violet-400" />
            <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider">
              AI Assistant
            </span>
          </div>
          <p className="text-sm text-violet-200 leading-relaxed whitespace-pre-wrap">
            {msg.message}
          </p>
        </div>
        <p className="text-xs text-zinc-500 mt-1 ml-1 flex items-center gap-1">
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
  const agents = users.filter(
    (u) => (u.role === "agent" || u.role === "admin") && u.isApproved,
  );
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[10px] border border-white/5 bg-[#09090b] text-zinc-400 hover:text-white hover:border-white/15 hover:bg-[#161619] transition-all cursor-pointer shadow-sm"
      >
        <UserCheck size={12} className="shrink-0 text-zinc-500 group-hover:text-white" />
        Reassign
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-56 bg-[#09090b] border border-white/5 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-white/5 bg-[#0d0d10]/40">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              Assign to agent
            </p>
          </div>
          {agents.length === 0 ? (
            <p className="text-xs text-zinc-500 px-3.5 py-3 italic">
              No agents available
            </p>
          ) : (
            <div className="max-h-60 overflow-y-auto py-1">
              {agents.map((agent) => (
                <button
                  key={agent._id}
                  onClick={() => {
                    onReassign(agent._id);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-white/[0.02] flex items-center gap-2.5 ${String(agent._id) === String(currentAgentId)
                    ? "text-white font-bold bg-white/5"
                    : "text-zinc-400 hover:text-white"
                    }`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-white">
                      {agent.name?.[0]?.toUpperCase() || "A"}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] leading-normal font-semibold text-zinc-200">{agent.name}</p>
                    <p className="truncate text-[9.5px] text-zinc-500 leading-none">
                      {agent.email}
                    </p>
                  </div>
                  {agent.isOnline && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse" />
                  )}
                </button>
              ))}
            </div>
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
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

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

  const [replyText, setReplyText] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const { fetchUsers } = useAgents();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!replyText.trim() || sending) return;
    const success = await sendReply(replyText);
    if (success) {
      setReplyText("");
      setAiSuggestion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
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

  const isResolved = ticket?.status === "resolved";
  const assignedAgent = ticket?.assignedTo;

  return (
    <DashboardLayout noPad>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        {/* ── Header ── */}
        <div className="flex flex-col gap-3 px-3 md:px-6 py-4 bg-[#050507] border-b border-white/5 shrink-0">
          {/* Top Row */}
          <div className="flex items-start md:items-center justify-between gap-3">
            {/* LEFT */}
            <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
              {/* Back Button */}
              <button
                onClick={() => navigate(`/${tenantSlug}/tickets`)}
                className="cursor-pointer mt-1 md:mt-0 shrink-0 text-zinc-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Title Block */}
              <div className="min-w-0 flex-1">
                {/* Subject + Status */}
                <div className="flex items-start md:items-center gap-2 min-w-0">
                  <h1 className="text-sm md:text-base font-semibold text-white leading-snug wrap-break-word md:truncate md:max-w-105">
                    {ticket?.subject || "No Subject"}
                  </h1>

                  {ticket && <StatusBadge status={ticket.status} />}
                </div>

                {/* Sub Info */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1 min-w-0">
                    <Mail size={11} />
                    <span className="truncate max-w-40">
                      {ticket?.customerEmail}
                    </span>
                  </span>

                  <span className="hidden sm:inline text-zinc-700">·</span>

                  <span className="whitespace-nowrap">
                    #{ticket?._id?.slice(-8)?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {isAdmin && ticket && (
                <ReassignDropdown
                  currentAgentId={assignedAgent?._id}
                  onReassign={reassignTicket}
                />
              )}

              {!isResolved ? (
                <button
                  onClick={() => handleStatusChange("resolved")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-all cursor-pointer"
                >
                  <CheckCircle size={13} />
                  Resolve
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange("assigned")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 bg-[#0a0a0c] text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <RotateCcw size={13} />
                  Reopen
                </button>
              )}

              {/* Info Button */}
              <button
                onClick={() => setShowInfoSidebar(true)}
                className="px-3 lg:hidden py-1.5 text-xs font-semibold rounded-[8px] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                Info
              </button>
            </div>
          </div>

          {/* MOBILE ACTION ROW */}
          <div className="flex md:hidden items-center gap-2">
            {isAdmin && ticket && (
              <ReassignDropdown
                currentAgentId={assignedAgent?._id}
                onReassign={reassignTicket}
              />
            )}

            <button
              onClick={() => setShowInfoSidebar(true)}
              className="px-3 py-2 text-xs font-semibold rounded-[8px] border border-white/10 text-zinc-400"
            >
              Info
            </button>

            {!isResolved ? (
              <button
                onClick={() => handleStatusChange("resolved")}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-[8px] bg-emerald-500 text-black"
              >
                <CheckCircle size={13} />
                Resolve
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange("assigned")}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-[8px] border border-white/10 text-zinc-400"
              >
                <RotateCcw size={13} />
                Reopen
              </button>
            )}
          </div>
        </div>

        {/* ── Body: Sidebar + Messages ── */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* ── Messages ── */}
          <div className="flex-1 flex flex-col overflow-hidden bg-black">
            {/* Thread */}
            <div className="flex-1 overflow-y-auto px-3 md:px-6 py-5 space-y-4">
              {messagesLoading && messages.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <Spinner />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <Bot size={28} className="text-zinc-600" />
                  <p className="text-sm text-zinc-500">No messages yet</p>
                </div>
              ) : (
                messages.map((msg) => <MessageBubble key={msg._id} msg={msg} />)
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Reply box ── */}
            <div
              className={`px-3 md:px-6 py-4 border-t border-white/5 bg-[#050507] ${isResolved ? "opacity-60 pointer-events-none" : ""
                }`}
            >
              {isResolved && (
                <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400 bg-white/5 border border-white/5 rounded-[8px] px-3 py-2">
                  <AlertCircle size={13} />
                  This ticket is resolved. Reopen it to send a reply.
                </div>
              )}

              {/* AI suggestion banner */}
              {aiSuggestion && replyText === aiSuggestion && (
                <div className="flex items-center gap-2 mb-2 text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-[8px] px-3 py-2">
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
                    className="w-full min-h-[80px] md:min-h-[100px] resize-none bg-[#0a0a0c] border border-white/10 rounded-[12px] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-colors leading-relaxed"
                    disabled={isResolved}
                  />
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {/* AI Suggest */}
                  <button
                    onClick={handleGetAISuggestion}
                    disabled={aiLoading || isResolved}
                    title="Generate AI suggestion"
                    className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? (
                      <Loader2 size={16} className="animate-spin text-violet-400" />
                    ) : (
                      <Sparkles size={16} />
                    )}
                  </button>
                  {/* Send */}
                  <button
                    onClick={handleSend}
                    disabled={!replyText.trim() || sending || isResolved}
                    className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-[10px] bg-white text-black hover:bg-zinc-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <Loader2 size={16} className="animate-spin text-black" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">
                <kbd className="bg-white/5 border border-white/5 px-1 py-0.5 rounded text-[10px] text-zinc-400">
                  Ctrl+Enter
                </kbd>{" "}
                to send ·{" "}
                <Sparkles size={10} className="inline text-violet-400" /> AI
                suggestion fills the box for editing
              </p>
            </div>
          </div>

          {/* Overlay */}
          {showInfoSidebar && (
            <div
              onClick={() => setShowInfoSidebar(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
          )}

          {/* ── Ticket Info Sidebar ── */}
          <div
            className={`
          fixed md:static top-0 right-0 h-full w-80
           bg-[#050507] border-l border-white/5
           overflow-y-auto z-50
            transform transition-transform duration-300
        ${showInfoSidebar ? "translate-x-0" : "translate-x-full"}
         md:translate-x-0
  `}
          >
            <div className="p-5 space-y-6">
              {/* Ticket Info */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Ticket Info
                </p>
                <div className="space-y-3">
                  <InfoRow icon={<Clock size={13} />} label="Created">
                    {ticket?.createdAt
                      ? new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "—"}
                  </InfoRow>
                  <InfoRow icon={<Mail size={13} />} label="Customer">
                    <span className="truncate">
                      {ticket?.customerEmail || "—"}
                    </span>
                  </InfoRow>
                  <InfoRow icon={<AlertCircle size={13} />} label="Status">
                    {ticket && <StatusBadge status={ticket.status} />}
                  </InfoRow>
                </div>
              </div>

              {/* Assigned Agent */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Assigned Agent
                </p>
                {assignedAgent ? (
                  <div className="flex items-center gap-3 bg-white/5 rounded-[12px] p-3 border border-white/5">
                    <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-white">
                        {assignedAgent.name?.[0]?.toUpperCase() || "A"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {assignedAgent.name}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">
                        {assignedAgent.email}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${assignedAgent.isOnline
                            ? "bg-emerald-400"
                            : "bg-zinc-700"
                            }`}
                        />
                        <span className="text-[10px] text-zinc-400">
                          {assignedAgent.isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-[12px] p-3 border border-white/5 text-center">
                    <p className="text-xs text-zinc-500">Unassigned</p>
                  </div>
                )}
              </div>

              {/* Message Stats */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
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
                    value={
                      messages.filter((m) => m.sender === "customer").length
                    }
                    color="text-blue-400"
                  />
                  <StatBox
                    label="Agent"
                    value={messages.filter((m) => m.sender === "agent").length}
                    color="text-emerald-400"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  {!isResolved ? (
                    <button
                      onClick={() => handleStatusChange("resolved")}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                    >
                      <CheckCircle size={13} />
                      Mark as Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange("assigned")}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      Reopen Ticket
                    </button>
                  )}
                  <button
                    onClick={handleGetAISuggestion}
                    disabled={aiLoading}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-[8px] bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all disabled:opacity-50 cursor-pointer"
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
    <span className="text-zinc-500 mt-0.5 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
        {label}
      </p>
      <div className="text-xs text-zinc-300 mt-0.5">{children}</div>
    </div>
  </div>
);

const StatBox = ({ label, value, color }) => (
  <div className="bg-white/5 border border-white/5 rounded-[10px] p-2 text-center">
    <p className={`text-lg font-bold ${color}`}>{value}</p>
    <p className="text-[10px] text-zinc-500 font-semibold">{label}</p>
  </div>
);

export default TicketDetailPage;
