const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value || ""}
      placeholder={placeholder}
      className={`w-full p-3 bg-[#0d0d0d] border border-gray-800 rounded-lg outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition ${className}`}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default InputField;
