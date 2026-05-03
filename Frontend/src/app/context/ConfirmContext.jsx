import { createContext, useContext, useState } from "react";

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    message: "",
    resolve: null,
  });

  const confirm = ({ title, message }) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title,
        message,
        resolve,
      });
    });
  };

  const handleClose = () => {
    confirmState.resolve(false);
    setConfirmState({ ...confirmState, isOpen: false });
  };

  const handleConfirm = () => {
    confirmState.resolve(true);
    setConfirmState({ ...confirmState, isOpen: false });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {confirmState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#111] p-5 rounded-lg w-[320px]">
            <h2 className="text-white text-sm font-semibold mb-2">
              {confirmState.title}
            </h2>
            <p className="text-gray-400 text-xs mb-4">
              {confirmState.message}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-3 py-1 text-xs bg-gray-700 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};