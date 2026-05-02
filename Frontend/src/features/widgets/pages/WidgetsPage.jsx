import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/components/layout/DashboardLayout";
import { useWidgets } from "../hooks/useWidgets";
import Modal from "../../../shared/components/ui/Modal";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Badge from "../../../shared/components/ui/Badge";
import Spinner from "../../../shared/components/ui/Spinner";
import {
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Key,
  MessageSquare,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";

// Simple widget preview component for the grid
const WidgetPreview = ({ widget }) => {
  const {
    primaryColor = "#007bff",
    backgroundColor = "#ffffff",
    borderRadius = 12,
    title = "Support",
    subtitle = "We reply fast",
    welcomeMessage = "Hi there 👋",
    position = "bottom-right",
  } = widget;

  const isRight = position.includes("right");
  const isBottom = position.includes("bottom");

  return (
    <div className="relative w-full h-40 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb] overflow-hidden group">
      {/* Preview Label */}
      <span className="absolute top-2 left-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
        Preview
      </span>

      {/* Widget Box */}
      <div
        className={`absolute ${
          isBottom ? "bottom-2" : "top-2"
        } ${isRight ? "right-2" : "left-2"} w-[200px] shadow-md border flex flex-col overflow-hidden transition-transform group-hover:scale-[1.02]`}
        style={{
          backgroundColor,
          borderRadius,
        }}
      >
        {/* Header */}
        <div
          className="px-2.5 py-2 text-white text-[11px]"
          style={{ backgroundColor: primaryColor }}
        >
          <p className="font-semibold truncate">{title}</p>
          <p className="opacity-80 text-[10px] truncate">{subtitle}</p>
        </div>

        {/* Chat bubble */}
        <div className="p-2 text-[10px]">
          <div className="bg-gray-100 px-2 py-1 rounded-md inline-block max-w-full break-words">
            {welcomeMessage}
          </div>
        </div>

        {/* Input */}
        <div className="border-t px-2 py-1">
          <div className="h-5 bg-gray-100 rounded-full" />
        </div>
      </div>

      {/* Floating Button */}
      <div
        className={`absolute ${
          isBottom ? "bottom-2" : "top-2"
        } ${isRight ? "right-2" : "left-2"}`}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageSquare size={14} />
        </div>
      </div>
    </div>
  );
};

const INITIAL_FORM = {
  name: "",
  description: "",
  primaryColor: "#111111",
  secondaryColor: "#6c757d",
  textColor: "#212529",
  backgroundColor: "#ffffff",
  borderRadius: 8,
  title: "Chat with us",
  subtitle: "We are here to help",
  welcomeMessage: "Hello! How can we help you today?",
  position: "bottom-right",
  width: 350,
  height: 500,
  
  showAvatar: true,
  showTimestamps: true,
  allowedDomains: "",
  isActive: true,
};

// Reusable Widget Form Fields
const WidgetFormFields = ({ form, setForm }) => (
  <div className="space-y-5">
    {/* BASIC */}
    <Input
      label="Widget Name"
      required
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    <Input
      label="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    {/* COLORS */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        ["primaryColor", "Primary"],
        ["secondaryColor", "Secondary"],
        ["textColor", "Text"],
        ["backgroundColor", "Background"],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="text-xs font-medium mb-1 block">{label}</label>
          <input
            type="color"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full h-10 rounded-lg border"
          />
        </div>
      ))}
    </div>

    {/* SIZE */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Input
        label="Width"
        type="number"
        value={form.width}
        onChange={(e) => setForm({ ...form, width: +e.target.value })}
      />
      <Input
        label="Height"
        type="number"
        value={form.height}
        onChange={(e) => setForm({ ...form, height: +e.target.value })}
      />
      <Input
        label="Radius"
        type="number"
        value={form.borderRadius}
        onChange={(e) => setForm({ ...form, borderRadius: +e.target.value })}
      />
    </div>

    {/* POSITION */}
    <select
      value={form.position}
      onChange={(e) => setForm({ ...form, position: e.target.value })}
      className="w-full h-10 px-3 border rounded-lg"
    >
      {["bottom-right", "bottom-left", "top-right", "top-left"].map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>

    {/* CONTENT */}
    <Input
      label="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />

    <Input
      label="Subtitle"
      value={form.subtitle}
      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
    />

    <textarea
      value={form.welcomeMessage}
      onChange={(e) => setForm({ ...form, welcomeMessage: e.target.value })}
      className="w-full p-2 border rounded-lg text-sm"
      rows={3}
    />

    {/* TOGGLES */}
    <div className="flex flex-col sm:flex-row gap-3 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.showAvatar}
          onChange={(e) => setForm({ ...form, showAvatar: e.target.checked })}
        />
        Show Avatar
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.showTimestamps}
          onChange={(e) =>
            setForm({ ...form, showTimestamps: e.target.checked })
          }
        />
        Show Timestamps
      </label>
    </div>

    {/* DOMAINS */}
    <Input
      label="Allowed Domains"
      value={form.allowedDomains}
      onChange={(e) => setForm({ ...form, allowedDomains: e.target.value })}
      placeholder="example.com, mysite.com"
    />

    {/* ACTIVE */}
    {"isActive" in form && (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        Active Widget
      </label>
    )}
  </div>
);

