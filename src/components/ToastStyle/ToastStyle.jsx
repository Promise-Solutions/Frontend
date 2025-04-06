import toast from "react-hot-toast";

export const ToastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
  border: "solid 1px #9A3379",
};

export const showToast = {
  success: (message) => toast.success(message, { style: ToastStyle }),
  error: (message) => toast.error(message, { style: ToastStyle }),
  promise: (promise, messages) =>
    toast.promise(promise, messages, { style: ToastStyle }),
};
