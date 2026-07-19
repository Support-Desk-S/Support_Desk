import { Building2 } from "lucide-react";
import { useSelector } from "react-redux";

const WorkspaceSection = () => {
  const { currentTenant } = useSelector((state) => state.tenant);

  return (
    <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6">
      <div className="flex items-center gap-2 mb-5 text-white">
        <Building2 size={16} className="text-zinc-400" />
        <h2 className="text-sm font-semibold">Workspace</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] mb-1.5 font-bold uppercase tracking-wider text-zinc-400">
            Company Name
          </p>
          <input
            value={currentTenant?.name}
            disabled
            className="w-full border border-white/5 bg-[#09090b] rounded-[10px] px-3.5 py-2.5 text-xs font-semibold text-zinc-500 opacity-60 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <p className="text-[10px] mb-1.5 font-bold uppercase tracking-wider text-zinc-400">
            Support Email
          </p>
          <input
            value={currentTenant?.supportEmail}
            disabled
            className="w-full border border-white/5 bg-[#09090b] rounded-[10px] px-3.5 py-2.5 text-xs font-semibold text-zinc-500 opacity-60 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-[10px] mb-1.5 font-bold uppercase tracking-wider text-zinc-400">
            Workspace Slug
          </p>
          <code className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-[8px] text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
            /{currentTenant?.slug}
          </code>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSection;
