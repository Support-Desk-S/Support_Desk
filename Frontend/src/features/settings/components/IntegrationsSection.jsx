import React, { useState } from "react";
import { Plug, Plus, Trash2, Save, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateIntegrationsApi } from "../../tenant/services/tenant.service";
import { setTenant } from "../../tenant/state/tenantSlice";

const IntegrationsSection = () => {
  const { currentTenant } = useSelector((state) => state.tenant);
  const dispatch = useDispatch();

  const [integrations, setIntegrations] = useState(
    currentTenant?.integrations || [],
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddIntegration = () => {
    setIntegrations([
      ...integrations,
      {
        name: "",
        baseUrl: "",
        auth: { type: "none", key: "", headerName: "" },
        endpoints: [],
      },
    ]);
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
      dispatch(setTenant(response.data.data));
      setSuccess("Integrations saved successfully!");
      // Optionally reset API keys to empty strings to avoid showing encrypted ones
      const cleanedIntegrations = response.data.data.integrations.map((int) => {
        if (int.auth) int.auth.key = "";
        return int;
      });
      setIntegrations(cleanedIntegrations);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save integrations.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-(--color-bg-surface) border border-(--color-secondary) rounded-[14px] p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Plug size={18} className="text-(--color-primary)" />
          <h2 className="text-sm font-semibold">API Integrations</h2>
        </div>

        <button
          onClick={handleAddIntegration}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-(--color-primary) text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Integration
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-100/10 p-3 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 text-sm bg-green-100/10 p-3 rounded-lg border border-green-500/20">
          {success}
        </div>
      )}

      {integrations.length === 0 ? (
        <p className="text-sm text-(--color-text-secondary) text-center py-6">
          No integrations configured. Add one to enable custom API tools for AI.
        </p>
      ) : (
        <div className="space-y-6">
          {integrations.map((integration, iIndex) => (
            <div
              key={iIndex}
              className="border border-(--color-secondary) rounded-[10px] p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">
                  Integration {iIndex + 1}
                </h3>
                <button
                  onClick={() => handleRemoveIntegration(iIndex)}
                  className="text-red-500 hover:bg-red-500/10 p-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1 text-(--color-text-secondary)">
                    Name
                  </label>
                  <input
                    value={integration.name}
                    onChange={(e) =>
                      handleIntegrationChange(iIndex, "name", e.target.value)
                    }
                    placeholder="e.g. Stripe API"
                    className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-(--color-primary)"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-(--color-text-secondary)">
                    Base URL
                  </label>
                  <input
                    value={integration.baseUrl}
                    onChange={(e) =>
                      handleIntegrationChange(iIndex, "baseUrl", e.target.value)
                    }
                    placeholder="https://api.example.com"
                    className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-(--color-primary)"
                  />
                </div>
              </div>

              {/* Auth Settings */}
              <div className="bg-(--color-bg-default) p-4 rounded-lg border border-(--color-secondary) space-y-3">
                <h4 className="text-xs font-semibold">Authentication</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
                      Auth Type
                    </label>
                    <select
                      value={integration.auth.type}
                      onChange={(e) =>
                        handleAuthChange(iIndex, "type", e.target.value)
                      }
                      className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[8px] px-3 py-1.5 text-sm"
                    >
                      <option value="none">None</option>
                      <option value="bearer">Bearer Token</option>
                      <option value="apiKey">API Key</option>
                    </select>
                  </div>
                  {integration.auth.type !== "none" && (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                          className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[8px] px-3 py-1.5 text-sm"
                        />
                      </div>
                      {integration.auth.type === "apiKey" && (
                        <div>
                          <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                            className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[8px] px-3 py-1.5 text-sm"
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
                  <h4 className="text-xs font-semibold">Endpoints (Tools)</h4>
                  <button
                    onClick={() => handleAddEndpoint(iIndex)}
                    className="text-xs text-(--color-primary) flex items-center gap-1 hover:underline"
                  >
                    <Plus size={12} /> Add Endpoint
                  </button>
                </div>

                {integration.endpoints.map((endpoint, eIndex) => (
                  <div
                    key={eIndex}
                    className="bg-(--color-bg-default) p-4 rounded-lg border border-(--color-secondary) space-y-3 relative"
                  >
                    <button
                      onClick={() => handleRemoveEndpoint(iIndex, eIndex)}
                      className="absolute top-3 right-3 text-(--color-text-secondary) hover:text-red-500"
                    >
                      <X size={14} />
                    </button>

                    <div className="grid md:grid-cols-3 gap-3 pr-6">
                      <div>
                        <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                          className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[6px] px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                          className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[6px] px-2 py-1 text-xs"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                          className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[6px] px-2 py-1 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase mb-1 text-(--color-text-secondary)">
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
                        className="w-full bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[6px] px-2 py-1 text-xs"
                      />
                    </div>

                    {/* Parameters */}
                    <div className="pt-2 border-t border-(--color-secondary)">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] uppercase text-(--color-text-secondary)">
                          Parameters
                        </label>
                        <button
                          onClick={() => handleAddParam(iIndex, eIndex)}
                          className="text-[10px] text-(--color-primary) flex items-center hover:underline"
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
                                className="flex-1 bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[4px] px-2 py-1 text-xs"
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
                                className="w-24 bg-(--color-bg-subtle) border border-(--color-secondary) rounded-[4px] px-1 py-1 text-xs"
                              >
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                              </select>
                              <label className="flex items-center gap-1 text-[10px]">
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
                                />
                                Req.
                              </label>
                              <button
                                onClick={() =>
                                  handleRemoveParam(iIndex, eIndex, pIndex)
                                }
                                className="text-red-500 p-1"
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
          ))}

          <div className="flex justify-end pt-4 border-t border-(--color-secondary)">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-(--color-primary) text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              <Save size={16} /> {isSaving ? "Saving..." : "Save Integrations"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsSection;
