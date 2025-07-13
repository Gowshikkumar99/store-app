import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux/slices/toastSlice";

function ToastMessage() {
  const dispatch = useDispatch();
  const { show, message, variant } = useSelector((state) => state.toast);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="toast-message">
      <ToastContainer position="top-center" className="position-fixed p-3">
        <Toast show={show} bg={variant} onClose={() => dispatch(hideToast())}>
          <Toast.Header>
            <strong className="me-auto">
              {variant === "success"
                ? "Success"
                : variant === "warning"
                ? "Warning"
                : variant === "danger" && "Deleted"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastMessage;
