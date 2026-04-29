import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import LeftPanel from "../components/LeftPanel";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex bg-black text-white">

      <LeftPanel />

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">

          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-[#0b0b0b] border border-gray-800 p-6 rounded-2xl shadow-xl">
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;