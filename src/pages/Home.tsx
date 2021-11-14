import React from "react";
import CardWithTabs from "../components/cardWithNavigation/CardWithTabs";
import CardExchange from "../components/cardExchange/CardExchange";
import CardBalance from "../components/cardBalance/CardBalance";
import Header from "../components/header/Header";
import { tabType } from "../types/Types";

export default function Home() {
  const tabs: tabType[] = [
    { id: "all", title: "All" },
    { id: "favs", title: "Favs" },
    { id: "old", title: "Old" },
  ];
  return (
    <div className="bg-dark text-white" style={{ height: "100vh" }}>
      <Header title="Ethereum Wallet" />
      <main className="container p-4">
        <div className="row">
          <div className="col-md-6">
            <CardWithTabs title="Addresses" tabs={tabs} defaultActiveTab="all"/>
          </div>
          <div className="col-md-3">
            <CardExchange />
          </div>
          <div className="col-md-3">
            <CardBalance />
          </div>
        </div>
      </main>
    </div>
  );
}
