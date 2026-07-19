import { Settings } from "lucide-react";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6">
      <div className="flex items-center gap-2 mb-5 text-white">
        <Settings size={16} className="text-zinc-400" />
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] mb-1.5 font-bold uppercase tracking-wider text-zinc-400">Name</p>
          <input
            defaultValue={user?.name}
            disabled
            className="w-full border border-white/5 bg-[#09090b] rounded-[10px] px-3.5 py-2.5 text-xs font-semibold text-zinc-500 opacity-60 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <p className="text-[10px] mb-1.5 font-bold uppercase tracking-wider text-zinc-400">Email</p>
          <input
            value={user?.email}
            disabled
            className="w-full border border-white/5 bg-[#09090b] rounded-[10px] px-3.5 py-2.5 text-xs font-semibold text-zinc-500 opacity-60 cursor-not-allowed focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
