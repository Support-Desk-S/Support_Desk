const tabs = ["General", "Security", "Integrations"];

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-1 bg-white/5 border border-white/5 rounded-[10px] p-1 shadow-sm w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={[
            "px-3.5 py-1.5 rounded-[8px] cursor-pointer text-xs font-bold uppercase tracking-wider transition-all duration-200",
            activeTab === tab
              ? "bg-white text-black font-extrabold shadow-sm"
              : "text-zinc-400 hover:text-white hover:bg-white/5",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;