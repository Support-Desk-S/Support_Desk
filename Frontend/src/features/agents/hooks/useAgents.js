import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { getUsersApi, approveUserApi, suspendAgentApi, updateUserRoleApi } from '../services/agent.service';
import { setUsers, setAgentsLoading, updateUserInList } from '../state/agentSlice';
import toast from 'react-hot-toast';

export const useAgents = () => {
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);
  const { users, loading, lastFetchedUsers } = useSelector((state) => state.agents);
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  const fetchUsers = useCallback(async (force = false) => {
    if (!force && lastFetchedUsers && Date.now() - lastFetchedUsers < CACHE_TIME) return;
    try {
      dispatch(setAgentsLoading(true));
      const res = await getUsersApi();
      dispatch(setUsers(res.data.data));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch agents');
    } finally {
      dispatch(setAgentsLoading(false));
    }
  }, [dispatch,lastFetchedUsers]);

  const approveUser = async (userId, isApproved) => {
    try {
      setLoadingId(userId);
      const res = await approveUserApi(userId, isApproved);
      dispatch(updateUserInList(res.data.data));
      toast.success(isApproved ? 'Agent approved' : 'Agent suspended');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update approval');
    } finally {
      setLoadingId(null);
    }
  };

  const suspendUser = async (userId) => {
    try {
      setLoadingId(userId);
      const res = await suspendAgentApi(userId);
      dispatch(updateUserInList(res.data.data));
      toast.success('Agent suspended successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to suspend agent');
    } finally {
      setLoadingId(null);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      setLoadingId(userId);
      const res = await updateUserRoleApi(userId, role);
      dispatch(updateUserInList(res.data.data));
      toast.success('Role updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role');
    } finally {
      setLoadingId(null);
    }
  };

  return { users, loading, loadingId, fetchUsers, approveUser, suspendUser, updateRole };
};
