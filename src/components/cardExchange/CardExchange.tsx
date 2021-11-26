import Alert from "../alert/Alert";
import { AlertInt } from "../../interfaces/interfaces";
import Button from "react-bootstrap/Button";

import useExchange from "../../hooks/useExchange";

const initialAlert: AlertInt = { type: "", message: "" };

const CardExchange = () => {
  const {
    value,
    onchange,
    buttonActive,
    currencyChange,
    amountFormated,
    alert,
    setAlert,
  } = useExchange();

  return (
    <>
      <div className="card bg-secondary rounded-0">
        <div className="card-header">Exchange</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Mount"
            id="price"
            value={value}
            onChange={(e) => onchange(e.target.value)}
          />

          <div className="btn-group" role="group" style={{ display: "flex" }}>
            <Button
              type="button"
              className="btn btn-secondary"
              active={buttonActive("USD")}
              onClick={() => currencyChange("USD")}
            >
              USD
            </Button>
            <Button
              type="button"
              className="btn btn-secondary"
              active={buttonActive("EUR")}
              onClick={() => currencyChange("EUR")}
            >
              EUR
            </Button>
          </div>
          <input
            className="form-control"
            id="readOnlyInput"
            type="text"
            disabled
            value={`ETH ${amountFormated}`}
          />
        </div>
      </div>
      {alert.type !== "" && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClick={() => setAlert(initialAlert)}
        />
      )}
    </>
  );
};

export default CardExchange;
