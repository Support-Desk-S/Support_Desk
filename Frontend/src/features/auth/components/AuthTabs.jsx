const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-[#0f0f0f] border border-gray-800 rounded-lg p-1">
      <button
        onClick={() => setActiveTab("login")}
        className={`flex-1 py-2 cursor-pointer rounded-md text-sm transition ${
          activeTab === "login"
            ? "bg-white text-black font-medium"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => setActiveTab("register")}
        className={`flex-1 py-2 cursor-pointer  rounded-md text-sm transition ${
          activeTab === "register"
            ? "bg-white text-black font-medium"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthTabs;
