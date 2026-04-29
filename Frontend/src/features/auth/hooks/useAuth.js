import { useDispatch, useSelector } from "react-redux";
import {
  loginApi,
  tenantRegisterApi,
  getMeApi,
} from "../services/auth.service";
import { setUser, setLoading } from "../state/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleError = (err) => {
    const msg = err.response?.data?.message || "Something went wrong";
    toast.error(msg);
  };

  const login = async (data) => {
    try {
      dispatch(setLoading(true));

      const res = await loginApi(data);

      dispatch(setUser(res.data.data));
      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const registerTenant = async (data) => {
    try {
      dispatch(setLoading(true));

      const res = await tenantRegisterApi(data);

      dispatch(setUser(res.data.data.adminUser));
      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadUser = async () => {
    try {
      dispatch(setLoading(true));

      const res = await getMeApi();

      dispatch(setUser(res.data.data));
    } catch (err) {
      dispatch(setUser(null));
      handleError(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login, registerTenant, loading, loadUser };
};
