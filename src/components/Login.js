/* eslint-disable */

import React from 'react';
import { useHistory, Redirect } from "react-router-dom";
import PopupWithForm from './PopupWithForm';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let history = useHistory();

  function handleSubmit(e, toMainPage) {
    e.preventDefault();
    props.onLoginUser({
      email,
      password,
    }, toMainPage = () => history.push("/"));
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  //props.loggedIn && history.push("/");

  return (
      <section className="login">
        {props.loggedIn && <Redirect to="/" />}
        <PopupWithForm 
          name = 'login' 
          title = 'Вход' 
          isOpen={props.isOpen}  
          onSubmit={handleSubmit}>
        <input
          id="popup_login__email"
          type="text"
          name="email"
          placeholder="Email"
          required
          className="popup__edit login__edit"
          minLength={2}
          maxLength={40}
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <span id="popup_login__title-error" className="popup__input-error" />
        <input
          id="popup_login__password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="popup__edit login__edit"
          minLength={2}
          maxLength={200}
          onChange={handleChangePassword}
          value={password || ''}
        />
        <span
          id="popup_login__subtitle-error"
          className="popup__input-error"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
        </PopupWithForm>
      </section>
  );
}