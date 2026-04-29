const LeftPanel = () => {
  return (
    <div className="hidden md:flex w-1/2 relative bg-black p-12 flex-col justify-between overflow-hidden border-r border-gray-900">
      <div className="absolute -top-25 -left-25 w-75 h-75 bg-white/10 blur-[120px]" />

      <div className="relative z-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          AI Support Platform
        </h1>
        <p className="text-gray-400 mt-3 max-w-sm">
          Automate conversations, resolve tickets faster, and scale support with
          AI.
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-60 h-60 bg-white/5 rounded-full blur-3xl absolute" />
        <div className="w-40 h-40 border border-gray-800 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-white/10 rounded-full backdrop-blur-xl" />
        </div>
      </div>

      <div className="bg-[#111] border border-gray-800 p-5 rounded-xl text-sm text-gray-300">
        “AI reduced response time by <span className="text-white">75%</span>{" "}
        across channels.”
      </div>
    </div>
  );
};

export default LeftPanel;
