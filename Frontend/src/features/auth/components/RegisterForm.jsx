import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import InputField from "./InputField";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Link,
  Mail,
  User,
  Lock,
} from "lucide-react";

const RegisterForm = () => {
  const { registerTenant, loading } = useAuth();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    supportEmail: "",
    adminName: "",
    adminEmail: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const isStep1Valid = form.name && form.slug && form.supportEmail;
  const isStep2Valid = form.adminName && form.adminEmail && form.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading || !isStep2Valid) return;
    registerTenant(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Create workspace</h2>
        <p className="text-gray-500 text-sm">Setup your company</p>
      </div>

      {/* STEP INDICATOR */}
      <div className="flex justify-between text-xs text-gray-600">
        <span className={step === 1 ? "text-white" : ""}>Company</span>
        <span className={step === 2 ? "text-white" : ""}>Admin</span>
      </div>

      {step === 1 && (
        <>
          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              placeholder="Company Name"
              value={form.name}
              onChange={(v) => {
                handleChange("name", v);
                handleChange("slug", generateSlug(v));
              }}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Link
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              placeholder="Slug"
              value={form.slug}
              onChange={(v) => handleChange("slug", v)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              placeholder="Support Email"
              value={form.supportEmail}
              onChange={(v) => handleChange("supportEmail", v)}
              className="pl-10"
            />
          </div>

          <button
            type="button"
            disabled={!isStep1Valid}
            onClick={() => setStep(2)}
            className=" disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2"
          >
            Next <ArrowRight size={18} />
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              placeholder="Admin Name"
              value={form.adminName}
              onChange={(v) => handleChange("adminName", v)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              placeholder="Admin Email"
              value={form.adminEmail}
              onChange={(v) => handleChange("adminEmail", v)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <InputField
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(v) => handleChange("password", v)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/2 border border-gray-700 py-3 cursor-pointer rounded-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              disabled={loading || !isStep2Valid}
              className="w-1/2 bg-white text-black py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
