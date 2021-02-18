/* eslint-disable */

import React from "react";
import { Link, useHistory } from 'react-router-dom';
import logo from "../images/vector.svg";

function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-up');
  }
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта" />
      <div className="header__login">
        <span className="header__email">{props.user}</span>
        <Link to={props.linkTo} className={props.loggedIn ? 'header__link header__link_grey' : 'header__link' } onClick={signOut} > {props.linkTitle}</Link>
      </div>
    </header>
  );
}

export default Header;
