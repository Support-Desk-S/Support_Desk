import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getUsersApi, approveUserApi, updateUserRoleApi } from '../services/agent.service';
import { setUsers, setAgentsLoading, updateUserInList } from '../state/agentSlice';
import toast from 'react-hot-toast';

export const useAgents = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.agents);

  const fetchUsers = useCallback(async () => {
    try {
      dispatch(setAgentsLoading(true));
      const res = await getUsersApi();
      dispatch(setUsers(res.data.data));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch agents');
    } finally {
      dispatch(setAgentsLoading(false));
    }
  }, [dispatch]);

  const approveUser = async (userId, isApproved) => {
    try {
      const res = await approveUserApi(userId, isApproved);
      dispatch(updateUserInList(res.data.data));
      toast.success(isApproved ? 'Agent approved' : 'Agent suspended');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update approval');
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const res = await updateUserRoleApi(userId, role);
      dispatch(updateUserInList(res.data.data));
      toast.success('Role updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role');
    }
  };

  return { users, loading, fetchUsers, approveUser, updateRole };
};
