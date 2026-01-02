import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1c1c1c",
          color: "#fff",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default ToastProvider;
