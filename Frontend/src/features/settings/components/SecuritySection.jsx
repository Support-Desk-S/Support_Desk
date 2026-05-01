import { Shield } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hooks/useAuth";

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
    <div className="bg-(--color-bg-surface) border border-(--color-secondary) rounded-[14px] p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-5">
        <Shield size={16} />
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
          className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm"
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm md:col-span-2"
        />
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-5 bg-(--color-primary) text-(--color-primary-fg) cursor-pointer px-4 py-2 rounded-[10px] text-sm"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default SecuritySection;