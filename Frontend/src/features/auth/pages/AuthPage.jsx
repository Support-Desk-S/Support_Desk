import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import AgentRegisterForm from "../components/AgentRegisterForm";
import { Zap, Shield, Bot, BarChart3 } from "lucide-react";

const FEATURES = [
  { icon: Bot, text: "AI-powered ticket resolution" },
  { icon: Shield, text: "Multi-tenant isolation & security" },
  { icon: BarChart3, text: "Real-time analytics & insights" },
];

const TABS = [
  { key: "login", label: "Sign In" },
  { key: "register", label: "Register Company" },
  { key: "agent", label: "Join as Agent" },
];

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex bg-[#050507]">
      {/* ── LEFT PANEL (dark brand) ── */}
      <div className="hidden md:flex w-[45%] bg-[#09090b] border-r border-white/5 flex-col justify-between p-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-black" />
          </div>
          <span className="text-white text-lg font-semibold tracking-tight">SupportDesk</span>
        </div>

        {/* Center content */}
        <div>
          <h1 className="text-3xl font-semibold text-white leading-snug mb-4 tracking-tight">
            Intelligent support,<br />powered by AI
          </h1>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-[40ch]">
            Give your customers instant, accurate answers — powered by your own
            knowledge base. Escalate seamlessly to humans when needed.
          </p>

          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-zinc-300" />
                </div>
                <span className="text-sm text-zinc-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-500 font-mono">© 2026 SupportDesk. Built for B2B teams.</p>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#050507] overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-[#09090b] border border-white/5 rounded-[12px] p-1.5 mb-6">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={[
                  "flex-1 py-2 text-xs font-semibold rounded-[10px] transition-all duration-150 whitespace-nowrap px-1 cursor-pointer",
                  activeTab === key
                    ? "bg-white text-black shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-[#09090b] border border-white/5 rounded-[14px] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.8)] animate-fade-in">
            {activeTab === "login" && <LoginForm />}
            {activeTab === "register" && <RegisterForm />}
            {activeTab === "agent" && (
              <AgentRegisterForm
                onSuccess={() => setActiveTab("login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;