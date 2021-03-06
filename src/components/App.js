/* eslint-disable */

import React from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import tempapi from "../utils/tempapi";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  let history = useHistory();
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    api
      .getUserProfile()
      .then((getUser) => {
        setCurrentUser(getUser);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsInit) => {
        setCards(cardsInit);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    token &&
      tempapi
        .getJWT(token)
        .then((data) => {
          setUserEmail(data.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен: ", err);
        });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [isInfoToolTip, setInfoToolTip] = React.useState(false);
  const [infoTooltipValid, setInfoTooltipValid] = React.useState("_valid");

  function handleInfoToolTip() {
    setInfoToolTip(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImgClick() {
    setImgPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImgPopupOpen(false);
    setInfoToolTip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImgClick();
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then(() => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .then(() => {
        api
          .getUserProfile()
          .then((getUser) => {
            setCurrentUser(getUser);
          })
          .catch((err) => {
            console.log("Ошибка. Запрос не выполнен: ", err);
          });
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleRegisterUser(newUser, toSignin) {
    tempapi
      .addUser(newUser)
      .then((data) => {
        setInfoToolTip(true);
        setInfoTooltipValid("_valid");
        toSignin();
      })
      .catch((err) => {
        setInfoToolTip(true);
        setInfoTooltipValid("_invalid");
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  function handleLoginUser(userData, toMainPage) {
    tempapi
      .authUser(userData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        tempapi
          .getJWT(data.token)
          .then((data) => {
            setUserEmail(data.data.email);
          })
          .catch((err) => {
            console.log("Ошибка. Запрос не выполнен: ", err);
          });
        toMainPage();
      })
      .catch((err) => {
        setInfoToolTip(true);
        setInfoTooltipValid("_invalid");
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/sign-up">
              <Header linkTitle="Войти" linkTo="/sign-in" />
              <Main
                type="sign-up"
                onRegisterUser={handleRegisterUser}
                loggedIn={loggedIn}
              />
            </Route>
            <Route exact path="/sign-in">
              <Header linkTitle="Регистрация" linkTo="/sign-up" />
              <Main
                type="sign-in"
                onLoginUser={handleLoginUser}
                loggedIn={loggedIn}
              />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onImgClick={handleCardClick}
              cards={cards || [{}]}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              type="main"
              userEmail={userEmail}
            />
            <Route exact path="*">
              {!loggedIn && <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </BrowserRouter>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="popup_delete"
          onClose={closeAllPopups}
        >
          <button className="popup__button popup_delete__button" type="submit">
            Да
          </button>
        </PopupWithForm>
        <InfoTooltip
          isOpen={isInfoToolTip}
          valid={infoTooltipValid}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImgPopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
