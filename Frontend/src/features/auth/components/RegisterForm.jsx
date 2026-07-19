import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Building2, Link2, Mail, User, Lock, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

const STEP_FIELDS = [
  [
    { key: "name", label: "Company Name", type: "text", icon: Building2, placeholder: "Acme Corp" },
    { key: "slug", label: "Workspace Slug", type: "text", icon: Link2, placeholder: "acme-corp", hint: "Used in your URL: platform.com/acme-corp" },
    { key: "supportEmail", label: "Support Email", type: "email", icon: Mail, placeholder: "support@acme.com" },
  ],
  [
    { key: "adminName", label: "Your Name", type: "text", icon: User, placeholder: "John Doe" },
    { key: "adminEmail", label: "Your Email", type: "email", icon: Mail, placeholder: "john@acme.com" },
    { key: "password", label: "Password", type: "password", icon: Lock, placeholder: "Min. 6 characters" },
  ],
];

const RegisterForm = () => {
  const { registerTenant, loading } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", slug: "", supportEmail: "", adminName: "", adminEmail: "", password: "",
  });

  const generateSlug = (v) =>
    v.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const set = (key) => (e) => {
    const value = e.target.value;
    if (key === "name") {
      setForm((p) => ({ ...p, name: value, slug: generateSlug(value) }));
    } else {
      setForm((p) => ({ ...p, [key]: value }));
    }
  };

  const currentFields = STEP_FIELDS[step];
  const isCurrentValid = currentFields.every((f) => form[f.key].trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 1) { if (isCurrentValid) setStep(1); return; }
    if (!isCurrentValid || loading) return;
    registerTenant(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Create workspace</h2>
        <p className="text-sm text-zinc-400 mt-1">Set up your company on SupportDesk</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-1.5">
        {[0, 1].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-white" : "bg-white/10"}`}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-400 font-medium">Step {step + 1} of 2 — {step === 0 ? "Company info" : "Admin account"}</p>

      {/* Fields */}
      {currentFields.map(({ key, label, type, icon: Icon, placeholder, hint }) => (
        <div key={key}>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">{label}</label>
          <div className="relative">
            <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={set(key)}
              required
              className="w-full h-10 pl-8 pr-3 text-sm bg-[#0a0a0c] text-white border border-white/10 rounded-[10px] focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 font-medium"
            />
          </div>
          {hint && <p className="text-xs text-zinc-500 mt-1.5 font-mono">{hint}</p>}
        </div>
      ))}

      {/* Actions */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="flex-1 h-10 border border-white/10 text-white text-sm font-semibold rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <button
          type="submit"
          disabled={!isCurrentValid || loading}
          className="flex-1 h-10 bg-white text-black text-sm font-semibold rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          {loading ? "Creating..." : step < 1 ? (<>Next <ArrowRight size={14} /></>) : "Create Workspace"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
