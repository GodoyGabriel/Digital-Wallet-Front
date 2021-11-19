interface ToastProps {
  title: string;
  message: string;
}

const Toast = ({title, message}: ToastProps) => {
  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close ms-2 mb-1"
          data-bs-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;