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
        <h2 className="text-xl font-semibold text-[#111111]">Welcome back</h2>
        <p className="text-sm text-[#6b7280] mt-0.5">Sign in to your workspace</p>
      </div>

      {/* Slug */}
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
        <p className="text-xs text-[#9ca3af] mt-1">Your company's unique workspace URL</p>
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
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
            required
            className="w-full h-10 pl-8 pr-3 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#9ca3af]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full h-10 bg-[#111111] text-white text-sm font-medium rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#2d2d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
