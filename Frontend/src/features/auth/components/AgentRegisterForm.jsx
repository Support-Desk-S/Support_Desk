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
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 size={24} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">
            Registration submitted!
          </h3>
          <p className="text-sm text-zinc-400">
            Your account is pending admin approval. Once approved, you can sign in using the{" "}
            <strong className="text-white">Sign In</strong> tab.
          </p>
        </div>
        <button
          onClick={onSuccess}
          className="mt-2 px-4 py-2 text-sm font-semibold text-white border border-white/10 rounded-[10px] hover:bg-white/5 transition-all cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Join as Agent</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Register under your company's workspace
        </p>
      </div>

      {/* Workspace Slug */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
          Workspace Slug
        </label>
        <div className="relative">
          <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="your-company"
            value={form.slug}
            onChange={set("slug")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
          />
        </div>
        <p className="text-xs text-zinc-500 mt-1.5 font-mono">Ask your admin for the workspace slug</p>
      </div>

      {/* Name */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">Full Name</label>
        <div className="relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set("name")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">Email</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">Password</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set("password")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
          />
        </div>
      </div>

      {/* Info banner */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-[10px]">
        <p className="text-xs text-amber-400 leading-normal">
          ⚠️ Agent accounts require <strong className="text-white">admin approval</strong> before you can sign in.
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full h-10 bg-white text-black text-sm font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Registering..." : "Register as Agent"}
      </button>
    </form>
  );
};

export default AgentRegisterForm;
