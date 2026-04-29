import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import InputField from "./InputField";
import { Loader2, Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isDisabled = loading || !form.email.trim() || !form.password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-gray-500 text-sm">Login to your account</p>
      </div>

      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <InputField
          placeholder="Email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          className="pl-10"
        />
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(v) => handleChange("password", v)}
          className="pl-10"
        />
      </div>

      <button
        disabled={isDisabled}
        className="w-full cursor-pointer disabled:cursor-not-allowed bg-white text-black py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Logging in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
