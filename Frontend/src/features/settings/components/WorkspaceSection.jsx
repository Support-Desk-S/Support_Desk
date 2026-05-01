import { Building2 } from "lucide-react";
import { useSelector } from "react-redux";

const WorkspaceSection = () => {
  const { currentTenant } = useSelector((state) => state.tenant);

  return (
    <div className="bg-(--color-bg-surface) border border-(--color-secondary) rounded-[14px] p-6">
      <div className="flex items-center gap-2 mb-5">
        <Building2 size={16} />
        <h2 className="text-sm font-semibold">Workspace</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p className="text-xs mb-1 text-(--color-text-secondary)">
            Company Name
          </p>
          <input
            value={currentTenant?.name}
            disabled
            className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <p className="text-xs mb-1 text-(--color-text-secondary)">
            Support Email
          </p>
          <input
            value={currentTenant?.supportEmail}
            disabled
            className="w-full border border-(--color-secondary) rounded-[10px] px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-xs mb-1 text-(--color-text-secondary)">
            Workspace Slug
          </p>
          <code className="bg-(--color-bg-subtle) px-3 py-1 rounded-lg text-sm">
            /{currentTenant?.slug}
          </code>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSection;
