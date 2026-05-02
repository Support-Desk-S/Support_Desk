import { useDispatch, useSelector } from 'react-redux';
import { useCallback} from 'react';
import {
  getWidgetsApi, createWidgetApi, updateWidgetApi,
  deleteWidgetApi, getApiKeysApi, createApiKeyApi,
  deleteApiKeyApi, regenerateApiKeyApi,
} from '../services/widget.service';
import {
  setWidgets, setWidgetsLoading, addWidget,
  updateWidgetInList, removeWidget,
} from '../state/widgetSlice';
import toast from 'react-hot-toast';
export const useWidgets = () => {
  const dispatch = useDispatch();
  const { widgets, loading } = useSelector((state) => state.widgets);

  const fetchWidgets = useCallback(async () => {
    try {
      dispatch(setWidgetsLoading(true));
      const res = await getWidgetsApi();
      // Backend returns: { data: { widgets: [...], total: N, page: N, totalPages: N } }
      const result = res.data.data;
      const widgetsArray = Array.isArray(result) ? result : result?.widgets ?? [];
      dispatch(setWidgets(widgetsArray));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch widgets');
    } finally {
      dispatch(setWidgetsLoading(false));
    }
  }, [dispatch]);
  const createWidget = async (data) => {
    const res = await createWidgetApi(data);
    dispatch(addWidget(res.data.data));
    toast.success('Widget created');
    return res.data.data;
  };

  const updateWidget = async (id, data) => {
    const res = await updateWidgetApi(id, data);
    dispatch(updateWidgetInList(res.data.data));
    toast.success('Widget updated');
    return res.data.data;
  };

  const deleteWidget = async (id) => {
    await deleteWidgetApi(id);
    dispatch(removeWidget(id));
    toast.success('Widget deleted');
  };

  const getApiKeys = async (widgetId) => {
    const res = await getApiKeysApi(widgetId);
    return res.data.data;
  };

  const createApiKey = async (widgetId, data) => {
    const res = await createApiKeyApi(widgetId, data);
    toast.success('API key created');
    return res.data.data;
  };

  const deleteApiKey = async (keyId) => {
    await deleteApiKeyApi(keyId);
    toast.success('API key deleted');
  };

  const regenerateKey = async (widgetId) => {
    const res = await regenerateApiKeyApi(widgetId);
    toast.success('API key regenerated');
    return res.data;
  };

  return {
    widgets, loading, fetchWidgets,
    createWidget, updateWidget, deleteWidget,
    getApiKeys, createApiKey, deleteApiKey, regenerateKey,
  };
};
