import React, { useState } from "react";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import Modal from "../modal/Modal";

const Table = () => {
  const [fav, setFav] = useState(false);
  const [modalAcitve, setModalAcive] = useState(false);

  const modalClose = () => {
    setModalAcive(false);
  };
  return (
    <>
      <table className="table striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Address</th>
            <th scope="col">Mount</th>
            <th scope="col">Currency</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary">
            <th scope="row" style={{ maxWidth: "280px" }}>
              0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
            </th>
            <td>$3000</td>
            <td>USD</td>
            <td style={{ paddingRight: "0px" }}>
              {fav ? (
                <AiTwotoneStar
                  style={{ cursor: "pointer" }}
                  onClick={() => setFav(!fav)}
                />
              ) : (
                <AiOutlineStar
                  style={{ cursor: "pointer" }}
                  onClick={() => setFav(!fav)}
                />
              )}
              <IoMdRemoveCircle
                style={{ cursor: "pointer", marginLeft: "5px" }}
                onClick={() => setModalAcive(true)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        title={"Alert"}
        active={modalAcitve}
        close={modalClose}
        onSubmit={modalClose}
      >
        <div>Are you sure you want to delete this address?</div>
      </Modal>
    </>
  );
};

export default Table;
