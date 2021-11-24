import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { tabType } from "../../types/Types";
import Table from "../table/Table";
import { FcPlus } from "react-icons/fc";
import Modal from "../modal/Modal";
import { tableHeader, addressesData } from "../../mocks/mocks";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../../redux/walletDataDuck";
import RootStateInterface from "../../redux/RootStateInterface";
import { AddressData, AlertInt } from '../../interfaces/interfaces';
import Alert from "../alert/Alert";
interface CardWithNavigationProps {
  title: string;
  tabs: tabType[];
  defaultActiveTab?: string;
}

const initialAlert: AlertInt = { type: "", message: "" };

const CardWithNavigation = ({
  title,
  tabs,
  defaultActiveTab,
}: CardWithNavigationProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [activeTab, setActiveTab] = useState<any>();
  const [alert, setAlert] = useState(initialAlert);
  const dispatch = useDispatch();
  const walletData = useSelector(
    (state: RootStateInterface) => state.walletData
  );

  const getTabs = () => {
    return tabs.map((tab: tabType, index) => {
      const showTable = !activeTab
        ? defaultActiveTab === tab.id
        : tab.id === activeTab;
      return (
        <Tab eventKey={tab.id} title={tab.title} key={index}>
          {showTable && (
            <Table
              header={tableHeader}
              addressesData={addressesData}
              sort={tab.sort}
            />
          )}
        </Tab>
      );
    });
  };

  const closeModal = () => {
    setModalActive(false);
    setNewAddress("");
  };

  const inputAddress = (e: any) => {
    setNewAddress(e.target.value);
  };

  const addressSubmit = () => {
    const addressExist = walletData.addressesData.find(
      (addressData: AddressData) => {
        return addressData.address === newAddress;
      }
    );
    if (!addressExist) {
      setAlert({ type: "success", message: "added address" });
      addAddress(newAddress)(dispatch, walletData);
    } else {
      setAlert({ type: "danger", message: "Address already exists" });
    }
    closeModal();
  };

  return (
    <>
      <div className="card bg-secondary rounded-0">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <Tabs
            id="tabs"
            className="mb-3"
            defaultActiveKey={defaultActiveTab}
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            {getTabs()}
          </Tabs>
        </div>
        <div className="card-footer" style={{ textAlign: "end" }}>
          <FcPlus
            className="card-footer-icon"
            style={{ width: "30", height: "30", cursor: "pointer" }}
            onClick={() => setModalActive(true)}
          />
        </div>
      </div>
      <Modal
        title={"Add Address"}
        active={modalActive}
        close={closeModal}
        onSubmit={addressSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={newAddress}
          id="inputDefault"
          onChange={inputAddress}
        />
      </Modal>
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

export default CardWithNavigation;
