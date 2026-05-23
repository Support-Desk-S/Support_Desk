import { ArrowRight, BarChart2, Bot, Code, Menu, ShieldCheck, Users, X, Zap, Cpu, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "framer-motion";

/* ─── Reusable reveal wrapper ─── */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 36 : 0,
      x: direction === "left" ? -48 : direction === "right" ? 48 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Browser chrome mockup ─── */
const ScreenMockup = ({ src, alt, flip = false }) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform = `perspective(1200px) rotateY(${flip ? 8 : -8}deg) rotateX(4deg) scale(1)`;
  }, [flip]);
  return (
    <div className="relative w-full" style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1200px) rotateY(${flip ? 8 : -8}deg) rotateX(4deg) scale(1)`,
          transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
        }}
        className="rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.22)] border border-black/10 bg-white"
      >
        <div className="h-9 bg-[#f5f5f5] border-b border-black/8 flex items-center px-4 gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 h-6 bg-white/70 border border-black/8 rounded-md flex items-center px-3">
            <span className="text-[10px] text-black/30 font-medium">app.supportdesk.ai/nexacart</span>
          </div>
        </div>
        <img src={src} alt={alt} className="w-full h-auto block" draggable={false} />
      </div>
      <div className="absolute -bottom-8 -left-4 -right-4 h-20 bg-black/[0.07] blur-3xl -z-10 rounded-full" />
    </div>
  );
};

/* ─── Animated counter ─── */
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.ceil(to / 50);
    const t = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(cur);
      if (cur >= to) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const features = [
  { icon: <Bot className="w-5 h-5"/>, tag: "Core AI", title: "AI-First Ticket Resolution", body: "Our LLM understands natural language, retrieves context from your knowledge base, and resolves issues without any human in the loop.", image: "/assets/tickets_screen.png", alt: "Tickets", bullets: ["Natural language understanding", "Instant KB retrieval"] },
  { icon: <Code className="w-5 h-5"/>, tag: "Embed", title: "Embeddable Chat Widget", body: "Drop a single <script> tag into any website. Your customers immediately get a powerful AI support assistant — no iframes, no complex setup.", image: "/assets/widgets_screen.png", alt: "Widgets", bullets: ["One-line embed", "Fully customizable UI"] },
  { icon: <Users className="w-5 h-5"/>, tag: "Agents", title: "Smart Human Escalation", body: "When the AI can't resolve an issue, it escalates with full conversation context to the right agent based on real-time capacity.", image: "/assets/agents_screen.png", alt: "Agents", bullets: ["Capacity-based routing", "Full context hand-off"] },
  { icon: <Cpu className="w-5 h-5"/>, tag: "AI Context", title: "Custom AI Knowledge Base", body: "Feed SupportDesk your FAQs, docs, and policies. The AI gives accurate, on-brand answers — and escalates when it's out of scope.", image: "/assets/ai_context_screen.png", alt: "AI Context", bullets: ["Upload docs & FAQs", "Zero hallucination guarantee"] },
  { icon: <BarChart2 className="w-5 h-5"/>, tag: "Analytics", title: "Admin Dashboard & Analytics", body: "Track ticket volume, AI resolution rates, and agent performance. Understand your support load and optimize with real data.", image: "/assets/dashboard_screen.png", alt: "Dashboard", bullets: ["Real-time metrics", "Agent performance tracking"] },
  { icon: <ShieldCheck className="w-5 h-5"/>, tag: "Multi-Tenant", title: "Multi-Tenant by Design", body: "Built for agencies and SaaS. Onboard dozens of clients with fully isolated data, agents, AI context, and API integrations.", image: "/assets/settings_screen.png", alt: "Settings", bullets: ["Isolated per-client data", "Role-based access control"] },
];

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <nav className={`flex items-center justify-between px-5 md:px-12 py-4 sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-2xl border-b border-black/8 shadow-sm" : "bg-transparent"}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">SupportDesk</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-black/45">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
          <button onClick={() => navigate("/docs")} className="hover:text-black transition-colors">Docs</button>
        </div>
        <div className="hidden md:flex items-center gap-2.5">
          <button onClick={() => navigate("/auth")} className="px-4 py-2 text-[13px] font-medium text-black/60 hover:text-black rounded-lg hover:bg-black/5 transition-all">Sign In</button>
          <button onClick={() => navigate("/auth")} className="px-5 py-2.5 bg-black text-white text-[13px] font-semibold rounded-xl hover:bg-black/80 transition-all shadow-md">Get Started</button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        {open && (
          <div className="absolute top-full left-0 w-full bg-white/96 backdrop-blur-2xl border-b border-black/10 shadow-xl md:hidden">
            <div className="flex flex-col p-5 gap-4 text-sm font-medium">
              <a href="#features" onClick={() => setOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
              <button onClick={() => { navigate("/docs"); setOpen(false); }} className="text-left">Docs</button>
              <div className="border-t pt-4 flex flex-col gap-2.5">
                <button onClick={() => navigate("/auth")} className="text-left text-black/60">Sign In</button>
                <button onClick={() => navigate("/auth")} className="bg-black text-white py-2.5 rounded-xl font-semibold">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-14 md:pt-20 pb-10 px-5 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000007_1px,transparent_1px),linear-gradient(to_bottom,#00000007_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left: Text — flex-none fixed width */}
          <div className="flex-none w-full lg:w-[40%] text-center lg:text-left z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/12 bg-white text-[11px] font-semibold text-black/45 mb-6 uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Now available for all businesses
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="text-[2.7rem] md:text-5xl lg:text-[3.2rem] font-black tracking-[-0.04em] leading-[1.06] mb-5 text-black">
                Resolve 80% of<br />support{" "}
                <span className="text-black/22">without<br />a human.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-[14px] md:text-[15px] text-black/45 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                SupportDesk deploys an AI agent that handles customer queries 24/7 — and only escalates to a human when it truly matters.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-7">
                <button onClick={() => navigate("/auth")} className="flex items-center gap-2 px-7 py-3.5 bg-black text-white rounded-xl font-bold text-[13px] hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-xl shadow-black/20">
                  Start for free <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => navigate("/docs")} className="flex items-center gap-2 px-7 py-3.5 bg-white text-black border border-black/12 rounded-xl font-semibold text-[13px] hover:border-black/25 transition-all shadow-sm">
                  Read the Docs
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                {["No credit card", "Setup in 10 min", "99.9% uptime"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[11px] text-black/35 font-semibold uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Hero Mockup — slightly bigger than text col */}
          <Reveal direction="right" delay={0.1} className="flex-1 w-full lg:w-[60%] min-w-0">
            <ScreenMockup src="/assets/dashboard_screen.png" alt="SupportDesk Dashboard" flip={false} />
          </Reveal>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-black/8 bg-white py-10 mt-12">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { to: 80, suffix: "%", label: "Tickets resolved by AI" },
            { value: "< 1s", label: "Avg. AI response time" },
            { to: 3, suffix: "×", label: "Faster resolution time" },
            { to: 60, suffix: "%", label: "Less agent workload" },
          ].map(({ to, value, suffix, label }) => (
            <Reveal key={label}>
              <p className="text-3xl md:text-4xl font-black tracking-tight">
                {value ?? <Counter to={to} suffix={suffix} />}
              </p>
              <p className="text-[11px] text-black/35 mt-1.5 font-semibold uppercase tracking-widest">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Features: all 6, balanced 50/50 layout ─── */}
      <section id="features" className="py-24 md:py-36 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/30 mb-3">What we offer</p></Reveal>
            <Reveal delay={0.08}><h2 className="text-3xl md:text-[2.8rem] font-black tracking-[-0.03em]">Everything you need to<br />automate support.</h2></Reveal>
          </div>

          <div className="space-y-28 md:space-y-36">
            {features.map((feat, i) => (
              <div key={feat.title} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}>
                {/* Mockup — flex-1, same size as before */}
                <Reveal direction={i % 2 === 0 ? "left" : "right"} className="flex-1 w-full min-w-0">
                  <ScreenMockup src={feat.image} alt={feat.alt} flip={i % 2 !== 0} />
                </Reveal>
                {/* Text — flex-1, balanced */}
                <Reveal direction={i % 2 === 0 ? "right" : "left"} delay={0.1} className="flex-1 w-full min-w-0 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[11px] font-bold text-black/45 uppercase tracking-wider mb-4">
                    {feat.icon} {feat.tag}
                  </div>
                  <h3 className="text-2xl md:text-[1.85rem] font-black tracking-[-0.03em] mb-3 leading-tight">{feat.title}</h3>
                  <p className="text-[14px] text-black/45 leading-relaxed mb-5 max-w-sm mx-auto lg:mx-0">{feat.body}</p>
                  <ul className="space-y-2 mb-6">
                    {feat.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 justify-center lg:justify-start text-[13px] font-medium text-black/55">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate("/auth")} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-black hover:gap-2.5 transition-all group">
                    Get started free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24 md:py-32 px-5 md:px-12 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/25 mb-3">How it works</p></Reveal>
            <Reveal delay={0.08}><h2 className="text-3xl md:text-[2.8rem] font-black tracking-[-0.03em]">From setup to autonomous<br />support in minutes.</h2></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Create your workspace", body: "Register and get a unique tenant slug. Data, agents, and AI fully isolated from day one." },
              { step: "02", title: "Upload your AI context", body: "Feed FAQs, docs, and policies for accurate, on-brand responses every time." },
              { step: "03", title: "Embed the chat widget", body: "One <script> tag. Your customers immediately see a full AI support assistant." },
              { step: "04", title: "Connect your APIs", body: "Let the AI check order status, trigger refunds, or update records in real time." },
              { step: "05", title: "Assign your agents", body: "Add your team. AI escalates complex issues with full context to available agents." },
              { step: "06", title: "Watch ticket volume drop", body: "The AI handles the majority. Your agents focus on what truly matters." },
            ].map(({ step, title, body }, i) => (
              <Reveal key={step} delay={i * 0.07}>
                <div className="p-6 border border-white/8 rounded-2xl hover:border-white/18 hover:bg-white/[0.03] transition-all h-full">
                  <div className="text-[3rem] font-black text-white/8 mb-3 leading-none tracking-tighter">{step}</div>
                  <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                  <p className="text-white/35 text-[13px] leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof ─── */}
      <section className="py-24 md:py-32 px-5 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/30 mb-3 text-center">Why teams choose us</p></Reveal>
          <Reveal delay={0.08}><h2 className="text-3xl md:text-[2.8rem] font-black tracking-[-0.03em] text-center mb-12">Stop spending your agents' time<br />on questions AI can answer.</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stat: "3 agents → 1", desc: "Teams replace 2 of 3 Tier-1 support agents after deploying SupportDesk." },
              { stat: "24/7 coverage", desc: "Your AI never sleeps or takes breaks. Full coverage without overtime." },
              { stat: "Zero drift", desc: "Answers only from your knowledge — no hallucinations, it escalates instead." },
            ].map(({ stat, desc }, i) => (
              <Reveal key={stat} delay={i * 0.08}>
                <div className="bg-black text-white p-8 rounded-2xl flex flex-col gap-3 h-full">
                  <p className="text-2xl font-black tracking-tight">{stat}</p>
                  <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-5 md:px-12 text-center bg-[#f7f7f7] border-t border-black/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <Reveal><h2 className="text-3xl md:text-[2.6rem] font-black tracking-[-0.03em] mb-4 leading-tight">Ready to cut your support workload in half?</h2></Reveal>
          <Reveal delay={0.08}><p className="text-[14px] text-black/40 mb-9 leading-relaxed">Set up takes less than 10 minutes. No credit card required.</p></Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => navigate("/auth")} className="flex items-center gap-2 px-9 py-4 bg-black text-white rounded-xl font-bold text-[13px] hover:bg-black/80 transition-all hover:-translate-y-0.5 shadow-2xl shadow-black/25">
                Get Started Free <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => navigate("/docs")} className="px-9 py-4 text-black font-semibold text-[13px] hover:underline underline-offset-4 transition-all">
                View Documentation →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-5 md:px-12 py-8 border-t border-black/8 bg-white flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-black/30">
        <div className="flex items-center gap-2 font-bold text-black">
          <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
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
