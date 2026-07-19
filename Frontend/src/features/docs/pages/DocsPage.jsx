import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Bot, BookOpen, Terminal, Code2, Zap, Settings, Users,
  ChevronRight, Copy, Check, MessageSquare, ShieldCheck, BarChart2, Globe,
  Filter, Search, Repeat, CheckCircle2, IdCard, Palette, Plus, Edit2, Trash2, Lightbulb, PenTool,
  Paperclip,
  RefreshCcw
} from "lucide-react";

/* ─── Design Read: Documentation page for technical developers, with an obsidian editorial dark mode language, leaning toward Nocturnal Atelier. ─── */
/* DESIGN_VARIANCE: 6 | MOTION_INTENSITY: 5 | VISUAL_DENSITY: 4 */

const CodeBlock = ({ code, language = "html" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/60 border-b border-white/5">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">{language}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-wider cursor-pointer">
          {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="bg-[#050507] text-[#e4e4e7] p-5 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const sections = [
  {
    id: "overview", label: "Overview", icon: <BookOpen className="w-4 h-4" />,
    subsections: []
  },
  {
    id: "getting-started", label: "Getting Started", icon: <Zap className="w-4 h-4" />,
    subsections: ["Create Your Account", "Set Up AI Context", "Invite Agents"]
  },
  {
    id: "chat-widget", label: "Chat Widget", icon: <MessageSquare className="w-4 h-4" />,
    subsections: ["Installation", "Configuration Options", "Customization"]
  },
  {
    id: "external-apis", label: "External API Integration", icon: <Code2 className="w-4 h-4" />,
    subsections: ["How It Works", "Registering an Endpoint", "API Schema Guide", "Security & Keys"]
  },
  {
    id: "tickets", label: "Tickets & Escalation", icon: <ShieldCheck className="w-4 h-4" />,
    subsections: []
  },
  {
    id: "dashboard", label: "Admin Dashboard", icon: <BarChart2 className="w-4 h-4" />,
    subsections: ["Overview Page", "Tickets", "Agents", "Widgets", "AI Context", "Integrations", "Settings"]
  },
  {
    id: "human-agents", label: "Human Agents", icon: <Users className="w-4 h-4" />,
    subsections: ["Agent Dashboard", "AI Reply Suggestions", "Ticket Actions", "Chat Interface"]
  },
  {
    id: "multi-tenant", label: "Multi-Tenant Setup", icon: <Users className="w-4 h-4" />,
    subsections: []
  },
];

const DocsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="h-screen flex flex-col bg-[#030303] text-white font-sans selection:bg-white selection:text-black overflow-hidden relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.01] blur-[120px] pointer-events-none -z-10" />

      {/* ─── Header ─── */}
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-white/5 bg-black/40 backdrop-blur-md z-20">
        
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-95 cursor-pointer text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Logo + Title */}
          <div className="flex items-center gap-2 font-bold text-white tracking-tight truncate select-none">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>

            <span className="truncate text-sm md:text-base text-white font-bold tracking-tight">
              SupportDesk
              <span className="hidden sm:inline text-zinc-600 font-normal">
                {" "} / Docs
              </span>
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden md:block text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
            v2.0 Stable
          </span>

          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
          >
            <span className="hidden sm:inline">Go to Dashboard →</span>
            <span className="sm:hidden">Dashboard</span>
          </button>
        </div>
      </header>

      {/* ─── Body: Sidebar + Content ─── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── Sidebar (fixed height, scrollable internally) ─── */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-white/5 bg-neutral-950/20 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          <div className="p-5 pb-3">
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-600 mb-4 select-none">Documentation</p>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <div key={sec.id}>
                  <button
                    onClick={() => {
                      setActiveSection(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all text-left cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-white/5 text-white border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <span className="opacity-60">{sec.icon}</span>
                    <span className="truncate">{sec.label}</span>
                    {sec.subsections.length > 0 && <ChevronRight className="w-3 h-3 ml-auto opacity-40" />}
                  </button>
                  {activeSection === sec.id && sec.subsections.length > 0 && (
                    <div className="ml-8 mt-1.5 space-y-1 border-l border-white/5 pl-2">
                      {sec.subsections.map((sub) => (
                        <a
                          key={sub}
                          href={`#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block text-[11px] text-zinc-500 hover:text-white py-1 transition-colors font-medium"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* ─── Main Content (scrollable) ─── */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent bg-[#030303]">
          <div className="max-w-3xl mx-auto px-8 py-12">

            {/* ── Overview ── */}
            <section id="overview" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono font-bold text-zinc-400 border border-white/10 uppercase tracking-widest mb-6">
                <BookOpen className="w-3.5 h-3.5" /> Introduction
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-white">Welcome to SupportDesk</h1>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                SupportDesk is a multi-tenant AI customer support platform that lets you deploy an AI agent on any website, resolve the majority of customer queries without human intervention, and seamlessly escalate complex cases to real agents — with full context.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: <MessageSquare className="w-4 h-4 text-white" />, label: "Embeddable Widget", desc: "Drop a script tag anywhere" },
                  { icon: <Globe className="w-4 h-4 text-white" />, label: "External APIs", desc: "Let AI take real actions" },
                  { icon: <Users className="w-4 h-4 text-white" />, label: "Human Escalation", desc: "Context-aware hand-offs" },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="border border-white/5 rounded-xl p-5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
                    <div className="text-white mb-3 bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10">{icon}</div>
                    <p className="font-bold text-xs text-white mb-1.5 uppercase tracking-wider">{label}</p>
                    <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Getting Started ── */}
            <section id="getting-started" className="mb-20">
              <h2 className="text-2xl font-black tracking-tight mb-2 text-white" id="getting-started">Getting Started</h2>
              <p className="text-xs md:text-sm text-zinc-500 mb-8">Get your AI support system running in under 10 minutes.</p>
              <div className="space-y-4">
                {[
                  {
                    n: "1", id: "create-your-account", title: "Create Your Account",
                    body: "Visit the Sign In page and register your company. You'll choose a unique slug (e.g. your-company) that becomes your tenant identifier and forms the base of your dashboard URL."
                  },
                  {
                    n: "2", id: "set-up-ai-context", title: "Set Up AI Context",
                    body: "Go to AI Context in your dashboard. Paste in your FAQs, policy documents, product descriptions, or any text that helps the AI understand your business. The AI uses this as its knowledge base when responding to users."
                  },
                  {
                    n: "3", id: "invite-agents", title: "Invite Agents",
                    body: "Head to the Agents section to invite your support staff. Assign roles (Admin or Agent). Agents receive tickets that the AI escalates, see the full chat history, and can reply directly from the dashboard."
                  },
                ].map(({ n, id, title, body }) => (
                  <div key={n} id={id} className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
                    <div className="shrink-0 w-9 h-9 bg-white text-black rounded-full flex items-center justify-center text-sm font-black shadow-md">{n}</div>
                    <div>
                      <h3 className="font-bold text-sm text-white mb-1.5 uppercase tracking-wider">{title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Chat Widget ── */}
            <section id="chat-widget" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono font-bold text-zinc-400 border border-white/10 uppercase tracking-widest mb-6">
                <MessageSquare className="w-3.5 h-3.5" /> Integration
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">Embeddable Chat Widget</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-8 leading-relaxed">
                The SupportDesk widget is a lightweight JavaScript snippet you add to any website. It renders a floating chat button that opens a full AI-powered support chat — no backend changes needed on your end.
              </p>

              <div id="installation" className="mt-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Installation</h3>
                <p className="text-xs text-zinc-500 mb-4">Add the following snippet just before the closing <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1.5 py-0.5 rounded text-[11px]">&lt;/body&gt;</code> tag of your HTML page:</p>
                <CodeBlock language="html" code={`<!-- SupportDesk Chat Widget -->
<script src="http://our-domain/widget.js" data-api-key="your-api-key" id="support-desk-widget"></script>
<!-- End SupportDesk Chat Widget -->`} />
              </div>

              <div className="p-5 bg-amber-500/5 border border-amber-500/25 rounded-xl mt-4 mb-8">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Where to find your Tenant ID
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">Go to your <strong className="text-zinc-200">Dashboard → Settings → Integration</strong>. Your <code className="font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1 py-0.5 rounded text-[10px]">tenantId</code> is the unique identifier for your workspace. Never share this publicly as it links the widget to your tenant's AI and agent queue.</p>
              </div>

              <div id="configuration-options" className="mt-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Configuration Options</h3>
                <div className="border border-white/5 rounded-xl overflow-hidden bg-neutral-950/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                          <th className="px-5 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Option</th>
                          <th className="px-5 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Type</th>
                          <th className="px-5 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Required</th>
                          <th className="px-5 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          { opt: "tenantId", type: "string", req: "Yes", desc: "Your unique workspace identifier. (Gets auto submitted by us)" },
                          { opt: "primaryColor", type: "string", req: "No", desc: "Hex color for the widget button and header." },
                          { opt: "position", type: "string", req: "No", desc: '"bottom-right" or "bottom-left". Defaults to bottom-right.' },
                          { opt: "greeting", type: "string", req: "No", desc: "The first message displayed to users when they open the chat." },
                        ].map(({ opt, type, req, desc }) => (
                          <tr key={opt} className="hover:bg-white/[0.005]">
                            <td className="px-5 py-3.5 font-mono text-[11px] text-white font-semibold">{opt}</td>
                            <td className="px-5 py-3.5 text-zinc-500 font-mono text-[11px]">{type}</td>
                            <td className="px-5 py-3.5">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                req === "Yes" ? "bg-white text-black" : "bg-white/5 text-zinc-500 border border-white/5"
                              }`}>{req}</span>
                            </td>
                            <td className="px-5 py-3.5 text-zinc-400 text-xs leading-normal">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* ── External APIs ── */}
            <section id="external-apis" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono font-bold text-zinc-400 border border-white/10 uppercase tracking-widest mb-6">
                <Code2 className="w-3.5 h-3.5" /> Advanced Integration
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">External API Integration</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-8 leading-relaxed">
                This is SupportDesk's most powerful feature. Instead of just answering questions, the AI can <strong className="text-white">take actions</strong> by calling your existing backend APIs — like checking an order status, looking up account details, or initiating a return.
              </p>

              <div id="how-it-works">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 mt-8">How It Works</h3>
                <div className="space-y-3 mb-6">
                  {[
                    'User asks: "What\'s the status of my order #12345?"',
                    "The AI matches this intent to your registered Order Status API.",
                    "SupportDesk securely calls your endpoint with the extracted parameters.",
                    "Your API returns a response (e.g., JSON with order details).",
                    "The AI reads the response and answers the user in natural language.",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="registering-an-endpoint" className="mt-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Walkthrough: Filling the Integration Form</h3>
                <p className="text-xs text-zinc-500 mb-6">
                  Go to <strong className="text-zinc-300">Dashboard → Settings → Integrations → Add Integration</strong>. Below is a complete, real-world example — a <em className="text-zinc-300">Customer Lookup Service</em> — that shows you exactly what to type into every field.
                </p>

                {/* ── Example scenario callout ── */}
                <div className="p-5 border-l-2 border-white/20 bg-white/[0.01] rounded-r-xl mb-8">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1">Example scenario</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    You want the AI to look up a customer's profile from your backend when a user says
                    something like <em className="text-zinc-300">"What account details do you have for me?"</em> or <em className="text-zinc-300">"Can you check my profile?"</em>.
                    Your backend exposes a GET endpoint: <code className="font-mono bg-white/5 border border-white/5 px-1.5 py-0.5 rounded text-zinc-300 text-[11px]">https://api.yourstore.com/users/:id</code>
                  </p>
                </div>

                {/* ── Field-by-field form guide ── */}
                <div className="space-y-5">

                  {/* Name */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] border-b border-white/5">
                      <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Name</p>
                      <span className="ml-auto text-[9px] font-bold text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Required</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs text-zinc-400 mb-3">A short, descriptive label for this integration. This is just for your reference in the dashboard.</p>
                      <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                        <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Enter value →</span>
                        <code className="font-mono text-white font-semibold">Customer Lookup Service</code>
                      </div>
                    </div>
                  </div>

                  {/* Base URL */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] border-b border-white/5">
                      <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Base URL</p>
                      <span className="ml-auto text-[9px] font-bold text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Required</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs text-zinc-400 mb-3">The root URL of your API. Do <strong className="text-zinc-200">not</strong> include the path here — you will define that per endpoint below.</p>
                      <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                        <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Enter value →</span>
                        <code className="font-mono text-white font-semibold">https://api.yourstore.com</code>
                      </div>
                    </div>
                  </div>

                  {/* Auth Type */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] border-b border-white/5">
                      <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Authentication → Auth Type</p>
                      <span className="ml-auto text-[9px] font-bold text-zinc-500 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Optional</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs text-zinc-400 mb-3">
                        Select how your API is secured. SupportDesk will automatically attach the correct auth header on every call.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {[
                          { label: "None", desc: "Your API is public or IP-whitelisted. No credentials needed." },
                          { label: "Bearer Token", desc: "Most common. Attach a JWT or API token in the Authorization header." },
                          { label: "API Key", desc: "Send a key via a custom header (e.g., X-API-Key)." },
                        ].map(({ label, desc }) => (
                          <div key={label} className="p-3.5 border border-white/5 bg-white/[0.005] rounded-xl text-[11px]">
                            <p className="font-bold text-white mb-1.5 uppercase tracking-wide">{label}</p>
                            <p className="text-zinc-500 leading-normal">{desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                        <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Example →</span>
                        <code className="font-mono text-white font-semibold">Bearer Token</code>
                        <span className="ml-2 text-zinc-500 text-[11px]">then paste your token in the Token field that appears</span>
                      </div>
                    </div>
                  </div>

                  {/* Endpoints / Tools */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] border-b border-white/5">
                      <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black shrink-0">4</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Endpoints (Tools) — Add Endpoint</p>
                      <span className="ml-auto text-[9px] font-bold text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Required</span>
                    </div>
                    <div className="px-5 py-4 space-y-5">
                      <p className="text-xs text-zinc-400">
                        Click <strong className="text-zinc-200">+ Add Endpoint</strong>. Each endpoint becomes an <em className="text-zinc-300">AI tool</em> — a specific action the AI can take. Fill in these sub-fields:
                      </p>

                      {/* Sub-fields */}
                      <div className="space-y-4 pl-4 border-l border-white/10">

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Tool Name (Unique)</p>
                          <p className="text-[11px] text-zinc-500 mb-2">A unique machine-readable identifier for this tool. Use camelCase, no spaces. The AI uses this name internally.</p>
                          <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Enter →</span>
                            <code className="font-mono text-white font-semibold">getUserProfile</code>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Method</p>
                          <p className="text-[11px] text-zinc-500 mb-2">The HTTP method for this specific endpoint. Use <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1 rounded text-[10px]">GET</code> for read-only lookups (preferred). Use <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1 rounded text-[10px]">POST</code> for actions that create or modify data.</p>
                          <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Select →</span>
                            <code className="font-mono text-white font-semibold">GET</code>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Path</p>
                          <p className="text-[11px] text-zinc-500 mb-2">
                            The URL path appended to your Base URL. Use <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1 rounded text-[10px]">:paramName</code> as a placeholder for dynamic values — the AI will fill these in from the conversation.
                          </p>
                          <div className="flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider shrink-0">Enter →</span>
                            <code className="font-mono text-white font-semibold">/users/:id</code>
                          </div>
                          <p className="text-[10px] text-zinc-600 mt-1.5">The full URL called will be: <code className="font-mono">https://api.yourstore.com/users/42</code></p>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Description for AI</p>
                          <p className="text-[11px] text-zinc-500 mb-2">
                            This is the most important field. Write a clear sentence telling the AI <em className="text-zinc-300">when</em> to use this tool and <em className="text-zinc-300">what information</em> it should look for in the conversation. The AI decides whether to call this API purely based on what you write here.
                          </p>
                          <div className="p-3 border border-white/5 rounded-xl bg-black/40 text-xs">
                            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider block mb-1.5">Enter →</span>
                            <code className="font-mono text-zinc-300 text-[11px] leading-relaxed">
                              Use this tool to look up a customer's profile, including their name, email, phone number, and company details when you are provided with a user ID.
                            </code>
                          </div>
                          <div className="mt-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                            <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Tips for a good description</p>
                            <ul className="text-[11px] text-zinc-400 space-y-1.5 list-disc list-inside">
                              <li>Mention what the user might say to trigger this (e.g., "asks about their profile")</li>
                              <li>Specify what data is returned so the AI can summarize it correctly</li>
                              <li>Mention any prerequisite info (e.g., "when you are provided with a user ID")</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Parameters</p>
                          <p className="text-[11px] text-zinc-500 mb-2">
                            Click <strong className="text-zinc-200">+ Add Param</strong> for each value the AI needs to extract from the conversation and pass to your API. Set a name, type, and whether it is required.
                          </p>
                          <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
                            <div className="grid grid-cols-3 gap-0 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-4 py-2 bg-white/[0.01] border-b border-white/5">
                              <span>Parameter Name</span>
                              <span>Type</span>
                              <span>Required?</span>
                            </div>
                            <div className="grid grid-cols-3 gap-0 px-4 py-3 text-xs items-center">
                              <code className="font-mono font-bold text-white">id</code>
                              <span className="text-zinc-400 font-medium">Number</span>
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-fit">✓ Req.</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-zinc-600 mt-1.5">The AI will extract the user ID from the chat message and pass it as <code className="font-mono">id</code>.</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Save */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] border-b border-white/5">
                      <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black shrink-0">5</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Save Integrations</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Once all fields are filled, click the <strong className="text-zinc-200">Save Integrations</strong> button at the bottom right. The AI will immediately begin using this tool when a relevant user query is detected.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div id="api-schema-guide" className="mt-12">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">What the completed integration looks like</h3>
                <p className="text-xs text-zinc-500 mb-1">Here's a summary of the full integration we just configured:</p>
                <CodeBlock language="json" code={`{
  "name": "Customer Lookup Service",
  "baseUrl": "https://api.yourstore.com",
  "authType": "Bearer Token",
  "endpoints": [
    {
      "toolName": "getUserProfile",
      "method": "GET",
      "path": "/users/:id",
      "descriptionForAI": "Use this tool to look up a customer's profile, including their name, email, phone number, and company details when you are provided with a user ID.",
      "parameters": [
        { "name": "id", "type": "Number", "required": true }
      ]
    }
  ]
}`} />
                <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">When a user says <em className="text-zinc-300">"What's my profile info? My ID is 42"</em> — the AI calls <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1 py-0.5 rounded text-[10px]">GET https://api.yourstore.com/users/42</code> and replies in plain English with the result.</p>
              </div>

              <div id="security-and-keys" className="mt-12">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Security & API Keys</h3>
                <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl shadow-xl">
                  <p className="font-bold text-xs uppercase tracking-wider text-white mb-4">How we protect your credentials</p>
                  <ul className="space-y-3 text-xs text-zinc-400">
                    <li className="flex items-start gap-2.5"><span className="text-emerald-400 mt-0.5">✓</span> API keys and Bearer tokens are encrypted using AES-256 before being stored.</li>
                    <li className="flex items-start gap-2.5"><span className="text-emerald-400 mt-0.5">✓</span> Keys are decrypted only at request time and never logged or exposed to the frontend.</li>
                    <li className="flex items-start gap-2.5"><span className="text-emerald-400 mt-0.5">✓</span> All outbound API calls are made from our secure backend, never from the user's browser.</li>
                    <li className="flex items-start gap-2.5"><span className="text-emerald-400 mt-0.5">✓</span> You can revoke or rotate a key at any time from the Integrations dashboard.</li>
                  </ul>
                </div>

                <p className="text-xs text-zinc-500 mt-6 mb-1">Example outbound request your server will receive:</p>
                <CodeBlock language="http" code={`POST /api/v1/orders/status HTTP/1.1
Host: api.yourstore.com
Authorization: Bearer <your-decrypted-api-key>
Content-Type: application/json
X-SupportDesk-Tenant: your-tenant-id

{
  "orderId": "ORD-12345",
  "customerEmail": "user@example.com"
}`} />
              </div>
            </section>

            {/* ── Tickets ── */}
            <section id="tickets" className="mb-20">
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">Tickets & Human Escalation</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-6 leading-relaxed">
                When the AI cannot resolve a query — either because it's too complex or explicitly requested by the user — it creates a support ticket and assigns it to an available human agent based on their current workload (capacity &lt; 5 open tickets).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Automatic Assignment", body: "Tickets are routed to the agent with the fewest open tickets. If no agent is available, the ticket enters a waiting queue." },
                  { title: "Full Chat Context", body: "Agents see the entire conversation the user had with the AI before escalation — no need to start over." },
                  { title: "Manual Reassignment", body: "Admins can reassign any open ticket to a specific agent from the Tickets dashboard." },
                  { title: "Status Tracking", body: "Each ticket moves through Open → In Progress → Resolved. Users are informed of status changes in the widget." },
                ].map(({ title, body }) => (
                  <div key={title} className="p-5 border border-white/5 rounded-xl bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300">
                    <p className="font-bold text-xs text-white mb-2 uppercase tracking-wider">{title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Dashboard ── */}
            <section id="dashboard" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono font-bold text-zinc-400 border border-white/10 uppercase tracking-widest mb-6">
                <BarChart2 className="w-3.5 h-3.5" /> For Admins
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">Admin Dashboard</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-8 leading-relaxed">
                The admin dashboard is your command center. As an Admin, you control every part of the support system — from onboarding agents and training the AI, to managing integrations and monitoring performance in real time.
              </p>

              <div className="space-y-6">

                {/* Overview */}
                <div id="overview-page" className="border border-white/10 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/5 border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <BarChart2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Overview Page</p>
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-white text-black px-2.5 py-0.5 rounded-full">Home</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      The first screen you see after logging in. It gives you an at-a-glance view of your entire support operation — no drilling required.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Total Tickets", desc: "Cumulative count of all tickets created in your workspace." },
                        { label: "AI Resolution Rate", desc: "Percentage of tickets the AI resolved without human intervention." },
                        { label: "Open Tickets", desc: "Active tickets awaiting an agent reply or still in queue." },
                        { label: "Active Agents", desc: "Agents currently online and their current ticket workload." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-4 bg-white/[0.005] border border-white/5 rounded-xl">
                          <p className="font-bold text-xs text-white mb-1 uppercase tracking-wide">{label}</p>
                          <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tickets */}
                <div id="tickets-admin" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Tickets</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      A master list of every ticket across your workspace. Admins can see all tickets regardless of assignee, filter by status, and take action on any of them.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <Filter className="w-4 h-4 text-zinc-400" />, label: "Filter by status", desc: "View All, Open, In Progress, or Resolved tickets at a glance." },
                        { icon: <Search className="w-4 h-4 text-zinc-400" />, label: "Full conversation view", desc: "Click any ticket to see the complete AI + human chat thread." },
                        { icon: <Repeat className="w-4 h-4 text-zinc-400" />, label: "Manual reassignment", desc: "Drag or reassign any open ticket to a specific agent from this view." },
                        { icon: <CheckCircle2 className="w-4 h-4 text-zinc-400" />, label: "Bulk resolve", desc: "Close multiple tickets at once to keep your queue clean." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-white/5 rounded-xl bg-white/[0.005]">
                          <span className="shrink-0 mt-0.5 p-1 bg-white/5 rounded border border-white/10">{icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">{label}</p>
                            <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agents */}
                <div id="agents" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Agents</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Manage your human support team. Invite new members, assign roles, and monitor their current capacity.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Invite Agent", desc: "Send an email invite with a registration link scoped to your tenant." },
                        { label: "Set Role", desc: "Assign Admin (full access) or Agent (tickets only) roles per user." },
                        { label: "View Workload", desc: "See how many open tickets each agent currently has (max 5 before queue)." },
                        { label: "Remove Agent", desc: "Revoke access for any team member from the agents panel." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-white/[0.005] border border-white/5 rounded-xl">
                          <p className="font-bold text-xs text-white mb-1 uppercase tracking-wide">{label}</p>
                          <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                      <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Capacity rule</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">An agent can hold a maximum of 5 open tickets at a time. New tickets are automatically routed to the agent with the lowest current count. If all agents are at capacity, the ticket enters the waiting queue.</p>
                    </div>
                  </div>
                </div>

                {/* Widgets */}
                <div id="widgets" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Widgets</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Create and manage the embeddable chat widgets for your websites. Each widget is tied to your tenant and displays the unique API key you need to embed it.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <IdCard className="w-4 h-4 text-zinc-400" />, label: "Your API Key", desc: "Found here — copy it and use it as the data-api-key attribute in the widget script tag." },
                        { icon: <Palette className="w-4 h-4 text-zinc-400" />, label: "Widget config", desc: "Set the widget name and manage which site it belongs to." },
                        { icon: <Copy className="w-4 h-4 text-zinc-400" />, label: "Copy embed snippet", desc: "The dashboard shows you the exact script tag to paste into your website." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-white/5 rounded-xl bg-white/[0.005]">
                          <span className="shrink-0 mt-0.5 p-1 bg-white/5 rounded border border-white/10">{icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">{label}</p>
                            <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Context */}
                <div id="ai-context" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">AI Context</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      This is the brain of your AI. Upload, edit, and manage the knowledge base that the AI reads before every response. The more accurate and detailed your context, the better the AI performs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "FAQs", desc: "Common questions and answers about your product or service." },
                        { label: "Policies", desc: "Return, refund, shipping, or usage policies the AI should know." },
                        { label: "Product Info", desc: "Descriptions, pricing, and specs for your products or plans." },
                        { label: "Custom Instructions", desc: "Tone guidelines, escalation triggers, or anything else to shape AI behaviour." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-white/[0.005] border border-white/5 rounded-xl">
                          <p className="font-bold text-xs text-white mb-1 uppercase tracking-wide">{label}</p>
                          <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <p className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><PenTool className="w-3.5 h-3.5 text-zinc-400" /> Writing tip</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">Write context in clear, declarative sentences. Example: <em className="text-zinc-400">"Our refund policy allows returns within 30 days of purchase. No questions asked."</em> — the AI will use this verbatim when answering refund queries.</p>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div id="integrations" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Code2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Integrations</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Register your external APIs here so the AI can call them during a conversation. See the <a href="#external-apis" className="underline font-bold text-zinc-300 hover:text-white transition-colors">External API Integration</a> section for a full walkthrough.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <Plus className="w-4 h-4 text-zinc-400" />, label: "Add Integration", desc: "Register a new API with a Base URL, auth type, and one or more endpoint tools." },
                        { icon: <Edit2 className="w-4 h-4 text-zinc-400" />, label: "Edit / Update", desc: "Modify an existing integration's endpoint, schema, or API key at any time." },
                        { icon: <Trash2 className="w-4 h-4 text-zinc-400" />, label: "Remove", desc: "Delete an integration to immediately stop the AI from calling that endpoint." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-white/5 rounded-xl bg-white/[0.005]">
                          <span className="shrink-0 mt-0.5 p-1 bg-white/5 rounded border border-white/10">{icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">{label}</p>
                            <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div id="settings" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Settings</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Manage your workspace configuration. Changes here affect the entire tenant.
                    </p>
                    <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
                      <div className="grid grid-cols-2 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-4 py-2 bg-white/[0.01] border-b border-white/5">
                        <span>Setting</span>
                        <span>Description</span>
                      </div>
                      {[
                        { setting: "Company Name", desc: "The display name of your tenant shown in the dashboard." },
                        { setting: "Tenant Slug", desc: "Your unique URL identifier (e.g. /your-company/dashboard)." },
                        { setting: "Integration Keys", desc: "View and rotate the API key used by your embedded widgets." },
                        { setting: "Account Email", desc: "The admin email address tied to this workspace." },
                      ].map(({ setting, desc }, i) => (
                        <div key={setting} className={`grid grid-cols-2 px-4 py-3 text-xs border-b border-white/5 last:border-b-0 ${i % 2 !== 0 ? "bg-white/[0.005]" : ""}`}>
                          <span className="font-semibold text-zinc-200">{setting}</span>
                          <span className="text-zinc-500 text-xs leading-normal mt-0.5">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Human Agents ── */}
            <section id="human-agents" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono font-bold text-zinc-400 border border-white/10 uppercase tracking-widest mb-6">
                <Users className="w-3.5 h-3.5" /> For Agents
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">Human Agent Features</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-8 leading-relaxed">
                When the AI escalates a ticket, a human agent takes over. SupportDesk gives agents everything they need to resolve issues quickly — from a smart inbox to AI-powered reply drafts. Agents only see tickets assigned to their tenant.
              </p>

              {/* Feature Cards */}
              <div className="space-y-6">

                {/* AI Reply Suggestion — highlighted */}
                <div id="ai-reply-suggestions" className="border border-white/10 rounded-2xl overflow-hidden bg-neutral-950/20 shadow-[0_0_25px_rgba(255,255,255,0.02)]">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/5 border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">AI Reply Suggestion</p>
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-white text-black px-2.5 py-0.5 rounded-full">Flagship Feature</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-4">
                      When an agent opens an escalated ticket, SupportDesk automatically generates a suggested reply based on the full conversation history, the AI knowledge base, and the context of the user's issue. The agent can use it as-is, edit it, or discard it.
                    </p>
                    <div className="bg-white/[0.005] border border-white/5 rounded-xl p-4">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">How it works</p>
                      <div className="space-y-2">
                        {[
                          "The ticket arrives with the full AI chat transcript attached.",
                          "SupportDesk sends the conversation + your AI context to the LLM.",
                          "A draft reply is generated and pre-filled in the agent's response box.",
                          "The agent reviews, edits if needed, and hits Send — in seconds.",
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="shrink-0 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black mt-0.5">{i + 1}</span>
                            <p className="text-xs text-zinc-500 leading-relaxed pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Dashboard */}
                <div id="agent-dashboard" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <BarChart2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Agent Dashboard</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Each agent gets a personal view of their assigned tickets. The dashboard shows their current workload, ticket statuses at a glance, and highlights any tickets that have been waiting too long.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: "My Open Tickets", desc: "All tickets currently assigned to the agent, sorted by urgency." },
                        { label: "Ticket Queue", desc: "Tickets waiting for assignment when no agent had capacity." },
                        { label: "Resolved Today", desc: "A running count of tickets closed in the current session." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-white/[0.005] border border-white/5 rounded-xl">
                          <p className="font-bold text-xs text-white mb-1 uppercase tracking-wide">{label}</p>
                          <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div id="chat-interface" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Live Chat Interface</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Agents communicate with users through a real-time chat panel inside the ticket detail view. The interface shows the complete thread — including the AI's earlier responses — so agents never need to ask the user to repeat themselves.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <MessageSquare className="w-4 h-4 text-zinc-400" />, label: "Full AI transcript visible", desc: "Read the entire conversation the AI had before escalation." },
                        { icon: <Edit2 className="w-4 h-4 text-zinc-400" />, label: "AI-pre-filled reply box", desc: "The AI reply suggestion is loaded into the input — the agent just needs to review and send." },
                        { icon: <Paperclip className="w-4 h-4 text-zinc-400" />, label: "Ticket metadata sidebar", desc: "See user info, ticket creation time, and AI resolution attempts at a glance." },
                        { icon: <RefreshCcw className="w-4 h-4 text-zinc-400" />, label: "Real-time updates", desc: "Responses appear instantly for the user in the chat widget without page refresh." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-white/5 rounded-xl bg-white/[0.005]">
                          <span className="shrink-0 mt-0.5 p-1 bg-white/5 rounded border border-white/10">{icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">{label}</p>
                            <p className="text-[11px] text-zinc-500 leading-normal">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ticket Actions */}
                <div id="ticket-actions" className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-950/20">
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.01] border-b border-white/5">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Ticket Actions</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Agents have a set of actions available on every ticket to manage their workload efficiently.
                    </p>
                    <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
                      <div className="grid grid-cols-2 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-4 py-2 bg-white/[0.01] border-b border-white/5">
                        <span>Action</span>
                        <span>Who can do it</span>
                      </div>
                      {[
                        { action: "Reply to user", who: "Agent & Admin" },
                        { action: "Mark as Resolved", who: "Agent & Admin" },
                        { action: "Reopen ticket", who: "Agent & Admin" },
                        { action: "Reassign to another agent", who: "Admin only" },
                      ].map(({ action, who }, i) => (
                        <div key={action} className={`grid grid-cols-2 px-4 py-3 text-xs border-b border-white/5 last:border-b-0 ${i % 2 !== 0 ? "bg-white/[0.005]" : ""}`}>
                          <span className="font-semibold text-zinc-200">{action}</span>
                          <span className="text-zinc-500 text-xs font-semibold mt-0.5">{who}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Multi-Tenant ── */}
            <section id="multi-tenant" className="mb-20">
              <h2 className="text-2xl font-black tracking-tight mb-3 text-white">Multi-Tenant Setup</h2>
              <p className="text-xs md:text-sm text-zinc-400 mb-6 leading-relaxed">
                SupportDesk is built for agencies and SaaS businesses who serve multiple clients. Each tenant is a completely isolated workspace with its own agents, AI context, chat widgets, and API integrations.
              </p>
              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-xs text-zinc-400 leading-relaxed shadow-xl">
                <p className="font-bold text-xs uppercase tracking-wider text-white mb-2.5">Tenant URL Structure</p>
                <code className="font-mono text-xs bg-black/40 border border-white/5 text-zinc-200 px-3 py-2.5 rounded-lg block">
                  https://support-desk-one-lilac.vercel.app/<strong>:tenantSlug</strong>/dashboard
                </code>
                <p className="mt-4 leading-relaxed">Each client you onboard gets a unique <code className="font-mono bg-white/5 border border-white/5 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">tenantSlug</code> — everything in SupportDesk is scoped to this. Agents log in under their tenant and can only see that tenant's data.</p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
