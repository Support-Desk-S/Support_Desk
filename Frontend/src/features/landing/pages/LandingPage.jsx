import { useNavigate } from "react-router";
import { ArrowRight, MessageSquare, Code, ShieldCheck, Zap, BarChart2, Bot, Users, CheckCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">

      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-black/8 sticky top-0 bg-white/90 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">SupportDesk</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/55">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
          <button onClick={() => navigate("/docs")} className="hover:text-black transition-colors">Documentation</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/auth")} className="text-sm font-medium whitespace-nowrap text-black/70 hover:text-black px-4 py-2 transition-colors">
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-all whitespace-nowrap"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-28 pb-20 px-10 text-center overflow-hidden">
        {/* Background grid decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-black/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 bg-white text-xs font-semibold text-black/60 mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now available for all businesses
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-[-0.04em] leading-[1.0] mb-8 text-black">
            Resolve 80% of support<br />
            <span className="text-black/35">without a human.</span>
          </h1>

          <p className="text-xl md:text-2xl text-black/55 leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            SupportDesk deploys an AI agent that handles your customer queries 24/7 — and only calls in a human when it truly matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-bold text-base hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-2xl shadow-black/20"
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="flex items-center gap-2 px-8 py-4 bg-white text-black border border-black/20 rounded-xl font-semibold text-base hover:border-black/40 hover:bg-black/[0.02] transition-all"
            >
              Read the Documentation
            </button>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-black/8 bg-black/[0.02] py-10">
        <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "80%", label: "Tickets resolved by AI" },
            { value: "< 1s", label: "Avg. AI response time" },
            { value: "3x", label: "Faster resolution time" },
            { value: "60%", label: "Reduction in agent workload" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-black tracking-tight text-black">{value}</p>
              <p className="text-sm text-black/50 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-28 px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 text-center">WHAT WE OFFER</p>
          <h2 className="text-4xl font-black tracking-tight text-center mb-16">Everything you need to<br />automate support.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Bot className="w-6 h-6" />,
                title: "AI-First Ticket Resolution",
                body: "Our LLM understands natural language, retrieves relevant context from your knowledge base, and resolves issues without any human intervention.",
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: "Embeddable Chat Widget",
                body: "Drop a single <script> tag into any website. In seconds, your customers have a powerful AI assistant — no iframes, no complex setup.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Live External API Calls",
                body: "Let the AI take real action. Connect your APIs so it can check order status, trigger refunds, or update account details on behalf of users.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Smart Human Escalation",
                body: "When the AI can't resolve an issue, it escalates with the full conversation context to an available agent based on real-time capacity.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Multi-Tenant by Design",
                body: "Built for agencies and SaaS businesses. Onboard dozens of clients, each with isolated data, agents, AI context, and API integrations.",
              },
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: "Admin Dashboard & Analytics",
                body: "Track ticket volume, AI resolution rates, and agent performance. Understand your support load at a glance and optimize with data.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-7 border border-black/10 rounded-2xl hover:border-black/25 hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-black/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-all text-black">
                  {icon}
                </div>
                <h3 className="font-bold text-lg mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-28 px-10 bg-black/[0.02] border-y border-black/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 text-center">HOW IT WORKS</p>
          <h2 className="text-4xl font-black tracking-tight text-center mb-20">From setup to autonomous<br />support in minutes.</h2>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-black/10 hidden md:block" />
            <div className="space-y-12">
              {[
                { step: "01", title: "Create your workspace", body: "Register your company and get a unique tenant slug. Everything is isolated — your data, your agents, your AI." },
                { step: "02", title: "Upload your AI context", body: "Feed SupportDesk your FAQs, product docs, and policies. The AI uses this knowledge to give accurate, on-brand answers." },
                { step: "03", title: "Embed the chat widget", body: "Copy one <script> snippet into your website. Your users immediately see a fully functional AI support assistant." },
                { step: "04", title: "Connect your APIs (optional)", body: "Register your backend endpoints so the AI can take real actions — like checking order status or processing returns." },
                { step: "05", title: "Watch your ticket volume drop", body: "The AI resolves the majority of queries. Complex issues get routed to agents with full context. You focus on what matters." },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex items-start gap-8 md:gap-12">
                  <div className="shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xs font-black z-10">
                    {step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-xl mb-2 tracking-tight">{title}</h3>
                    <p className="text-black/55 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof ─── */}
      <section className="py-28 px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 text-center">WHY TEAMS CHOOSE US</p>
          <h2 className="text-4xl font-black tracking-tight text-center mb-16">Stop spending your agents' time<br />on questions the AI can answer.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "3 agents → 1 agent", desc: "Teams consistently replace 2 out of 3 support agents on Tier-1 queries after deploying SupportDesk." },
              { stat: "24/7 availability", desc: "Your AI never sleeps, never takes a break, and never misses a message. Coverage without overtime." },
              { stat: "Zero-drift answers", desc: "The AI answers based on your uploaded knowledge. No hallucinations on off-topic questions — it escalates instead." },
            ].map(({ stat, desc }) => (
              <div key={stat} className="bg-black text-white p-8 rounded-2xl">
                <p className="text-2xl font-black mb-4 tracking-tight">{stat}</p>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-32 px-10 border-t border-black/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight mb-6">Ready to cut your support workload in half?</h2>
          <p className="text-black/55 text-lg mb-10 leading-relaxed">
            Set up takes less than 10 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 px-10 py-4 bg-black text-white rounded-xl font-bold text-base hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-2xl shadow-black/20"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="px-10 py-4 text-black font-semibold text-base hover:underline transition-all"
            >
              View Documentation →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-10 py-10 border-t border-black/8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black/40">
        <div className="flex items-center gap-2 font-bold text-black">
          <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          SupportDesk
        </div>
        <p>&copy; {new Date().getFullYear()} SupportDesk. Built for teams that value time.</p>
        <div className="flex gap-6">
          <button onClick={() => navigate("/docs")} className="hover:text-black transition-colors">Docs</button>
          <button onClick={() => navigate("/auth")} className="hover:text-black transition-colors">Sign In</button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
