import CardWithTabs from "../components/cardWithTabs/CardWithTabs";
import CardExchange from "../components/cardExchange/CardExchange";
// import CardBalance from "../components/cardBalance/CardBalance";
import Header from "../components/header/Header";
import logo from "../assets/img/eth-logo.png";
import { tabs } from '../mocks/mocks';

export default function Home() {

  return (
    <div className="bg-dark text-white" style={{ height: "100vh" }}>
      <Header title="Ethereum Wallet" logo={logo} />
      <main className="container p-4">
        <div className="row">
          <div className="col-md-9">
            <CardWithTabs
              title="Addresses"
              tabs={tabs}
              defaultActiveTab="all"
            />
          </div>
          <div className="col-md-3">
            <CardExchange />
          </div>
{/*           <div className="col-md-3">
            <CardBalance />
          </div> */}
        </div>
      </main>
    </div>
  );
}
