import React from "react";
import { OverlayTrigger} from "react-bootstrap";

const Table = () => {
  return (
    <table className="table striped table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col" >
            Address
          </th>
          <th scope="col" >
            Mount
          </th>
          <th scope="col" >
            Currency
          </th>
          <th scope="col" ></th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-primary">
          <th scope="row" style={{maxWidth:"280px"}}>0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a</th>
          <td>$3000</td>
          <td>USD</td>
          <td>Fav</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
