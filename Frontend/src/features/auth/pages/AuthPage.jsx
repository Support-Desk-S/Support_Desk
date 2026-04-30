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
    <div className="min-h-screen flex bg-white">
      {/* ── LEFT PANEL (dark brand) ── */}
      <div className="hidden md:flex w-[45%] bg-[#0a0a0a] flex-col justify-between p-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
            <Zap size={18} className="text-[#111111]" />
          </div>
          <span className="text-white text-lg font-semibold">SupportDesk</span>
        </div>

        {/* Center content */}
        <div>
          <h1 className="text-3xl font-semibold text-white leading-snug mb-4">
            Intelligent support,<br />powered by AI
          </h1>
          <p className="text-[#9ca3af] text-sm mb-8 leading-relaxed">
            Give your customers instant, accurate answers — powered by your own
            knowledge base. Escalate seamlessly to humans when needed.
          </p>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#9ca3af]" />
                </div>
                <span className="text-sm text-[#d1d5db]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#4b5563]">© 2026 SupportDesk. Built for B2B teams.</p>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fa] overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-[#e5e7eb] rounded-[12px] p-1 mb-6">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={[
                  "flex-1 py-2 text-xs font-medium rounded-[10px] transition-all duration-150 whitespace-nowrap px-1",
                  activeTab === key
                    ? "bg-white text-[#111111] shadow-sm"
                    : "text-[#6b7280] hover:text-[#111111]",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-7 shadow-sm animate-fade-in">
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