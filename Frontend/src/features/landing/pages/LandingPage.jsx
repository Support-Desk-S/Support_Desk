import { ArrowRight, BarChart3, Bot, Code, Menu, ShieldCheck, Users, X, Zap, Cpu, CheckCircle2, TicketCheck, Settings, Send, Upload, MessageSquare, Clock, UserCheck, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Design Read: High-end B2B SaaS landing page, leaning toward an obsidian editorial dark mode with strict white text typography, floating thin-grid geometry, and dark mode UI mockups. ─── */

/* ─── Reusable reveal wrapper with premium cubic bezier transition ─── */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Premium Glassmorphic Browser Mockup Frame ─── */
const ScreenMockup = ({ children, activeEffect = false }) => {
  return (
    <div className="relative w-full group/mockup">
      {/* Outer subtle glow */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-700 blur-sm -z-10" />
      
      <div className="rounded-xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)] border border-white/5 bg-[#08080a]/90 backdrop-blur-md transition-all duration-500 ease-out group-hover/mockup:border-white/10 group-hover/mockup:-translate-y-1">
        
        {/* Header bar */}
        <div className="h-10 bg-neutral-950/80 border-b border-white/5 flex items-center px-4 gap-3 select-none">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 h-5.5 bg-neutral-900/40 border border-white/5 rounded-full flex items-center px-4 max-w-[200px] mx-auto justify-center">
            <span className="text-[8px] text-white/30 font-mono tracking-wide">app.supportdesk.ai</span>
          </div>
        </div>

        {/* Content body */}
        <div className="w-full aspect-[4/3] bg-neutral-950 relative overflow-hidden flex flex-col text-[11px]">
          {children}
        </div>
      </div>
      
      {/* Ambient background glow */}
      <div className="absolute -bottom-8 -left-4 -right-4 h-24 bg-white/[0.01] blur-3xl -z-20 rounded-full pointer-events-none" />
    </div>
  );
};

/* ─── Animated numerical counters for metrics showcase ─── */
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.ceil(to / 40);
    const t = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(cur);
      if (cur >= to) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─── High-Fidelity UI Replicas (Optimized for Dark Theme) ─── */
const TicketUI = () => (
  <div className="p-5 flex flex-col h-full w-full bg-[#050507] font-sans justify-between">
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-bold text-white tracking-tight">Active Queue</div>
          <div className="text-[9.5px] text-zinc-400 mt-0.5">Real-time customer issues.</div>
        </div>
        <div className="flex gap-1 bg-white/5 p-0.5 rounded-[10px] border border-white/5">
          <div className="px-2 py-0.5 bg-white/10 text-[8.5px] font-semibold rounded-md text-white border border-white/5 shadow-sm">All</div>
          <div className="px-2 py-0.5 text-zinc-400 text-[8.5px] font-semibold">Open</div>
          <div className="px-2 py-0.5 text-zinc-400 text-[8.5px] font-semibold">Resolved</div>
        </div>
      </div>
      <div className="overflow-hidden border border-white/5 rounded-xl bg-[#09090b]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-[#0e0e11]/40">
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-400 uppercase tracking-wider">Customer</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-400 uppercase tracking-wider">Subject</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-400 uppercase tracking-wider">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {[
              { email: 'alex@company.com', subject: 'API key validation failing', status: 'open', agent: 'AD', agentName: 'Alice Dev', statusVariant: 'open' },
              { email: 'sarah@acme.inc', subject: 'Upgrade billing path question', status: 'resolved', agent: 'MS', agentName: 'Marcus S.', statusVariant: 'resolved' },
              { email: 'mike@startup.io', subject: 'Webhook signature validation', status: 'assigned', agent: 'AD', agentName: 'Alice Dev', statusVariant: 'assigned' },
            ].map((t, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-3.5 py-3 text-[10.5px] text-white font-medium truncate max-w-[100px]">{t.email}</td>
                <td className="px-3.5 py-3 text-[10.5px] text-zinc-400 truncate max-w-[130px]">{t.subject}</td>
                <td className="px-3.5 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[8.5px] font-semibold uppercase tracking-wider border ${
                    t.statusVariant === 'open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    t.statusVariant === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      t.statusVariant === 'open' ? 'bg-amber-400' :
                      t.statusVariant === 'resolved' ? 'bg-emerald-400' :
                      'bg-blue-400'
                    }`} />
                    {t.status}
                  </span>
                </td>
                <td className="px-3.5 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-[7.5px] font-bold text-white">{t.agent}</span>
                    </div>
                    <span className="text-[10px] text-zinc-300 font-medium truncate max-w-[60px]">{t.agentName}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-500 font-mono">
      <span>Queue latency: 0.4s</span>
      <span className="font-semibold text-white">Live-sync active</span>
    </div>
  </div>
);

const WidgetUI = () => (
  <div className="p-4 flex h-full items-center justify-center w-full bg-[#050507] relative">
    <div className="w-full max-w-[250px] border border-white/10 rounded-xl bg-[#09090b] flex flex-col overflow-hidden shadow-2xl">
      <div className="px-4 py-3 bg-[#0a0a0c] border-b border-white/5 flex items-center justify-between">
        <div>
          <div className="font-bold text-[12px] text-white tracking-tight">AI Assistant</div>
          <div className="text-zinc-400 text-[8.5px] mt-0.5">Online // Answers instantly</div>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className="p-3.5 text-[10.5px] h-[145px] bg-[#050507] flex flex-col gap-3 justify-end">
        {/* Customer bubble */}
        <div className="self-end bg-white text-black px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] font-medium shadow-sm">
          How do I rotate my team api keys?
        </div>
        {/* AI response bubble */}
        <div className="self-start bg-white/5 border border-white/10 px-3 py-2 rounded-xl rounded-tl-none text-zinc-200 max-w-[85%] leading-relaxed shadow-sm">
          <div className="flex items-center gap-1 mb-1 text-zinc-400">
            <Bot size={11} className="text-violet-400 animate-pulse" />
            <span className="text-[8px] font-bold uppercase tracking-wider">AI Support</span>
          </div>
          Navigate to Settings &rarr; API keys, and click "Rotate Key".
        </div>
      </div>
      <div className="border-t border-white/5 p-2 bg-[#0a0a0c]">
        <div className="w-full h-8 bg-[#050507] border border-white/5 rounded-lg flex items-center px-3 text-zinc-600 text-[9.5px] font-medium justify-between">
          <span>Ask AI a question...</span>
          <Send size={11} className="text-zinc-500" />
        </div>
      </div>
    </div>
  </div>
);

const AgentUI = () => (
  <div className="p-5 flex flex-col h-full w-full bg-[#050507] justify-between font-sans">
    <div>
      <div className="mb-4">
        <div className="text-[13px] font-bold text-white tracking-tight">Team Overview</div>
        <div className="text-[9.5px] text-zinc-400 mt-0.5">Manage agent access, status, and permissions.</div>
      </div>
      <div className="bg-[#09090b] border border-white/5 rounded-xl overflow-hidden shadow-inner">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-[#0e0e11]/40">
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">Agent</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">Role</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-3.5 py-2.5 text-center text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">Online</th>
              <th className="px-3.5 py-2.5 text-left text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Alice Dev', email: 'alice@company.com', role: 'admin', roleVariant: 'admin', isApproved: true, isOnline: true },
              { name: 'Marcus S.', email: 'marcus@company.com', role: 'agent', roleVariant: 'agent', isApproved: false, isOnline: false },
            ].map((a, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-3.5 py-2.5 text-[10px] font-semibold text-white">
                  <div>{a.name}</div>
                  <div className="text-[8px] text-zinc-500 font-normal mt-0.5">{a.email}</div>
                </td>
                <td className="px-3.5 py-2.5">
                  <span className={`px-1.5 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-wider border ${
                    a.roleVariant === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }`}>
                    {a.role}
                  </span>
                </td>
                <td className="px-3.5 py-2.5">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-wider border ${
                    a.isApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${a.isApproved ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                    {a.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-3.5 py-2.5 text-center">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    a.isOnline ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]' : 'bg-zinc-700'
                  }`} />
                </td>
                <td className="px-3.5 py-2.5">
                  {a.isApproved ? (
                    <button className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-md border border-red-500/20 bg-red-500/10 text-red-400 cursor-pointer">
                      Suspend
                    </button>
                  ) : (
                    <button className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-md border border-white/5 bg-[#09090b] text-white cursor-pointer">
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="pt-2 border-t border-white/5 text-[8.5px] text-zinc-500 font-mono">
      Authentication: Workspace SSO & Credentials
    </div>
  </div>
);

const ContextUI = () => (
  <div className="p-5 flex flex-col h-full w-full bg-[#050507] justify-between">
    <div>
      <div className="mb-4">
        <div className="text-[13px] font-bold text-white tracking-tight">AI Context</div>
        <div className="text-[9.5px] text-zinc-400 mt-0.5">Train your AI with company knowledge.</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#09090b] border border-white/5 p-3 rounded-lg flex flex-col justify-between h-[150px]">
          <div className="flex items-center gap-1.5 text-white">
            <Bot size={12} className="text-zinc-400" />
            <span className="text-[10px] font-semibold">Upload Doc</span>
          </div>
          <div className="border border-dashed border-white/10 rounded-lg p-2 text-center flex flex-col items-center justify-center flex-1 my-2 bg-white/[0.01]">
            <Upload size={14} className="text-zinc-500 mb-1" />
            <span className="text-[8.5px] text-zinc-400 font-medium leading-tight">Click to upload</span>
          </div>
          <span className="text-[7.5px] text-zinc-500 text-center font-mono">PDF files only. Max 10MB</span>
        </div>
        
        <div className="bg-[#09090b] border border-white/5 p-3 rounded-lg flex flex-col h-[150px] overflow-hidden">
          <div className="text-[10px] font-semibold text-white mb-2">Indexed Files (2)</div>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-0.5">
            {[
              { name: 'SLA_Rules_2026.pdf', size: '124 KB' },
              { name: 'API_Spec_v3.md', size: '42 KB' }
            ].map((doc, i) => (
              <div key={i} className="bg-[#0a0a0c] border border-white/5 p-2 rounded flex items-center gap-2">
                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] font-bold text-white truncate leading-tight">{doc.name}</div>
                  <div className="text-[7.5px] text-zinc-500 mt-0.5 font-mono">{doc.size} // Pinecone</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="pt-2 border-t border-white/5 text-[8.5px] text-zinc-500 font-mono">
      Embedding model: text-embedding-3-large
    </div>
  </div>
);

const TicketDetailUI = () => (
  <div className="flex h-full w-full bg-[#030303] text-white font-sans text-[9.5px] leading-tight select-none">
    {/* Left Pane: Conversation View */}
    <div className="flex-1 flex flex-col justify-between p-3.5 min-w-0 border-r border-white/5">
      <div className="space-y-3">
        {/* Ticket Header Title */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <button className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 cursor-pointer">
              <ArrowRight className="w-3 h-3 rotate-180" />
            </button>
            <div className="min-w-0">
              <h3 className="font-extrabold text-white text-[11px] truncate tracking-tight">
                I have a problem how can I get refund...
              </h3>
              <div className="text-[8px] text-zinc-500 mt-0.5">
                xyz@gmail.com &bull; #EFF36740
              </div>
            </div>
            <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[7.5px] font-bold uppercase tracking-wider shrink-0">
              Resolved
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
          {/* Customer Message */}
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-[8px] font-bold shrink-0">
              C
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-[#09090b] border border-white/5 text-zinc-200 p-2.5 rounded-xl rounded-tl-none inline-block text-[9px] max-w-[85%] leading-normal">
                i have a problem how can i get refund for a dammeged product
              </div>
              <div className="text-[7.5px] text-zinc-500 mt-1">09:31 AM &bull; Customer</div>
            </div>
          </div>

          {/* AI connected message */}
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-400 text-[8px] font-bold shrink-0">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-violet-950/10 border border-violet-500/10 text-violet-300 p-2.5 rounded-xl rounded-tl-none inline-block text-[9px] max-w-[85%] leading-normal">
                <span className="font-bold text-[8px] uppercase tracking-wider text-violet-400 block mb-0.5">AI Assistant</span>
                I've connected you with Sunhajit for further assistance.
              </div>
              <div className="text-[7.5px] text-zinc-500 mt-1">09:31 AM &bull; AI</div>
            </div>
          </div>

          {/* Agent Message Right */}
          <div className="flex flex-col items-end">
            <div className="bg-white text-black p-2.5 rounded-xl rounded-tr-none text-[9px] max-w-[85%] font-medium leading-normal shadow-sm">
              ok we will contact you by mail
            </div>
            <div className="text-[7.5px] text-zinc-500 mt-1">09:46 AM &bull; You</div>
          </div>
        </div>
      </div>

      {/* Input / Footer Banner */}
      <div className="space-y-1.5 mt-2">
        <div className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-center text-zinc-400 text-[8px] font-semibold">
          This ticket is resolved. Reopen it to send a reply.
        </div>
        <div className="h-7 bg-zinc-950/50 border border-white/5 rounded-lg flex items-center justify-between px-2 text-zinc-600 text-[8.5px]">
          <span>Type your reply... (Ctrl+Enter to send)</span>
          <Send className="w-3 h-3 text-zinc-500" />
        </div>
      </div>
    </div>

    {/* Right Pane: Ticket Info Pane */}
    <div className="w-[160px] bg-[#050507] p-3 shrink-0 flex flex-col justify-between border-l border-white/5">
      <div className="space-y-4">
        {/* Ticket Info Section */}
        <div>
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-zinc-500">Ticket Info</span>
          <div className="mt-1.5 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500 text-[8px]">Created</span>
              <span className="text-zinc-300 text-[8px] font-medium">May 4, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-[8px]">Customer</span>
              <span className="text-zinc-300 text-[8px] font-medium truncate max-w-[80px]">xyz@gmail.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 text-[8px]">Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 text-[8px] font-medium">
                <span className="w-1 h-1 rounded-full bg-emerald-400" /> Resolved
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Agent */}
        <div>
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-zinc-500">Assigned Agent</span>
          <div className="mt-1.5 bg-[#09090b] border border-white/5 p-2 rounded-lg flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
              S
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[8.5px] font-bold text-white leading-tight">Sunhajit</div>
              <div className="text-[7.5px] text-zinc-500 truncate leading-tight">subhait@24gmail.com</div>
              <div className="text-[7px] text-zinc-500 mt-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-zinc-600" /> Offline
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Stats */}
        <div>
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-zinc-500">Conversation</span>
          <div className="grid grid-cols-3 gap-1 mt-1.5 text-center">
            <div className="bg-[#09090b] border border-white/5 p-1 rounded-md">
              <div className="text-[9px] font-extrabold text-white leading-none">4</div>
              <div className="text-[6.5px] text-zinc-500 uppercase mt-0.5 leading-none">Total</div>
            </div>
            <div className="bg-[#09090b] border border-white/5 p-1 rounded-md">
              <div className="text-[9px] font-extrabold text-white leading-none">1</div>
              <div className="text-[6.5px] text-zinc-500 uppercase mt-0.5 leading-none">Cust.</div>
            </div>
            <div className="bg-[#09090b] border border-white/5 p-1 rounded-md">
              <div className="text-[9px] font-extrabold text-white leading-none">2</div>
              <div className="text-[6.5px] text-zinc-500 uppercase mt-0.5 leading-none">Agent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-1 pt-2 border-t border-white/5">
        <button className="w-full py-1 text-[8px] font-bold uppercase tracking-wider bg-[#09090b] border border-white/5 text-white rounded-md cursor-pointer">
          Reopen Ticket
        </button>
        <button className="w-full py-1 text-[8px] font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-700 text-white rounded-md shadow-md cursor-pointer">
          Get AI Suggestion
        </button>
      </div>
    </div>
  </div>
);

const MultiTenantUI = () => (
  <div className="p-5 flex flex-col h-full w-full bg-[#050507] justify-between relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1.2px,transparent_1px)] bg-[size:14px_14px]"></div>
    
    <div>
      <div className="mb-4">
        <div className="text-[13px] font-bold text-white tracking-tight">Isolated Tenancy</div>
        <div className="text-[9.5px] text-zinc-400 mt-0.5">Switch workspaces under secure boundary rules.</div>
      </div>
      <div className="w-full max-w-[210px] bg-[#09090b] border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl mx-auto">
        <div className="px-3.5 py-2.5 border-b border-white/5 flex items-center justify-between bg-[#0a0a0c]">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span className="text-[9.5px] font-bold text-white tracking-tight">SupportDesk Workspace</span>
          </div>
        </div>
        <div className="p-1 flex flex-col gap-1 bg-[#09090b]">
          {[
            { n: 'Acme Enterprise', init: 'A', act: true },
            { n: 'Globex Hub', init: 'G', act: false },
          ].map((t) => (
            <div key={t.n} className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${t.act ? 'bg-white/10 text-white font-medium border border-white/5 shadow-sm' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-white border border-white/5">{t.init}</div>
                <span className="text-[10px] font-semibold">{t.n}</span>
              </div>
              {t.act && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="pt-2 border-t border-white/5 text-[8.5px] text-zinc-500 font-mono z-10">
      Workspace Isolation Mode: Encrypted Namespace
    </div>
  </div>
);

const HeroUI = () => (
  <div className="flex h-full w-full bg-[#030303] text-white font-sans text-[10px] leading-tight select-none">
    {/* Sidebar */}
    <div className="w-[180px] border-r border-white/5 bg-black flex flex-col justify-between p-3.5 shrink-0">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-1.5 py-2 mb-4">
          <div className="w-7.5 h-7.5 rounded-full border border-white/10 bg-[#09090b] flex items-center justify-center shadow-md shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-white text-[11px] leading-none tracking-tight">SupportDesk</div>
            <div className="text-[8.5px] text-zinc-500 leading-none mt-1">NexaCart</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/5 text-white font-extrabold rounded-[8px] shadow-sm cursor-pointer">
            <BarChart3 className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="text-[9px] uppercase tracking-wider">Dashboard</span>
          </div>

          {[
            { label: "Tickets", icon: TicketCheck },
            { label: "Agents", icon: Users },
            { label: "Widgets", icon: MessageSquare },
            { label: "Ai Context", icon: Bot },
            { label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-2.5 py-1.5 text-zinc-500 hover:text-white font-bold rounded-[8px] transition-colors cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="border-t border-white/5 pt-3.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-[9.5px] font-bold text-white">
            SR
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] font-bold text-white truncate leading-none">Subham Ray</div>
            <div className="text-[8px] text-zinc-500 truncate mt-1">subhamray865@gmai...</div>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white shrink-0 cursor-pointer">
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    {/* Main View Area */}
    <div className="flex-1 flex flex-col min-w-0 bg-[#030303] overflow-hidden">
      {/* Header bar */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-5 shrink-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
          <span>nexacart</span>
          <span>&gt;</span>
          <span className="text-white font-bold">Dashboard</span>
        </div>

        {/* User Info Right */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-[9.5px] font-bold text-white leading-none">Subham Ray</div>
            <div className="text-[7.5px] text-zinc-500 uppercase tracking-widest font-semibold mt-1 leading-none">Admin</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[9.5px] font-bold text-white">
            SR
          </div>
        </div>
      </div>

      {/* Workspace Dashboard Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5">
        {/* Welcome Text */}
        <div>
          <h2 className="text-[15px] font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Welcome back, Subham <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-[10px] text-zinc-400 mt-1">
            Here's what's happening in your support workspace today.
          </p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-4 gap-3.5">
          {[
            {
              value: "16",
              label: "Total Tickets",
              icon: TicketCheck,
              color: "text-white border-white/10 bg-white/5",
            },
            {
              value: "2",
              label: "Open Tickets",
              icon: Clock,
              color: "text-amber-400 border-amber-500/10 bg-amber-500/5",
            },
            {
              value: "3",
              label: "Assigned",
              icon: UserCheck,
              color: "text-blue-400 border-blue-500/10 bg-blue-500/5",
            },
            {
              value: "11",
              label: "Resolved",
              icon: CheckCircle2,
              color: "text-emerald-400 border-emerald-500/10 bg-emerald-500/5",
            },
          ].map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#09090b] border border-white/5 rounded-xl p-3 flex flex-col justify-between transition-all hover:border-white/10 shadow-sm"
              >
                <div className={`w-7.5 h-7.5 rounded-lg border flex items-center justify-center shrink-0 ${card.color}`}>
                  <CardIcon className="w-3.5 h-3.5" />
                </div>
                <div className="mt-3">
                  <div className="text-[18px] font-extrabold text-white leading-none">{card.value}</div>
                  <div className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 mt-1.5">{card.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Tickets Table Section */}
        <div className="border border-white/5 rounded-xl bg-[#09090b] overflow-hidden">
          <div className="px-4.5 py-3.5 border-b border-white/5 flex items-center justify-between bg-[#0e0e11]/20">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white">Recent Tickets</span>
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">8 Shown</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#0e0e11]/40">
                  <th className="px-4.5 py-2 text-left text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4.5 py-2 text-left text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4.5 py-2 text-left text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="px-4.5 py-2 text-left text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    email: "xyz@gmail.com",
                    subject: "I have a problem how can I get refund for a da...",
                    status: "RESOLVED",
                    date: "May 4, 2026",
                    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    dotColor: "bg-emerald-400",
                  },
                  {
                    email: "subham@1234gmail.com",
                    subject: "i have paid for my product but the payment wa...",
                    status: "RESOLVED",
                    date: "May 3, 2026",
                    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    dotColor: "bg-emerald-400",
                  },
                  {
                    email: "xyz@abc.com",
                    subject: "i have paid for my product and balanc is deduc...",
                    status: "RESOLVED",
                    date: "May 3, 2026",
                    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    dotColor: "bg-emerald-400",
                  },
                  {
                    email: "abc@cd.com",
                    subject: "can u directly raise the ticket",
                    status: "ASSIGNED",
                    date: "May 1, 2026",
                    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    dotColor: "bg-blue-400",
                  },
                  {
                    email: "abc@cd.com",
                    subject: "Can you look up the profile for user ID 4?",
                    status: "OPEN",
                    date: "May 1, 2026",
                    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    dotColor: "bg-amber-400",
                  },
                  {
                    email: "hello@test.com",
                    subject: "Can you look up the profile for user ID 4?",
                    status: "OPEN",
                    date: "May 1, 2026",
                    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    dotColor: "bg-amber-400",
                  },
                ].map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="px-4.5 py-2.5 text-[9.5px] text-white font-medium truncate max-w-[120px]">
                      {row.email}
                    </td>
                    <td className="px-4.5 py-2.5 text-[9.5px] text-zinc-400 truncate max-w-[200px]">
                      {row.subject}
                    </td>
                    <td className="px-4.5 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-wider border ${row.color}`}>
                        <span className={`w-1 h-1 rounded-full ${row.dotColor}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4.5 py-2.5 text-[9.5px] text-zinc-500 font-medium">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Bento Grid Features Data ─── */
const bentoFeatures = [
  {
    colSpan: "lg:col-span-2",
    tag: "AI Deflection Engine",
    title: "AI-First Ticket Deflection",
    body: "SupportDesk interprets incoming tickets, matches queries against your indexed schema vectors, and drafts instant resolutions without human intervention.",
    ui: <TicketUI />,
    bullets: ["Direct index queries", "Contextual drafting"]
  },
  {
    colSpan: "lg:col-span-1",
    tag: "Interface",
    title: "Embeddable Chat",
    body: "A glassmorphic widget designed to match your product. Ingests user input and streams instant replies.",
    ui: <WidgetUI />,
    bullets: ["Zero lag stream", "Responsive wrapper"]
  },
  {
    colSpan: "lg:col-span-1",
    tag: "Security Protocols",
    title: "Isolated Tenancy",
    body: "Each client instance is strictly isolated cryptographically. Safe for enterprises and agencies.",
    ui: <MultiTenantUI />,
    bullets: ["Isolated workspaces", "Strict access rules"]
  },
  {
    colSpan: "lg:col-span-2",
    tag: "Team Management",
    title: "Team & Agent Management",
    body: "Manage team permissions, authorize agent registrations, and update roles securely under Workspace boundaries.",
    ui: <AgentUI />,
    bullets: ["Approved & pending states", "Admin promotion actions"]
  },
  {
    colSpan: "lg:col-span-1",
    tag: "Knowledge Retrieval",
    title: "Knowledge Retrieval",
    body: "Ingest PDFs, markdown, or site URLs directly into a pinecone database.",
    ui: <ContextUI />,
    bullets: ["Instant vector sync", "Multi-file uploads"]
  },
  {
    colSpan: "lg:col-span-2",
    tag: "Ticket Detail",
    title: "Context-Aware Conversations",
    body: "Drill down into individual tickets to view complete customer-AI transcripts, collaborate, and trigger quick actions.",
    ui: <TicketDetailUI />,
    bullets: ["AI context handoff", "Quick actions panel"]
  }
];

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [passedHero, setPassedHero] = useState(false);
  const [tempExpanded, setTempExpanded] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 20);
      setPassedHero(scrollPos > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTempExpand = () => {
    setTempExpanded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTempExpanded(false);
      setOpen(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    if (passedHero && tempExpanded) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTempExpanded(false);
        setOpen(false);
      }, 5000);
    }
  };

  const isCollapsed = passedHero && !tempExpanded;

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      
      {/* ─── Geometric Grid Layout Lines ─── */}
      <div className="absolute inset-y-0 left-6 lg:left-24 w-px bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 right-6 lg:right-24 w-px bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.01] pointer-events-none hidden md:block" />

      {/* ─── Radial Ambient Background Mask ─── */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[120px] pointer-events-none -z-10" />

      {/* ─── Floating Island Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 flex justify-center pointer-events-none">
        <motion.div
          layout
          initial={false}
          animate={{
            width: isCollapsed ? "48px" : "100%",
            height: isCollapsed ? "48px" : "56px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          onClick={isCollapsed ? handleTempExpand : undefined}
          onMouseEnter={!isCollapsed ? handleMouseEnter : undefined}
          onMouseLeave={!isCollapsed ? handleMouseLeave : undefined}
          className={`pointer-events-auto mx-auto flex items-center justify-between border transition-all duration-300 rounded-full overflow-hidden ${
            isCollapsed
              ? "bg-white/[0.08] backdrop-blur-lg border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] justify-center cursor-pointer hover:bg-white/[0.15] hover:border-white/30"
              : scrolled
                ? "bg-white/[0.04] backdrop-blur-lg border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] px-6 max-w-7xl"
                : "bg-white/[0.02] backdrop-blur-md border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.02)] px-6 max-w-7xl"
          }`}
        >
          {isCollapsed ? (
            <motion.div
              key="collapsed-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 flex items-center justify-center text-white"
            >
              <Menu size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex items-center justify-between w-full h-full"
            >
              <div className="flex items-center gap-2 select-none">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Zap className="w-3.5 h-3.5 text-black" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white">SupportDesk</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-8 text-[12.5px] font-bold text-white/50">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">Setup Flow</a>
                <button onClick={() => navigate("/docs")} className="hover:text-white transition-colors cursor-pointer">Documentation</button>
              </nav>

              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => navigate("/auth")} className="px-4 py-2 text-[12.5px] font-bold text-white/50 hover:text-white transition-all cursor-pointer">Sign In</button>
                <button onClick={() => navigate("/auth")} className="px-5 py-2 bg-white text-black text-[12px] font-bold uppercase tracking-wider rounded-full hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer">Get Started</button>
              </div>

              <button className="md:hidden p-1.5 rounded-full hover:bg-white/5 transition-colors" onClick={() => setOpen(!open)}>
                {open ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile Navigation Drawer */}
        {open && !isCollapsed && (
          <div className="absolute top-[80px] left-6 right-6 bg-[#09090b]/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl md:hidden flex flex-col gap-4 pointer-events-auto">
            <div className="flex flex-col gap-3 text-sm font-bold text-white">
              <a href="#features" onClick={() => setOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-white/5">Features</a>
              <a href="#how-it-works" onClick={() => setOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-white/5">Setup Flow</a>
              <button onClick={() => { navigate("/docs"); setOpen(false); }} className="text-left px-2 py-1.5 rounded-lg hover:bg-white/5">Documentation</button>
            </div>
            <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
              <button onClick={() => navigate("/auth")} className="text-center font-bold text-white/60 py-2 rounded-lg hover:bg-white/5">Sign In</button>
              <button onClick={() => navigate("/auth")} className="bg-white text-black py-2.5 rounded-full font-bold uppercase tracking-wider text-xs">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-10 md:pt-24 pb-20 px-6 md:px-12 text-center">
        <div className="relative max-w-7xl mx-auto flex flex-col items-center">
          
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono tracking-widest uppercase text-white/70 mb-5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Secure Tenant Engine v2.0
            </div>
          </Reveal>
          
          <Reveal delay={0.07}>
            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.96] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-4 max-w-4xl mx-auto">
              Automate support. <br />
              Zero trade-offs.
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-base md:text-lg text-white/50 leading-relaxed mb-6 max-w-xl mx-auto">
              Deploy an autonomous AI support agent that operates directly on your custom docs. Resolve up to 80% of tickets instantly, routing the rest with complete transcripts.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button onClick={() => navigate("/auth")} className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-[12px] uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
                Start Free <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <button onClick={() => navigate("/docs")} className="px-8 py-4 bg-transparent text-white border border-white/10 rounded-full font-bold text-[12px] uppercase tracking-wider hover:bg-white/[0.03] hover:border-white/20 active:scale-[0.98] transition-all cursor-pointer">
                View Docs
              </button>
            </div>
          </Reveal>

          {/* Centered Hero Mockup with Glass Frame */}
          <Reveal direction="up" delay={0.28} className="w-full max-w-[1180px] min-w-0">
            <div className="relative p-2 rounded-2xl border border-white/5 bg-white/[0.01] shadow-2xl">
              <ScreenMockup>
                <HeroUI />
              </ScreenMockup>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Metric Counter Band ─── */}
      <section className="border-y border-white/5 bg-neutral-950/30 backdrop-blur-sm py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { to: 80, suffix: "%", label: "Deflection rate" },
            { value: "0.8s", label: "Instant response" },
            { to: 3, suffix: "x", label: "Team efficiency" },
            { to: 65, suffix: "%", label: "Cost reduction" },
          ].map(({ to, value, suffix, label }) => (
            <Reveal key={label}>
              <div className="text-3xl md:text-5xl font-black tracking-tight text-white">
                {value ?? <Counter to={to} suffix={suffix} />}
              </div>
              <div className="text-[9.5px] text-white/40 mt-2.5 font-bold uppercase tracking-widest font-mono">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Bento Grid Features Section ─── */}
      <section id="features" className="py-28 md:py-40 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-24 max-w-xl mx-auto">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 font-mono">Bento Architecture</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Engineered for scale.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.05} className={`${feat.colSpan} flex flex-col`}>
                <div className="group border border-white/5 bg-neutral-900/20 rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between hover:border-white/10 hover:bg-neutral-900/35 transition-all duration-300 h-full">
                  
                  {/* Top copy */}
                  <div className="mb-8">
                    <span className="text-[8.5px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2 select-none">
                      [ {feat.tag} ]
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">{feat.title}</h3>
                    <p className="text-white/50 text-[12.5px] leading-relaxed font-medium mb-4">{feat.body}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {feat.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-1.5 text-[10px] font-bold text-white/70 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UI Preview Screen */}
                  <div className="w-full mt-auto">
                    <ScreenMockup>
                      {feat.ui}
                    </ScreenMockup>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Setup Onboarding Steps ─── */}
      <section id="how-it-works" className="py-24 md:py-36 px-6 md:px-12 border-t border-white/5 relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24 max-w-xl mx-auto">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 font-mono">Onboarding Flow</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Active in 10 minutes.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Claim Workspace Slug", body: "Register and spawn a secure database instance isolated for your team's specific customer data." },
              { step: "02", title: "Train Vector Index", body: "Feed FAQs, knowledge manuals, site urls, or transcripts directly into our embedding parser pipeline." },
              { step: "03", title: "Embed Interface widget", body: "Deploy a highly optimized chat wrapper interface onto any page using a single lightweight script tag." },
              { step: "04", title: "Connect API Operations", body: "Optionally link backoffice keys to authorize the AI agent to run order lookups or key updates safely." },
              { step: "05", title: "Define Escalation Rules", body: "Determine routing queues and agent permissions so the AI transfers complex issues to humans." },
              { step: "06", title: "Track Deflection Margin", body: "Audit deflection rate graphs, satisfaction index reports, and system response statistics live." },
            ].map(({ step, title, body }, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <div className="p-8 border border-white/5 bg-white/[0.01] rounded-xl hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-[2.2rem] font-mono font-bold text-white/20 mb-4 tracking-tighter">{step}</div>
                    <h3 className="font-bold text-[15px] mb-2 text-white">{title}</h3>
                    <p className="text-white/50 text-[12.5px] leading-relaxed font-medium">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Absolute Metric Highlights ─── */}
      <section className="py-24 md:py-36 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 font-mono">Performance Auditing</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Proven support metrics.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "2/3 Overhead Cut", desc: "Teams scale down support workloads post-deployment by automating repetitive tier-1 issues." },
              { stat: "24/7 Autopilot Coverage", desc: "AI agents answer customer concerns overnight, across global time zones, instantly." },
              { stat: "Hallucination Control", desc: "Strict context boundary vector indexes prevent the AI from fabricating pricing or service rules." },
            ].map(({ stat, desc }, i) => (
              <Reveal key={stat} delay={i * 0.06}>
                <div className="bg-white/[0.01] border border-white/5 p-8 rounded-xl flex flex-col justify-between h-full hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
                  <div>
                    <p className="text-xl md:text-2xl font-black tracking-tight text-white mb-3">{stat}</p>
                    <p className="text-white/50 text-[12.5px] leading-relaxed font-semibold">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to Action (CTA) ─── */}
      <section className="py-36 px-6 md:px-12 text-center border-t border-white/5 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-10" />

        <div className="relative max-w-xl mx-auto z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-[-0.04em] mb-5 text-white leading-none">
              Deploy now.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm text-white/45 mb-10 max-w-sm mx-auto font-medium">
              Start building your workspace in under 10 minutes. No credit card required.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate("/auth")} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-[12px] uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
                Get Started Free <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <button onClick={() => navigate("/docs")} className="px-8 py-4 text-white font-bold text-[12px] uppercase tracking-wider hover:text-white/80 transition-colors cursor-pointer">
                Documentation &rarr;
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-6 md:px-12 py-16 border-t border-white/5 bg-black relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-white/40">
          <div className="flex items-center gap-2 font-bold text-white select-none opacity-100">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <Zap className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-white font-bold">SupportDesk</span>
          </div>
          <p className="font-semibold text-white/40">&copy; {new Date().getFullYear()} SupportDesk Inc. All rights reserved.</p>
          <div className="flex gap-6 font-bold text-white/40">
            <button onClick={() => navigate("/docs")} className="hover:text-white transition-all cursor-pointer">Docs</button>
            <button onClick={() => navigate("/auth")} className="hover:text-white transition-all cursor-pointer">Sign In</button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
