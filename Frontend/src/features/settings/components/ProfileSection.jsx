import { Settings } from "lucide-react";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-(--color-bg-surface) border border-(--color-secondary) rounded-[14px] p-6">
      <div className="flex items-center gap-2 mb-5">
        <Settings size={16} />
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p className="text-xs mb-1 text-(--color-text-secondary)">Name</p>
          <input
            defaultValue={user?.name}
            className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <p className="text-xs mb-1 text-(--color-text-secondary)">Email</p>
          <input
            value={user?.email}
            disabled
            className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
