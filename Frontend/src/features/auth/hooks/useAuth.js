import { useDispatch, useSelector } from "react-redux";
import {
  loginApi,
  tenantRegisterApi,
  getMeApi,
  registerApi,
  updatePasswordApi,
} from "../services/auth.service";
import { getTenantBySlugApi } from "../../tenant/services/tenant.service";
import {
  setUser,
  setLoading,
  logout,
  setInitialized,
} from "../state/authSlice";
import { setTenant } from "../../tenant/state/tenantSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../../lib/axios";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleError = (err) => {
    const msg = err.response?.data?.message || "Something went wrong";
    toast.error(msg);
  };

  /**
   * Login: requires { email, password, slug }
   * The slug is used to resolve the tenant and redirect correctly.
   */
  const login = async ({ email, password, slug }) => {
    try {
      dispatch(setLoading(true));

      // 1. Validate tenant slug first
      const tenantRes = await getTenantBySlugApi(slug);
      const tenant = tenantRes.data.data;
      dispatch(setTenant(tenant));

      // 2. Login
      const res = await loginApi({ email, password });
      const user = res.data.data;

      // 3. Verify user belongs to this tenant
      if (String(user.tenantId) !== String(tenant._id)) {
        toast.error("You don't belong to this workspace");
        return;
      }

      dispatch(setUser(user));
      toast.success(res.data.message);
      navigate(`/${slug}/dashboard`);
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
      const { tenant, adminUser } = res.data.data;

      dispatch(setTenant(tenant));
      dispatch(setUser(adminUser));
      toast.success(res.data.message);

      navigate(`/${tenant.slug}/dashboard`);
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
      dispatch(setInitialized());
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout").catch(() => {});
    } finally {
      dispatch(logout());
      navigate("/auth");
    }
  };

  const registerAgent = async ({ slug, name, email, password }) => {
    try {
      dispatch(setLoading(true));

      // 1. Resolve slug → tenantId
      const tenantRes = await getTenantBySlugApi(slug);
      const tenant = tenantRes.data.data;

      // 2. Register agent under that tenant
      const res = await registerApi({
        name,
        email,
        password,
        tenantId: tenant._id,
      });
      toast.success(
        res.data.message || "Registration successful! Await admin approval.",
      );

      // 3. Don't auto-login — agent needs admin approval first
      // Just switch them to the Sign In tab (caller handles tab switch)
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updatePassword = async (data) => {
    try {
      dispatch(setLoading(true));

      const res = await updatePasswordApi(data);

      toast.success(res.data.message);

      dispatch(logout());
      navigate("/auth");
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    login,
    registerTenant,
    registerAgent,
    loading,
    loadUser,
    handleLogout,
    updatePassword,
  };
};
