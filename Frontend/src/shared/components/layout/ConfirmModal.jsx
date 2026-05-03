// components/ConfirmModal.jsx
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#111] p-5 rounded-lg w-[300px]">
          <h2 className="text-white text-sm font-semibold mb-2">{title}</h2>
          <p className="text-gray-400 text-xs mb-4">{description}</p>
  
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 text-xs bg-gray-700 text-white rounded"
            >
              Cancel
            </button>
  
            <button
              onClick={onConfirm}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;