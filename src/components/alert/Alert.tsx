import { alertType } from "../../utils";
import { alertTypes } from "../../types/Types";

interface AlertProps {
  type: alertTypes;
  message: string;
  onClick: () => void;
}

const Alert = ({ type, message, onClick }: AlertProps) => {
  return (
    <div className={`alert alert-dismissible ${alertType(type)}`}>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        onClick={onClick}
      />
        {message}
    </div>
  );
};

export default Alert;