const WidgetsPage = () => {
  const {
    widgets,
    loading,
    fetchWidgets,
    createWidget,
    updateWidget,
    deleteWidget,
    getApiKeys,
  } = useWidgets();

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(INITIAL_FORM);
  const [creating, setCreating] = useState(false);

  // Edit modal state
  const [editWidget, setEditWidget] = useState(null); // holds the widget being edited
  const [editForm, setEditForm] = useState(INITIAL_FORM);
  const [updating, setUpdating] = useState(false);

  // API Keys modal state
  const [keysModalWidget, setKeysModalWidget] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [keysLoading, setKeysLoading] = useState(false);
  const [showKeys, setShowKeys] = useState({});

  useEffect(() => {
    fetchWidgets();
  }, []);

  const formatPayload = (form) => ({
    ...form,
    allowedDomains: form.allowedDomains
      ? form.allowedDomains.split(",").map((d) => d.trim())
      : [],
  });

  // ── Create ──────────────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createWidget(formatPayload(createForm));
      setIsCreateOpen(false);
      setCreateForm(INITIAL_FORM);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create widget");
    } finally {
      setCreating(false);
    }
  };

  // ── Edit ────────────────────────────────────────────────────────────────────
  const openEdit = (widget) => {
    setEditWidget(widget);
    setEditForm({
      name: widget.name ?? "",
      description: widget.description ?? "",
      primaryColor: widget.primaryColor ?? "#111111",
      title: widget.title ?? "Chat with us",
      subtitle: widget.subtitle ?? "We are here to help",
      welcomeMessage:
        widget.welcomeMessage ?? "Hello! How can we help you today?",
      position: widget.position ?? "bottom-right",
      width: widget.width ?? 350,
      height: widget.height ?? 500,
      allowedDomains: (widget.allowedDomains ?? []).join(", "),
      secondaryColor: widget.secondaryColor ?? "#6c757d",
      textColor: widget.textColor ?? "#212529",
      backgroundColor: widget.backgroundColor ?? "#ffffff",
      borderRadius: widget.borderRadius ?? 8,
      showAvatar: widget.showAvatar !== false,
      showTimestamps: widget.showTimestamps !== false,
      isActive: widget.isActive ?? true,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateWidget(editWidget._id, formatPayload(editForm)); // hook handles Redux update + toast
      await fetchWidgets(); // ensure latest data from server
      setEditWidget(null); // close modal
      setEditForm(INITIAL_FORM); // reset form so old data doesn't linger
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update widget");
    } finally {
      setUpdating(false);
    }
  };

  // ── API Keys ─────────────────────────────────────────────────────────────────
  const openKeys = async (widget) => {
    setKeysModalWidget(widget);
    setKeysLoading(true);
    try {
      const keys = await getApiKeys(widget._id);
      setApiKeys(keys);
    } finally {
      setKeysLoading(false);
    }
  };

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111111]">
            Chat Widgets
          </h1>
          <p className="text-sm text-[#6b7280] mt-1">
            Create and manage embeddable chat widgets for your website.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Plus size={16} /> New Widget
        </Button>
      </div>

      {/* Widget Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-[#f3f4f6] rounded-2xl flex items-center justify-center mb-4">
            <MessageSquare size={24} className="text-[#9ca3af]" />
          </div>
          <h3 className="text-sm font-semibold text-[#111111] mb-1">
            No widgets yet
          </h3>
          <p className="text-sm text-[#6b7280] mb-4">
            Create your first chat widget to embed on your website.
          </p>
          <Button onClick={() => setIsCreateOpen(true)} size="sm">
            <Plus size={14} /> Create Widget
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget._id}
              className="bg-white border border-[#e5e7eb] rounded-[14px] p-4 sm:p-5 hover:shadow-md transition-all duration-200"
            >
              {/* Preview */}
              <WidgetPreview widget={widget} />

              <div className="mt-4">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      {widget.name}
                    </h3>
                    {widget.description && (
                      <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">
                        {widget.description}
                      </p>
                    )}
                  </div>

                  <Badge variant={widget.isActive ? "active" : "inactive"} dot>
                    {widget.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Meta Info */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#f3f4f6] rounded-md text-xs text-[#6b7280]">
                    {widget.position}
                  </span>
                  <span className="px-2 py-1 bg-[#f3f4f6] rounded-md text-xs text-[#6b7280]">
                    {widget.width}×{widget.height}px
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openKeys(widget)}
                    className="flex items-center gap-1.5"
                  >
                    <Key size={13} /> API Keys
                  </Button>

                  <button
                    onClick={() => openEdit(widget)}
                    className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#111111] hover:bg-[#f3f4f6] transition-colors"
                    title="Edit widget"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => deleteWidget(widget._id)}
                    className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
                    title="Delete widget"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create Widget Modal ─────────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Chat Widget"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="create-widget-form" loading={creating}>
              Create Widget
            </Button>
          </>
        }
      >
        <form id="create-widget-form" onSubmit={handleCreate}>
          <WidgetFormFields form={createForm} setForm={setCreateForm} />
        </form>
      </Modal>

      {/* ── Edit Widget Modal ───────────────────────────────────────────────── */}
      <Modal
        isOpen={!!editWidget}
        onClose={() => setEditWidget(null)}
        title={`Edit Widget — ${editWidget?.name}`}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditWidget(null)}>
              Cancel
            </Button>
            <Button type="submit" form="edit-widget-form" loading={updating}>
              Save Changes
            </Button>
          </>
        }
      >
        <form id="edit-widget-form" onSubmit={handleUpdate}>
          <WidgetFormFields form={editForm} setForm={setEditForm} />
        </form>
      </Modal>

      {/* ── API Keys Modal ──────────────────────────────────────────────────── */}
      <Modal
        isOpen={!!keysModalWidget}
        onClose={() => setKeysModalWidget(null)}
        title={`API Keys — ${keysModalWidget?.name}`}
        size="md"
      >
        {keysLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner />
          </div>
        ) : apiKeys.length === 0 ? (
          <p className="text-sm text-[#6b7280] text-center py-6">
            No API keys found for this widget.
          </p>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key._id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#111111] mb-0.5">
                    {key.name}
                  </p>
                  <code className="text-xs text-[#6b7280] font-mono break-all whitespace-normal">
                    {showKeys[key._id] ? key.key : "••••••••••••••••••••••••"}
                  </code>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setShowKeys((s) => ({ ...s, [key._id]: !s[key._id] }))
                    }
                  >
                    {showKeys[key._id] ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>

                  {key.key && (
                    <button onClick={() => copyKey(key.key)}>
                      <Copy
                        size={14}
                        className="text-[#9ca3af] hover:text-[#111111] transition-colors"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 p-4 bg-[#f8f9fa] rounded-[10px] border border-[#e5e7eb]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#111111]">Embed Code</p>
            <button
              onClick={() =>
                copyKey(
                  `<script src="http://localhost:5173/widget.js" data-api-key="${apiKeys[0]?.key || "YOUR_API_KEY"}" id="support-desk-widget"></script>`,
                )
              }
              className="flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-[#111111] transition-colors font-medium"
            >
              <Copy size={12} /> Copy Code
            </button>
          </div>
          <code className="text-[11px] text-[#6b7280] break-all font-mono block bg-white p-2.5 rounded border border-[#e5e7eb]">
            {`<script src="http://localhost:5173/widget.js" data-api-key="${apiKeys[0]?.key || "YOUR_API_KEY"}" id="support-desk-widget"></script>`}
          </code>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default WidgetsPage;
