import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import { tabType } from "../../types/Types";
import Table from "../table/Table";
import {FcPlus} from "react-icons/fc";
import Modal from "../modal/Modal";
interface CardWithNavigationProps {
  title: string;
  tabs: tabType[];
  defaultActiveTab?: string;
}

const CardWithNavigation = ({ title, tabs, defaultActiveTab }: CardWithNavigationProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const getTabs = () => {
    return tabs.map((tab: tabType, index) => (
      <Tab eventKey={tab.id} title={tab.title} key={index}>
        <Table/>
      </Tab>
    ));
  };

  const closeModal = () => {
    setModalActive(false);
    setNewAddress("");
  }

  const inputAddress = (e : any) => {
    setNewAddress(e.target.value);
  }

  return (
    <>
    <div className="card bg-secondary rounded-0">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <Tabs
          defaultActiveKey={defaultActiveTab}
          id="tabs"
          className="mb-3"
        >
          {getTabs()}
        </Tabs>
      </div>
      <div className="card-footer" style={{textAlign: "end"}}>
        <FcPlus className="card-footer-icon" style={{width: "30", height: "30", cursor: "pointer"}} onClick={()=>setModalActive(true)}/>
      </div>
    </div>
    <Modal
        title={"Add Address"}
        active={modalActive}
        close={closeModal}
        onSubmit={closeModal}
      >
      <input type="text" className="form-control" placeholder="Address" value={newAddress} id="inputDefault" onChange={inputAddress}/>
      </Modal>
    </>
  );
};

export default CardWithNavigation;
