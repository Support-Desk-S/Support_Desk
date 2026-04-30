import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Globe, User, Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";

const AgentRegisterForm = ({ onSuccess }) => {
  const { registerAgent, loading } = useAuth();
  const [form, setForm] = useState({ slug: "", name: "", email: "", password: "" });
  const [done, setDone] = useState(false);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const isValid = Object.values(form).every((v) => v.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || loading) return;
    const success = await registerAgent(form);
    if (success) setDone(true);
  };

  // Success state
  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
        <div className="w-12 h-12 bg-[#d1fae5] rounded-full flex items-center justify-center">
          <CheckCircle2 size={24} className="text-[#059669]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#111111] mb-1">
            Registration submitted!
          </h3>
          <p className="text-sm text-[#6b7280]">
            Your account is pending admin approval. Once approved, you can sign in using the{" "}
            <strong>Sign In</strong> tab.
          </p>
        </div>
        <button
          onClick={onSuccess}
          className="mt-2 px-4 py-2 text-sm font-medium text-[#111111] border border-[#e5e7eb] rounded-[10px] hover:bg-[#f9fafb] transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-[#111111]">Join as Agent</h2>
        <p className="text-sm text-[#6b7280] mt-0.5">
          Register under your company's workspace
        </p>
      </div>

      {/* Workspace Slug */}
      <div>
        <label className="text-sm font-medium text-[#111111] block mb-1.5">
          Workspace Slug
        </label>
        <div className="relative">
          <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="your-company"
            value={form.slug}
            onChange={set("slug")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#9ca3af]"
          />
        </div>
        <p className="text-xs text-[#9ca3af] mt-1">Ask your admin for the workspace slug</p>
      </div>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-[#111111] block mb-1.5">Full Name</label>
        <div className="relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set("name")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#9ca3af]"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-[#111111] block mb-1.5">Email</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#9ca3af]"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-[#111111] block mb-1.5">Password</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set("password")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#9ca3af]"
          />
        </div>
      </div>

      {/* Info banner */}
      <div className="p-3 bg-[#fef3c7] border border-[#fde68a] rounded-[10px]">
        <p className="text-xs text-[#92400e]">
          ⚠️ Agent accounts require <strong>admin approval</strong> before you can sign in.
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full h-10 bg-[#111111] text-white text-sm font-medium rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#2d2d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Registering..." : "Register as Agent"}
      </button>
    </form>
  );
};

export default AgentRegisterForm;
