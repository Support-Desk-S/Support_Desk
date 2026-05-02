import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Bot, BookOpen, Terminal, Code2, Zap, Settings, Users,
  ChevronRight, Copy, Check, MessageSquare, ShieldCheck, BarChart2, Globe,
  Filter, Search, Repeat, CheckCircle2, IdCard, Palette, Plus, Edit2, Trash2, Lightbulb, PenTool,
  Paperclip,
  RefreshCcw
} from "lucide-react";

const CodeBlock = ({ code, language = "html" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-black/10 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-black/[0.03] border-b border-black/8">
        <span className="text-xs font-mono font-semibold text-black/40 uppercase tracking-wider">{language}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors font-medium">
          {copied ? <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="bg-[#0C0C0C] text-[#E8E8E8] p-5 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
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
    <div className="h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden">

      {/* ─── Header ─── */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-black/10 bg-white z-20">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-black/5 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 text-black/50" />
          </button>
          <div className="flex items-center gap-2 font-bold text-black tracking-tight">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            SupportDesk <span className="text-black/30 font-normal">/ Docs</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-xs font-semibold text-black/30 uppercase tracking-widest">v1.0</span>
          <button onClick={() => navigate("/auth")} className="px-4 py-2 whitespace-nowrap bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-colors">
            Go to Dashboard →
          </button>
        </div>
      </header>

      {/* ─── Body: Sidebar + Content ─── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── Sidebar (fixed height, scrollable internally) ─── */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-black/8 overflow-y-auto">
          <div className="p-5 pb-3">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/30 mb-4">Navigation</p>
            <nav className="space-y-0.5">
              {sections.map((sec) => (
                <div key={sec.id}>
                  <button
                    onClick={() => {
                      setActiveSection(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                      activeSection === sec.id
                        ? "bg-black text-white"
                        : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    {sec.icon}
                    {sec.label}
                    {sec.subsections.length > 0 && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />}
                  </button>
                  {activeSection === sec.id && sec.subsections.length > 0 && (
                    <div className="ml-9 mt-0.5 space-y-0.5">
                      {sec.subsections.map((sub) => (
                        <a
                          key={sub}
                          href={`#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block text-xs text-black/50 hover:text-black py-1 pl-1 border-l border-black/10 hover:border-black/30 transition-colors"
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
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-12">

            {/* ── Overview ── */}
            <section id="overview" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/50 uppercase tracking-wider mb-6">
                <BookOpen className="w-3.5 h-3.5" /> Introduction
              </div>
              <h1 className="text-4xl font-black tracking-tight mb-6">Welcome to SupportDesk</h1>
              <p className="text-lg text-black/60 leading-relaxed mb-6">
                SupportDesk is a multi-tenant AI customer support platform that lets you deploy an AI agent on any website, resolve the majority of customer queries without human intervention, and seamlessly escalate complex cases to real agents — with full context.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, label: "Embeddable Widget", desc: "Drop a script tag anywhere" },
                  { icon: <Globe className="w-5 h-5" />, label: "External APIs", desc: "Let AI take real actions" },
                  { icon: <Users className="w-5 h-5" />, label: "Human Escalation", desc: "Context-aware hand-offs" },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="border border-black/10 rounded-xl p-5">
                    <div className="text-black/70 mb-3">{icon}</div>
                    <p className="font-bold text-sm mb-1">{label}</p>
                    <p className="text-xs text-black/45">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Getting Started ── */}
            <section id="getting-started" className="mb-20">
              <h2 className="text-3xl font-black tracking-tight mb-2" id="getting-started">Getting Started</h2>
              <p className="text-black/55 mb-8">Get your AI support system running in under 10 minutes.</p>
              <div className="space-y-6">
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
                  <div key={n} id={id} className="flex gap-5 p-6 rounded-2xl border border-black/8 hover:border-black/20 transition-colors">
                    <div className="shrink-0 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-sm font-black">{n}</div>
                    <div>
                      <h3 className="font-bold text-base mb-1.5">{title}</h3>
                      <p className="text-sm text-black/55 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Chat Widget ── */}
            <section id="chat-widget" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/50 uppercase tracking-wider mb-6">
                <MessageSquare className="w-3.5 h-3.5" /> Integration
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Embeddable Chat Widget</h2>
              <p className="text-black/55 mb-8 leading-relaxed">
                The SupportDesk widget is a lightweight JavaScript snippet you add to any website. It renders a floating chat button that opens a full AI-powered support chat — no backend changes needed on your end.
              </p>

              <div id="installation">
                <h3 className="text-xl font-bold mb-3 mt-10">Installation</h3>
                <p className="text-sm text-black/55 mb-3">Add the following snippet just before the closing <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-xs">&lt;/body&gt;</code> tag of your HTML page:</p>
                <CodeBlock language="html" code={`<!-- SupportDesk Chat Widget -->
<script src="http://our-domain/widget.js" data-api-key="your-api-key" id="support-desk-widget"></script>
<!-- End SupportDesk Chat Widget -->`} />
              </div>

              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl mt-2 mb-8">
                <p className="text-sm font-semibold text-amber-800 mb-1">Where to find your Tenant ID</p>
                <p className="text-sm text-amber-700">Go to your <strong>Dashboard → Settings → Integration</strong>. Your <code className="font-mono bg-amber-100 px-1 rounded text-xs">tenantId</code> is the unique identifier for your workspace. Never share this publicly as it links the widget to your tenant's AI and agent queue.</p>
              </div>

              <div id="configuration-options">
                <h3 className="text-xl font-bold mb-3 mt-10">Configuration Options</h3>
                <div className="border border-black/10 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/8 bg-black/[0.02]">
                        <th className="text-left px-5 py-3 font-semibold text-black/70">Option</th>
                        <th className="text-left px-5 py-3 font-semibold text-black/70">Type</th>
                        <th className="text-left px-5 py-3 font-semibold text-black/70">Required</th>
                        <th className="text-left px-5 py-3 font-semibold text-black/70">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { opt: "tenantId", type: "string", req: "Yes", desc: "Your unique workspace identifier. (Gets auto submited by us)" },
                        { opt: "primaryColor", type: "string", req: "No", desc: "Hex color for the widget button and header." },
                        { opt: "position", type: "string", req: "No", desc: '"bottom-right" or "bottom-left". Defaults to bottom-right.' },
                        { opt: "greeting", type: "string", req: "No", desc: "The first message displayed to users when they open the chat." },
                      ].map(({ opt, type, req, desc }, i) => (
                        <tr key={opt} className={i % 2 === 0 ? "border-t border-black/5" : "border-t border-black/5 bg-black/[0.01]"}>
                          <td className="px-5 py-3.5 font-mono text-xs text-black">{opt}</td>
                          <td className="px-5 py-3.5 text-black/50 font-mono text-xs">{type}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${req === "Yes" ? "bg-black text-white" : "bg-black/5 text-black/50"}`}>{req}</span>
                          </td>
                          <td className="px-5 py-3.5 text-black/55 text-xs">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── External APIs ── */}
            <section id="external-apis" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/50 uppercase tracking-wider mb-6">
                <Code2 className="w-3.5 h-3.5" /> Advanced Integration
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">External API Integration</h2>
              <p className="text-black/55 mb-8 leading-relaxed">
                This is SupportDesk's most powerful feature. Instead of just answering questions, the AI can <strong>take actions</strong> by calling your existing backend APIs — like checking an order status, looking up account details, or initiating a return.
              </p>

              <div id="how-it-works">
                <h3 className="text-xl font-bold mb-4 mt-10">How It Works</h3>
                <div className="space-y-3 mb-6">
                  {[
                    'User asks: "What\'s the status of my order #12345?"',
                    "The AI matches this intent to your registered Order Status API.",
                    "SupportDesk securely calls your endpoint with the extracted parameters.",
                    "Your API returns a response (e.g., JSON with order details).",
                    "The AI reads the response and answers the user in natural language.",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                      <p className="text-sm text-black/60 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="registering-an-endpoint">
                <h3 className="text-xl font-bold mb-2 mt-10">Walkthrough: Filling the Integration Form</h3>
                <p className="text-sm text-black/55 mb-6">
                  Go to <strong>Dashboard → Settings → Integrations → Add Integration</strong>. Below is a complete, real-world example — a <em>Customer Lookup Service</em> — that shows you exactly what to type into every field.
                </p>

                {/* ── Example scenario callout ── */}
                <div className="p-5 border-l-4 border-black bg-black/[0.03] rounded-r-xl mb-8">
                  <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-1">Example scenario</p>
                  <p className="text-sm text-black/70 leading-relaxed">
                    You want the AI to look up a customer's profile from your backend when a user says
                    something like <em>"What account details do you have for me?"</em> or <em>"Can you check my profile?"</em>.
                    Your backend exposes a GET endpoint: <code className="font-mono bg-black/8 px-1.5 py-0.5 rounded text-xs">https://api.yourstore.com/users/:id</code>
                  </p>
                </div>

                {/* ── Field-by-field form guide ── */}
                <div className="space-y-5">

                  {/* Name */}
                  <div className="border border-black/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                      <p className="text-sm font-bold">Name</p>
                      <span className="ml-auto text-xs font-semibold text-black bg-black/10 px-2 py-0.5 rounded-full">Required</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-black/55 mb-3">A short, descriptive label for this integration. This is just for your reference in the dashboard.</p>
                      <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                        <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Enter value →</span>
                        <code className="font-mono text-black font-semibold">Customer Lookup Service</code>
                      </div>
                    </div>
                  </div>

                  {/* Base URL */}
                  <div className="border border-black/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                      <p className="text-sm font-bold">Base URL</p>
                      <span className="ml-auto text-xs font-semibold text-black bg-black/10 px-2 py-0.5 rounded-full">Required</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-black/55 mb-3">The root URL of your API. Do <strong>not</strong> include the path here — you will define that per endpoint below.</p>
                      <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                        <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Enter value →</span>
                        <code className="font-mono text-black font-semibold">https://api.yourstore.com</code>
                      </div>
                    </div>
                  </div>

                  {/* Auth Type */}
                  <div className="border border-black/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                      <p className="text-sm font-bold">Authentication → Auth Type</p>
                      <span className="ml-auto text-xs font-semibold text-black/40 bg-black/5 px-2 py-0.5 rounded-full">Optional</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-black/55 mb-3">
                        Select how your API is secured. SupportDesk will automatically attach the correct auth header on every call.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        {[
                          { label: "None", desc: "Your API is public or IP-whitelisted. No credentials needed." },
                          { label: "Bearer Token", desc: "Most common. Attach a JWT or API token in the Authorization header." },
                          { label: "API Key", desc: "Send a key via a custom header (e.g., X-API-Key)." },
                        ].map(({ label, desc }) => (
                          <div key={label} className="p-3 border border-black/10 rounded-xl text-xs">
                            <p className="font-bold text-black mb-1">{label}</p>
                            <p className="text-black/50 leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                        <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Example →</span>
                        <code className="font-mono text-black font-semibold">Bearer Token</code>
                        <span className="ml-2 text-black/35 text-xs">then paste your token in the Token field that appears</span>
                      </div>
                    </div>
                  </div>

                  {/* Endpoints / Tools */}
                  <div className="border border-black/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">4</span>
                      <p className="text-sm font-bold">Endpoints (Tools) — Add Endpoint</p>
                      <span className="ml-auto text-xs font-semibold text-black bg-black/10 px-2 py-0.5 rounded-full">Required</span>
                    </div>
                    <div className="px-5 py-4 space-y-5">
                      <p className="text-sm text-black/55">
                        Click <strong>+ Add Endpoint</strong>. Each endpoint becomes an <em>AI tool</em> — a specific action the AI can take. Fill in these sub-fields:
                      </p>

                      {/* Sub-fields */}
                      <div className="space-y-3 pl-4 border-l-2 border-black/10">

                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-1.5">Tool Name (Unique)</p>
                          <p className="text-xs text-black/50 mb-2">A unique machine-readable identifier for this tool. Use camelCase, no spaces. The AI uses this name internally.</p>
                          <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                            <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Enter →</span>
                            <code className="font-mono text-black font-semibold">getUserProfile</code>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-1.5">Method</p>
                          <p className="text-xs text-black/50 mb-2">The HTTP method for this specific endpoint. Use <code className="font-mono bg-black/5 px-1 rounded">GET</code> for read-only lookups (preferred). Use <code className="font-mono bg-black/5 px-1 rounded">POST</code> for actions that create or modify data.</p>
                          <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                            <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Select →</span>
                            <code className="font-mono text-black font-semibold">GET</code>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-1.5">Path</p>
                          <p className="text-xs text-black/50 mb-2">
                            The URL path appended to your Base URL. Use <code className="font-mono bg-black/5 px-1 rounded">:paramName</code> as a placeholder for dynamic values — the AI will fill these in from the conversation.
                          </p>
                          <div className="flex items-center gap-3 p-3 border border-black/10 rounded-xl bg-white text-sm">
                            <span className="text-black/35 text-xs font-mono uppercase tracking-wider shrink-0">Enter →</span>
                            <code className="font-mono text-black font-semibold">/users/:id</code>
                          </div>
                          <p className="text-xs text-black/40 mt-1.5">The full URL called will be: <code className="font-mono">https://api.yourstore.com/users/42</code></p>
                        </div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-1.5">Description for AI</p>
                          <p className="text-xs text-black/50 mb-2">
                            This is the most important field. Write a clear sentence telling the AI <em>when</em> to use this tool and <em>what information</em> it should look for in the conversation. The AI decides whether to call this API purely based on what you write here.
                          </p>
                          <div className="p-3 border border-black/10 rounded-xl bg-white text-sm">
                            <span className="text-black/35 text-xs font-mono uppercase tracking-wider block mb-1.5">Enter →</span>
                            <code className="font-mono text-black font-semibold text-xs leading-relaxed">
                              Use this tool to look up a customer's profile, including their name, email, phone number, and company details when you are provided with a user ID.
                            </code>
                          </div>
                          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                            <p className="text-xs text-amber-800 font-semibold mb-1 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Tips for a good description</p>
                            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                              <li>Mention what the user might say to trigger this (e.g., "asks about their profile")</li>
                              <li>Specify what data is returned so the AI can summarize it correctly</li>
                              <li>Mention any prerequisite info (e.g., "when you are provided with a user ID")</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-1.5">Parameters</p>
                          <p className="text-xs text-black/50 mb-2">
                            Click <strong>+ Add Param</strong> for each value the AI needs to extract from the conversation and pass to your API. Set a name, type, and whether it is required.
                          </p>
                          <div className="border border-black/10 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-3 gap-0 text-xs font-bold text-black/40 uppercase tracking-wider px-4 py-2 bg-black/[0.03] border-b border-black/8">
                              <span>Parameter Name</span>
                              <span>Type</span>
                              <span>Required?</span>
                            </div>
                            <div className="grid grid-cols-3 gap-0 px-4 py-3 text-sm items-center">
                              <code className="font-mono font-bold text-black">id</code>
                              <span className="text-black/60">Number</span>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">✓ Req.</span>
                            </div>
                          </div>
                          <p className="text-xs text-black/40 mt-1.5">The AI will extract the user ID from the chat message and pass it as <code className="font-mono">id</code>.</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Save */}
                  <div className="border border-black/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                      <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">5</span>
                      <p className="text-sm font-bold">Save Integrations</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-black/55">
                        Once all fields are filled, click the <strong>Save Integrations</strong> button at the bottom right. The AI will immediately begin using this tool when a relevant user query is detected.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div id="api-schema-guide">
                <h3 className="text-xl font-bold mb-3 mt-12">What the completed integration looks like</h3>
                <p className="text-sm text-black/55 mb-1">Here's a summary of the full integration we just configured:</p>
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
                <p className="text-xs text-black/40 mt-2">When a user says <em>"What's my profile info? My ID is 42"</em> — the AI calls <code className="font-mono bg-black/5 px-1 rounded">GET https://api.yourstore.com/users/42</code> and replies in plain English with the result.</p>
              </div>

              <div id="security-and-keys">
                <h3 className="text-xl font-bold mb-3 mt-10">Security & API Keys</h3>
                <div className="p-5 bg-black text-white rounded-2xl">
                  <p className="font-bold mb-3">How we protect your credentials</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2"><span className="text-white mt-0.5">✓</span> API keys and Bearer tokens are encrypted using AES-256 before being stored.</li>
                    <li className="flex items-start gap-2"><span className="text-white mt-0.5">✓</span> Keys are decrypted only at request time and never logged or exposed to the frontend.</li>
                    <li className="flex items-start gap-2"><span className="text-white mt-0.5">✓</span> All outbound API calls are made from our secure backend, never from the user's browser.</li>
                    <li className="flex items-start gap-2"><span className="text-white mt-0.5">✓</span> You can revoke or rotate a key at any time from the Integrations dashboard.</li>
                  </ul>
                </div>

                <p className="text-sm text-black/55 mt-5 mb-1">Example outbound request your server will receive:</p>
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
              <h2 className="text-3xl font-black tracking-tight mb-3">Tickets & Human Escalation</h2>
              <p className="text-black/55 mb-6 leading-relaxed">
                When the AI cannot resolve a query — either because it's too complex or explicitly requested by the user — it creates a support ticket and assigns it to an available human agent based on their current workload (capacity &lt; 5 open tickets).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Automatic Assignment", body: "Tickets are routed to the agent with the fewest open tickets. If no agent is available, the ticket enters a waiting queue." },
                  { title: "Full Chat Context", body: "Agents see the entire conversation the user had with the AI before escalation — no need to start over." },
                  { title: "Manual Reassignment", body: "Admins can reassign any open ticket to a specific agent from the Tickets dashboard." },
                  { title: "Status Tracking", body: "Each ticket moves through Open → In Progress → Resolved. Users are informed of status changes in the widget." },
                ].map(({ title, body }) => (
                  <div key={title} className="p-5 border border-black/10 rounded-xl">
                    <p className="font-bold text-sm mb-2">{title}</p>
                    <p className="text-sm text-black/50 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Dashboard ── */}
            <section id="dashboard" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/50 uppercase tracking-wider mb-6">
                <BarChart2 className="w-3.5 h-3.5" /> For Admins
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Admin Dashboard</h2>
              <p className="text-black/55 mb-8 leading-relaxed">
                The admin dashboard is your command center. As an Admin, you control every part of the support system — from onboarding agents and training the AI, to managing integrations and monitoring performance in real time.
              </p>

              <div className="space-y-4">

                {/* Overview */}
                <div id="overview-page" className="border-2 border-black rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black">
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <BarChart2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-bold text-white">Overview Page</p>
                    <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-white text-black px-2 py-0.5 rounded-full">Home</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-sm text-black/65 leading-relaxed mb-4">
                      The first screen you see after logging in. It gives you an at-a-glance view of your entire support operation — no drilling required.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Total Tickets", desc: "Cumulative count of all tickets created in your workspace." },
                        { label: "AI Resolution Rate", desc: "Percentage of tickets the AI resolved without human intervention." },
                        { label: "Open Tickets", desc: "Active tickets awaiting an agent reply or still in queue." },
                        { label: "Active Agents", desc: "Agents currently online and their current ticket workload." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-4 bg-black/[0.02] border border-black/8 rounded-xl">
                          <p className="font-bold text-sm mb-1">{label}</p>
                          <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tickets */}
                <div id="tickets-admin" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Tickets</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      A master list of every ticket across your workspace. Admins can see all tickets regardless of assignee, filter by status, and take action on any of them.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <Filter className="w-4 h-4 text-black/70" />, label: "Filter by status", desc: "View All, Open, In Progress, or Resolved tickets at a glance." },
                        { icon: <Search className="w-4 h-4 text-black/70" />, label: "Full conversation view", desc: "Click any ticket to see the complete AI + human chat thread." },
                        { icon: <Repeat className="w-4 h-4 text-black/70" />, label: "Manual reassignment", desc: "Drag or reassign any open ticket to a specific agent from this view." },
                        { icon: <CheckCircle2 className="w-4 h-4 text-black/70" />, label: "Bulk resolve", desc: "Close multiple tickets at once to keep your queue clean." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-black/8 rounded-xl">
                          <span className="shrink-0 mt-0.5">{icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-black">{label}</p>
                            <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agents */}
                <div id="agents" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Agents</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Manage your human support team. Invite new members, assign roles, and monitor their current capacity.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Invite Agent", desc: "Send an email invite with a registration link scoped to your tenant." },
                        { label: "Set Role", desc: "Assign Admin (full access) or Agent (tickets only) roles per user." },
                        { label: "View Workload", desc: "See how many open tickets each agent currently has (max 5 before queue)." },
                        { label: "Remove Agent", desc: "Revoke access for any team member from the agents panel." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-black/[0.02] border border-black/8 rounded-xl">
                          <p className="font-bold text-xs mb-1">{label}</p>
                          <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-xs text-amber-800 font-semibold mb-1 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Capacity rule</p>
                      <p className="text-xs text-amber-700">An agent can hold a maximum of 5 open tickets at a time. New tickets are automatically routed to the agent with the lowest current count. If all agents are at capacity, the ticket enters the waiting queue.</p>
                    </div>
                  </div>
                </div>

                {/* Widgets */}
                <div id="widgets" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Widgets</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Create and manage the embeddable chat widgets for your websites. Each widget is tied to your tenant and displays the unique API key you need to embed it.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <IdCard className="w-4 h-4 text-black/70" />, label: "Your API Key", desc: "Found here — copy it and use it as the data-api-key attribute in the widget script tag." },
                        { icon: <Palette className="w-4 h-4 text-black/70" />, label: "Widget config", desc: "Set the widget name and manage which site it belongs to." },
                        { icon: <Copy className="w-4 h-4 text-black/70" />, label: "Copy embed snippet", desc: "The dashboard shows you the exact script tag to paste into your website." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-black/8 rounded-xl">
                          <span className="shrink-0 mt-0.5">{icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-black">{label}</p>
                            <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Context */}
                <div id="ai-context" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">AI Context</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      This is the brain of your AI. Upload, edit, and manage the knowledge base that the AI reads before every response. The more accurate and detailed your context, the better the AI performs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "FAQs", desc: "Common questions and answers about your product or service." },
                        { label: "Policies", desc: "Return, refund, shipping, or usage policies the AI should know." },
                        { label: "Product Info", desc: "Descriptions, pricing, and specs for your products or plans." },
                        { label: "Custom Instructions", desc: "Tone guidelines, escalation triggers, or anything else to shape AI behaviour." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-black/[0.02] border border-black/8 rounded-xl">
                          <p className="font-bold text-xs mb-1">{label}</p>
                          <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-black/[0.03] border border-black/8 rounded-xl">
                      <p className="text-xs font-semibold text-black mb-1 flex items-center gap-1.5"><PenTool className="w-3.5 h-3.5" /> Writing tip</p>
                      <p className="text-xs text-black/55">Write context in clear, declarative sentences. Example: <em>"Our refund policy allows returns within 30 days of purchase. No questions asked."</em> — the AI will use this verbatim when answering refund queries.</p>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div id="integrations" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <Code2 className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Integrations</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-3">
                      Register your external APIs here so the AI can call them during a conversation. See the <a href="#external-apis" className="underline font-medium text-black hover:text-black/60 transition-colors">External API Integration</a> section for a full walkthrough.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <Plus className="w-4 h-4 text-black/70" />, label: "Add Integration", desc: "Register a new API with a Base URL, auth type, and one or more endpoint tools." },
                        { icon: <Edit2 className="w-4 h-4 text-black/70" />, label: "Edit / Update", desc: "Modify an existing integration's endpoint, schema, or API key at any time." },
                        { icon: <Trash2 className="w-4 h-4 text-black/70" />, label: "Remove", desc: "Delete an integration to immediately stop the AI from calling that endpoint." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-black/8 rounded-xl">
                          <span className="shrink-0 mt-0.5">{icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-black">{label}</p>
                            <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div id="settings" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <Settings className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Settings</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Manage your workspace configuration. Changes here affect the entire tenant.
                    </p>
                    <div className="border border-black/10 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-2 text-xs font-bold text-black/40 uppercase tracking-wider px-4 py-2 bg-black/[0.03] border-b border-black/8">
                        <span>Setting</span>
                        <span>Description</span>
                      </div>
                      {[
                        { setting: "Company Name", desc: "The display name of your tenant shown in the dashboard." },
                        { setting: "Tenant Slug", desc: "Your unique URL identifier (e.g. /your-company/dashboard)." },
                        { setting: "Integration Keys", desc: "View and rotate the API key used by your embedded widgets." },
                        { setting: "Account Email", desc: "The admin email address tied to this workspace." },
                      ].map(({ setting, desc }, i) => (
                        <div key={setting} className={`grid grid-cols-2 px-4 py-3 text-sm ${i % 2 !== 0 ? "bg-black/[0.01]" : ""} border-t border-black/5`}>
                          <span className="font-medium text-black">{setting}</span>
                          <span className="text-black/50 text-xs leading-relaxed mt-0.5">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Human Agents ── */}
            <section id="human-agents" className="mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/50 uppercase tracking-wider mb-6">
                <Users className="w-3.5 h-3.5" /> For Agents
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Human Agent Features</h2>
              <p className="text-black/55 mb-8 leading-relaxed">
                When the AI escalates a ticket, a human agent takes over. SupportDesk gives agents everything they need to resolve issues quickly — from a smart inbox to AI-powered reply drafts. Agents only see tickets assigned to their tenant.
              </p>

              {/* Feature Cards */}
              <div className="space-y-4">

                {/* AI Reply Suggestion — highlighted */}
                <div id="ai-reply-suggestions" className="border-2 border-black rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black">
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-bold text-white">AI Reply Suggestion</p>
                    <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-white text-black px-2 py-0.5 rounded-full">Flagship Feature</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-sm text-black/65 leading-relaxed mb-4">
                      When an agent opens an escalated ticket, SupportDesk automatically generates a suggested reply based on the full conversation history, the AI knowledge base, and the context of the user's issue. The agent can use it as-is, edit it, or discard it.
                    </p>
                    <div className="bg-black/[0.03] border border-black/8 rounded-xl p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-black/35 mb-3">How it works</p>
                      <div className="space-y-2">
                        {[
                          "The ticket arrives with the full AI chat transcript attached.",
                          "SupportDesk sends the conversation + your AI context to the LLM.",
                          "A draft reply is generated and pre-filled in the agent's response box.",
                          "The agent reviews, edits if needed, and hits Send — in seconds.",
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="shrink-0 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black mt-0.5">{i + 1}</span>
                            <p className="text-xs text-black/60 leading-relaxed pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Dashboard */}
                <div id="agent-dashboard" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <BarChart2 className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Agent Dashboard</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Each agent gets a personal view of their assigned tickets. The dashboard shows their current workload, ticket statuses at a glance, and highlights any tickets that have been waiting too long.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: "My Open Tickets", desc: "All tickets currently assigned to the agent, sorted by urgency." },
                        { label: "Ticket Queue", desc: "Tickets waiting for assignment when no agent had capacity." },
                        { label: "Resolved Today", desc: "A running count of tickets closed in the current session." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-3 bg-black/[0.02] border border-black/8 rounded-xl">
                          <p className="font-bold text-xs mb-1">{label}</p>
                          <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div id="chat-interface" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Live Chat Interface</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Agents communicate with users through a real-time chat panel inside the ticket detail view. The interface shows the complete thread — including the AI's earlier responses — so agents never need to ask the user to repeat themselves.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: <MessageSquare className="w-4 h-4 text-black/70" />, label: "Full AI transcript visible", desc: "Read the entire conversation the AI had before escalation." },
                        { icon: <Edit2 className="w-4 h-4 text-black/70" />, label: "AI-pre-filled reply box", desc: "The AI reply suggestion is loaded into the input — the agent just needs to review and send." },
                        { icon: <Paperclip className="w-4 h-4 text-black/70" />, label: "Ticket metadata sidebar", desc: "See user info, ticket creation time, and AI resolution attempts at a glance." },
                        { icon: <RefreshCcw className="w-4 h-4 text-black/70" />, label: "Real-time updates", desc: "Responses appear instantly for the user in the chat widget without page refresh." },
                      ].map(({ icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3 px-4 py-3 border border-black/8 rounded-xl">
                          <span className="shrink-0 mt-0.5">{icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-black">{label}</p>
                            <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ticket Actions */}
                <div id="ticket-actions" className="border border-black/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border-b border-black/8">
                    <div className="w-7 h-7 bg-black/8 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-sm font-bold">Ticket Actions</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      Agents have a set of actions available on every ticket to manage their workload efficiently.
                    </p>
                    <div className="border border-black/10 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-2 text-xs font-bold text-black/40 uppercase tracking-wider px-4 py-2 bg-black/[0.03] border-b border-black/8">
                        <span>Action</span>
                        <span>Who can do it</span>
                      </div>
                      {[
                        { action: "Reply to user", who: "Agent & Admin" },
                        { action: "Mark as Resolved", who: "Agent & Admin" },
                        { action: "Reopen ticket", who: "Agent & Admin" },
                        { action: "Reassign to another agent", who: "Admin only" },
                      ].map(({ action, who }, i) => (
                        <div key={action} className={`grid grid-cols-2 px-4 py-3 text-sm ${i % 2 !== 0 ? "bg-black/[0.01]" : ""} border-t border-black/5`}>
                          <span className="font-medium text-black">{action}</span>
                          <span className="text-black/50 text-xs font-medium mt-0.5">{who}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Multi-Tenant ── */}
            <section id="multi-tenant" className="mb-20">
              <h2 className="text-3xl font-black tracking-tight mb-3">Multi-Tenant Setup</h2>
              <p className="text-black/55 mb-6 leading-relaxed">
                SupportDesk is built for agencies and SaaS businesses who serve multiple clients. Each tenant is a completely isolated workspace with its own agents, AI context, chat widgets, and API integrations.
              </p>
              <div className="p-6 bg-black/[0.03] border border-black/8 rounded-2xl text-sm text-black/60 leading-relaxed">
                <p className="font-bold text-black mb-2">Tenant URL Structure</p>
                <code className="font-mono text-xs bg-black/8 px-3 py-1.5 rounded-lg block">
                  https://your-domain.com/<strong>:tenantSlug</strong>/dashboard
                </code>
                <p className="mt-4">Each client you onboard gets a unique <code className="font-mono bg-black/8 px-1 rounded text-xs">tenantSlug</code> — everything in SupportDesk is scoped to this. Agents log in under their tenant and can only see that tenant's data.</p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
