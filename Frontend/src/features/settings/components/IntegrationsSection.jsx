import React, { useState } from "react";
import { Plug, Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateIntegrationsApi } from "../../tenant/services/tenant.service";
import { setTenant } from "../../tenant/state/tenantSlice";
import { useConfirm } from "../../../app/context/ConfirmContext";
import Button from "../../../shared/components/ui/Button";

const IntegrationsSection = () => {
  const { confirm } = useConfirm();
  const { currentTenant } = useSelector((state) => state.tenant);
  const dispatch = useDispatch();

  const [integrations, setIntegrations] = useState(
    currentTenant?.integrations || [],
  );
  const [expandedIntegrations, setExpandedIntegrations] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleExpand = (index) => {
    setExpandedIntegrations((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleAddIntegration = () => {
    const newIndex = integrations.length;
    setIntegrations([
      ...integrations,
      {
        name: "",
        baseUrl: "",
        auth: { type: "none", key: "", headerName: "" },
        endpoints: [],
      },
    ]);
    setExpandedIntegrations([...expandedIntegrations, newIndex]);
  };

  const handleRemoveIntegration = (index) => {
    const newIntegrations = [...integrations];
    newIntegrations.splice(index, 1);
    setIntegrations(newIntegrations);
  };

  const handleIntegrationChange = (index, field, value) => {
    const newIntegrations = [...integrations];
    newIntegrations[index][field] = value;
    setIntegrations(newIntegrations);
  };

  const handleAuthChange = (index, field, value) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].auth = {
      ...newIntegrations[index].auth,
      [field]: value,
    };
    setIntegrations(newIntegrations);
  };

  const handleAddEndpoint = (integrationIndex) => {
    const newIntegrations = [...integrations];
    newIntegrations[integrationIndex].endpoints.push({
      name: "",
      path: "",
      method: "GET",
      description: "",
      params: [],
    });
    setIntegrations(newIntegrations);
  };

  const handleRemoveEndpoint = (iIndex, eIndex) => {
    const newIntegrations = [...integrations];
    newIntegrations[iIndex].endpoints.splice(eIndex, 1);
    setIntegrations(newIntegrations);
  };

  const handleEndpointChange = (iIndex, eIndex, field, value) => {
    const newIntegrations = [...integrations];
    newIntegrations[iIndex].endpoints[eIndex][field] = value;
    setIntegrations(newIntegrations);
  };

  const handleAddParam = (iIndex, eIndex) => {
    const newIntegrations = [...integrations];
    newIntegrations[iIndex].endpoints[eIndex].params.push({
      name: "",
      type: "string",
      required: false,
    });
    setIntegrations(newIntegrations);
  };

  const handleRemoveParam = (iIndex, eIndex, pIndex) => {
    const newIntegrations = [...integrations];
    newIntegrations[iIndex].endpoints[eIndex].params.splice(pIndex, 1);
    setIntegrations(newIntegrations);
  };

  const handleParamChange = (iIndex, eIndex, pIndex, field, value) => {
    const newIntegrations = [...integrations];
    newIntegrations[iIndex].endpoints[eIndex].params[pIndex][field] = value;
    setIntegrations(newIntegrations);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const response = await updateIntegrationsApi(integrations);

      if (response.data?.success) {
        dispatch(setTenant(response.data.data));

        // Optionally reset API keys to empty strings to avoid showing encrypted ones
        const cleanedIntegrations = (response.data.data?.integrations || []).map((int) => {
          return {
            ...int,
            auth: int.auth ? { ...int.auth, key: "" } : { type: "none", key: "", headerName: "" }
          };
        });

        setIntegrations(cleanedIntegrations);
        setExpandedIntegrations([]);
        setSuccess("Integrations saved successfully!");
      } else {
        setError(response.data?.message || "Failed to save integrations.");
      }
    } catch (err) {
      console.error("Integration Save Error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to save integrations.";
      setError(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-white">
          <Plug size={18} className="text-zinc-400" />
          <h2 className="text-sm font-semibold">API Integrations</h2>
        </div>

        <Button
          onClick={handleAddIntegration}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Integration
        </Button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}
      {success && (
        <div className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          {success}
        </div>
      )}

      {integrations.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">
          No integrations configured. Add one to enable custom API tools for AI.
        </p>
      ) : (
        <div className="space-y-6">
          {integrations.map((integration, iIndex) => {
            const isExpanded = expandedIntegrations.includes(iIndex);
            return (
              <div
                key={iIndex}
                className="border border-white/5 rounded-[12px] overflow-hidden"
              >
                <div
                  className="flex justify-between items-center bg-[#0c0c0e] p-4 cursor-pointer hover:bg-[#121214] transition-colors"
                  onClick={() => toggleExpand(iIndex)}
                >
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm text-white">
                      {integration.name || `Integration ${iIndex + 1}`}
                    </h3>
                    {integration.baseUrl && (
                      <span className="text-xs text-zinc-400 mt-1 font-mono">{integration.baseUrl}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleExpand(iIndex); }}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      <span className="hidden sm:inline">{isExpanded ? "Collapse" : "Edit"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();

                        const ok = await confirm({
                          title: "Remove Integration",
                          message: "This integration will be removed permanently. This action cannot be undone.",
                        });

                        if (!ok) return;

                        handleRemoveIntegration(iIndex);
                      }}
                      className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded cursor-pointer transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 space-y-4 border-t border-white/5 bg-[#09090b]">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase mb-1.5 font-semibold text-zinc-400">
                          Name
                        </label>
                        <input
                          value={integration.name}
                          onChange={(e) =>
                            handleIntegrationChange(iIndex, "name", e.target.value)
                          }
                          placeholder="e.g. Stripe API"
                          className="w-full bg-[#09090b] border border-white/5 text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase mb-1.5 font-semibold text-zinc-400">
                          Base URL
                        </label>
                        <input
                          value={integration.baseUrl}
                          onChange={(e) =>
                            handleIntegrationChange(iIndex, "baseUrl", e.target.value)
                          }
                          placeholder="https://api.example.com"
                          className="w-full bg-[#09090b] border border-white/5 text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 font-mono"
                        />
                      </div>
                    </div>
 
                    {/* Auth Settings */}
                    <div className="bg-white/5 p-4 rounded-[12px] border border-white/5 space-y-3">
                      <h4 className="text-xs font-semibold text-white">Authentication</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase mb-1.5 font-semibold text-zinc-400">
                            Auth Type
                          </label>
                          <select
                            value={integration.auth.type}
                            onChange={(e) =>
                              handleAuthChange(iIndex, "type", e.target.value)
                            }
                            className="w-full bg-[#09090b] border border-white/5 text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 cursor-pointer"
                          >
                            <option value="none">None</option>
                            <option value="bearer">Bearer Token</option>
                            <option value="apiKey">API Key</option>
                          </select>
                        </div>
                        {integration.auth.type !== "none" && (
                          <>
                            <div>
                              <label className="block text-[10px] uppercase mb-1.5 font-semibold text-zinc-400">
                                Key
                              </label>
                              <input
                                type="password"
                                value={integration.auth.key}
                                onChange={(e) =>
                                  handleAuthChange(iIndex, "key", e.target.value)
                                }
                                placeholder={
                                  integration.auth.key
                                    ? "Encrypted (Edit to change)"
                                    : "Enter secret key"
                                }
                                className="w-full bg-[#09090b] border border-white/5 text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 font-mono"
                              />
                            </div>
                            {integration.auth.type === "apiKey" && (
                              <div>
                                <label className="block text-[10px] uppercase mb-1.5 font-semibold text-zinc-400">
                                  Header Name
                                </label>
                                <input
                                  value={integration.auth.headerName}
                                  onChange={(e) =>
                                    handleAuthChange(
                                      iIndex,
                                      "headerName",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g. x-api-key"
                                  className="w-full bg-[#09090b] border border-white/5 text-white rounded-[10px] px-3.5 py-2.5 text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Endpoints */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-semibold text-white">Endpoints (Tools)</h4>
                        <button
                          onClick={() => handleAddEndpoint(iIndex)}
                          className="text-xs text-white hover:text-zinc-200 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Plus size={12} /> Add Endpoint
                        </button>
                      </div>

                      {integration.endpoints.map((endpoint, eIndex) => (
                        <div
                          key={eIndex}
                          className="bg-[#09090b] p-4 rounded-[12px] border border-white/5 space-y-3 relative shadow-inner"
                        >
                          <button
                            onClick={() => handleRemoveEndpoint(iIndex, eIndex)}
                            className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 cursor-pointer"
                          >
                            <X size={14} />
                          </button>

                          <div className="grid md:grid-cols-3 gap-3 pr-6">
                            <div>
                              <label className="block text-[10px] uppercase mb-1 text-zinc-400 font-semibold">
                                Tool Name (Unique)
                              </label>
                              <input
                                value={endpoint.name}
                                onChange={(e) =>
                                  handleEndpointChange(
                                    iIndex,
                                    eIndex,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. getOrderStatus"
                                className="w-full bg-[#09090b] border border-white/5 text-white rounded-[8px] px-3.5 py-2 text-xs placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase mb-1 text-zinc-400 font-semibold">
                                Method
                              </label>
                              <select
                                value={endpoint.method}
                                onChange={(e) =>
                                  handleEndpointChange(
                                    iIndex,
                                    eIndex,
                                    "method",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-[#09090b] border border-white/5 text-white rounded-[8px] px-3.5 py-2 text-xs focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 cursor-pointer"
                              >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase mb-1 text-zinc-400 font-semibold">
                                Path
                              </label>
                              <input
                                value={endpoint.path}
                                onChange={(e) =>
                                  handleEndpointChange(
                                    iIndex,
                                    eIndex,
                                    "path",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. /orders/:id"
                                className="w-full bg-[#09090b] border border-white/5 text-white rounded-[8px] px-3.5 py-2 text-xs placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase mb-1 text-zinc-400 font-semibold">
                              Description for AI
                            </label>
                            <input
                              value={endpoint.description}
                              onChange={(e) =>
                                handleEndpointChange(
                                  iIndex,
                                  eIndex,
                                  "description",
                                  e.target.value,
                                )
                              }
                              placeholder="Explain when and how AI should use this tool..."
                              className="w-full bg-[#09090b] border border-white/5 text-white rounded-[8px] px-3.5 py-2 text-xs placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
                            />
                          </div>

                          {/* Parameters */}
                          <div className="pt-3 border-t border-white/5">
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-[10px] uppercase text-zinc-400 font-semibold">
                                Parameters
                              </label>
                              <button
                                onClick={() => handleAddParam(iIndex, eIndex)}
                                className="text-[10px] text-white flex items-center hover:underline cursor-pointer"
                              >
                                <Plus size={10} className="mr-1" /> Add Param
                              </button>
                            </div>

                            {endpoint.params.length > 0 && (
                              <div className="space-y-2">
                                {endpoint.params.map((param, pIndex) => (
                                  <div
                                    key={pIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      value={param.name}
                                      onChange={(e) =>
                                        handleParamChange(
                                          iIndex,
                                          eIndex,
                                          pIndex,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Param name"
                                      className="flex-1 bg-[#09090b] border border-white/5 text-white rounded-[8px] px-3.5 py-2 text-xs placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200"
                                    />
                                    <select
                                      value={param.type}
                                      onChange={(e) =>
                                        handleParamChange(
                                          iIndex,
                                          eIndex,
                                          pIndex,
                                          "type",
                                          e.target.value,
                                        )
                                      }
                                      className="w-24 bg-[#09090b] border border-white/5 text-white rounded-[8px] px-2 py-2 text-xs focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e] transition-all duration-200 cursor-pointer"
                                    >
                                      <option value="string">String</option>
                                      <option value="number">Number</option>
                                      <option value="boolean">Boolean</option>
                                    </select>
                                    <label className="flex items-center gap-1.5 text-[10px] text-zinc-400 cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={param.required}
                                        onChange={(e) =>
                                          handleParamChange(
                                            iIndex,
                                            eIndex,
                                            pIndex,
                                            "required",
                                            e.target.checked,
                                          )
                                        }
                                        className="rounded border-white/5 bg-[#09090b] text-white accent-white"
                                      />
                                      Req.
                                    </label>
                                    <button
                                      onClick={() =>
                                        handleRemoveParam(iIndex, eIndex, pIndex)
                                      }
                                      className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-end pt-4 border-t border-white/5">
            <Button
              onClick={handleSave}
              loading={isSaving}
              size="md"
            >
              Save Integrations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsSection;
