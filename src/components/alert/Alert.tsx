interface AlertProps {
  type: string;
  message: string;
  onClick: () => void;
}

const Alert = ({ type, message, onClick }: AlertProps) => {
  const alertType = () => {
    switch (type) {
      case "danger":
        return "alert-danger";
      case "success":
        return "alert-success";
      case "warning":
        return "alert-warning";
      default:
        return "alert-primary";
    }
  };

  return (
    <div className={`alert alert-dismissible ${alertType()}`}>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        onClick={onClick}
      ></button>
      {/*<strong>Oh snap!</strong>*/}
      {message}
    </div>
  );
};

export default Alert;
