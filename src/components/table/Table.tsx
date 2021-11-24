import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import Modal from "../modal/Modal";
import useSort from "../../hooks/useSort";
import AddressDataModel from "../../models/AddressDataModel";
import { Spinner } from "react-bootstrap";
import { AddressData } from "../../interfaces/interfaces";
import { sort } from "../../types/Types";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../../redux/RootStateInterface";
import { FAV_CHANGE, REMOVE_ADDRESS } from "../../redux/ducks/walletDataDuck";

interface TableProps {
  header: string[];
  addressesData: AddressData[];
  sort: sort;
}

const Table = ({ header, sort }: TableProps) => {
  const { addressesData, currency, usdToEur } = useSelector(
    (state: RootState) => state.walletData
  );
  const [modalAcitve, setModalAcive] = useState(false);
  const dispatch = useDispatch();
  const [addressDelete, setAddressDelete] = useState("");
  const dataSorted = useSort(addressesData, sort);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading && dataSorted.length) {
      setLoading(false);
    }
  }, [dataSorted]);

  const modalClose = () => {
    setModalAcive(false);
  };

  const favChange = (address: string) => {
    dispatch({
      type: FAV_CHANGE,
      payload: address,
    });
  };

  const deleteAddr = () => {
    dispatch({
      type: REMOVE_ADDRESS,
      payload: addressDelete,
    });
    modalClose();
    setAddressDelete("");
  };

  const getPriceForCurrency = (addressData: AddressData) => {
    if (currency === "USD") {
      return addressData.price;
    } else {
      return addressData.price * usdToEur;
    }
  };

  const getBodyRows = () => {
    return dataSorted.map((data, index) => {
      const addressData = new AddressDataModel(data);
      return (
        <tr className="table-primary" key={index}>
          <td scope="row" style={{ maxWidth: "280px" }}>
            {addressData.address}
          </td>
          <td>${getPriceForCurrency(addressData)}</td>
          <td>{currency}</td>
          <td style={{ paddingRight: "0px" }}>
            {addressData.fav ? (
              <AiTwotoneStar
                style={{ cursor: "pointer" }}
                onClick={() => favChange(addressData.address)}
              />
            ) : (
              <AiOutlineStar
                style={{ cursor: "pointer" }}
                onClick={() => favChange(addressData.address)}
              />
            )}
            <IoMdRemoveCircle
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={() => {
                setModalAcive(true);
                setAddressDelete(addressData.address);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <table className="table striped table-hover">
          <thead className="table-dark">
            <tr>
              {header.map((item: string) => (
                <th scope="col">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>{getBodyRows()}</tbody>
        </table>
      )}

      <Modal active={modalAcitve} close={modalClose} onSubmit={deleteAddr}>
        <div>Are you sure you want to delete this address? {addressDelete}</div>
      </Modal>
    </>
  );
};

export default Table;
