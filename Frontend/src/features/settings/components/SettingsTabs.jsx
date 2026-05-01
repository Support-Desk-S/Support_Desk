const tabs = ["General", "Security"];

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-1 p-1 rounded-[10px] bg-(--color-bg-subtle) w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={[
            "px-3 py-1.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-150",
            activeTab === tab
              ? "bg-(--color-bg-surface) text-(--color-text-primary) shadow-sm"
              : "text-(--color-text-secondary) hover:text-(--color-text-primary)",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;