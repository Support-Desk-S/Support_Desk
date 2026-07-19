import { Shield } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hooks/useAuth";
import Button from "../../../shared/components/ui/Button";

const SecuritySection = () => {
  const { updatePassword, loading } = useAuth();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdate = async () => {
    if (!form.oldPassword || !form.newPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Confirm Passwords do not match");
    }

    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    await updatePassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });

    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-5 text-white">
        <Shield size={16} className="text-zinc-400" />
        <h2 className="text-sm font-semibold">Change Password</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <input
          type="password"
          placeholder="Current Password"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
          className="w-full border border-white/5 bg-[#09090b] text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          className="w-full border border-white/5 bg-[#09090b] text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full border border-white/5 bg-[#09090b] text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 md:col-span-2"
        />
      </div>

      <Button
        onClick={handleUpdate}
        loading={loading}
        className="mt-5"
        size="sm"
      >
        Update Password
      </Button>
    </div>
  );
};

export default SecuritySection;