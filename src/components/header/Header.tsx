import React from "react";
interface HeaderProps {
  title: string;
  logo?: string;
}
const Header = ({ title, logo }: HeaderProps) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <div className="navbar-brand" style={{ border: "none" }}>
          {logo && (
            <img src={logo} alt="React logo" style={{ width: "4rem" }} />
          )}
          {title}
        </div>
      </div>
    </nav>
  );
};

export default Header;
