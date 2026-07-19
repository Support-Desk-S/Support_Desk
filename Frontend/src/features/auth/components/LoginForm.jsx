import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, Globe, Loader2 } from "lucide-react";

const LoginForm = () => {
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ slug: "", email: "", password: "" });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const isValid = form.slug.trim() && form.email.trim() && form.password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || loading) return;
    login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Welcome back</h2>
        <p className="text-sm text-zinc-400 mt-1">Sign in to your workspace</p>
      </div>

      {/* Slug */}
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
        <p className="text-xs text-zinc-500 mt-1.5 font-mono">Your company's unique workspace URL</p>
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
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full h-10 bg-white text-black text-sm font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
