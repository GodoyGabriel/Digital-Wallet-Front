import React from 'react';
import ethLogo from '../../assets/img/eth-logo.png'

interface HeaderProps {
  title: string;
}
const Header = ({title}: HeaderProps) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <div className="navbar-brand" style={{border: "none"}}>
          <img src={ethLogo} alt="React logo" style={{width: "4rem"}}/>
          {title}
        </div>
      </div>
    </nav>
  )
}

export default Header;
