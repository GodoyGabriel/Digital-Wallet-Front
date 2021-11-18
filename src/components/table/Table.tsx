import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import Modal from "../modal/Modal";
import useSort from "../../hooks/useSort";
import AddressDataModel from "../../models/AddressDataModel";
import { AddressData } from "../../interfaces/interfaces";
import { sort } from "../../types/Types";
import { useSelector } from 'react-redux';
import RootState from '../../redux/RootStateInterface';

interface TableProps {
  header: string[];
  addressesData: AddressData[];
  sort: sort;
}

const Table = ({ header, sort }: TableProps) => {
  const [fav, setFav] = useState(false);
  const {addressesData} = useSelector((state: RootState) => state.walletData);
  const [modalAcitve, setModalAcive] = useState(false);
  const [addressDelete, setAddressDelete] = useState("");
  const dataSorted = useSort(addressesData, sort);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [dataSorted]);

  const modalClose = () => {
    setModalAcive(false);
  };

  const getBodyRows = () => {
    return dataSorted.map((data, index) => {
      const addressData = new AddressDataModel(data);
      return (
        <tr className="table-primary" key={index}>
          <td scope="row" style={{ maxWidth: "280px" }}>
            {addressData.address}
          </td>
          <td>${addressData.price}</td>
          <td>{addressData.currency}</td>
          <td style={{ paddingRight: "0px" }}>
            {addressData.fav ? (
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
      <table className="table striped table-hover">
        <thead className="table-dark">
          <tr>
            {header.map((item: string) => (
              <th scope="col">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{!loading && getBodyRows()}</tbody>
      </table>
      <Modal active={modalAcitve} close={modalClose} onSubmit={modalClose}>
        <div>Are you sure you want to delete this address? {addressDelete}</div>
      </Modal>
    </>
  );
};

export default Table;
