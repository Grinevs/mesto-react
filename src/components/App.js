import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [ownerId, setownerId] = React.useState("");

  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState(
    "Исследователь океана"
  );
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setselectedCard]=React.useState();
 

  React.useEffect(() => {
    api
      .getUserProfile()
      .then((getUser) => {
        setUserName(getUser.name);
        setUserDescription(getUser.about);
        setUserAvatar(getUser.avatar);
        setownerId(getUser._id);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  });

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

  // console.log(cards)

  function handleCardClick(card) {
    setselectedCard(card)
    handleImgClick();
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
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
        ownerId={ownerId}
        onImgClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        key='1'
        title="Редактировать профиль"
        name="popup_profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="popup_profile__title"
          type="text"
          name="title"
          placeholder="Имя"
          required
          className="popup__edit popup_profile__title"
          minLength={2}
          maxLength={40}
        />
        <span id="popup_profile__title-error" className="popup__input-error" />
        <input
          id="popup_profile__subtitle"
          type="text"
          name="subtitle"
          placeholder="Профессия"
          required
          className="popup__edit popup_profile__subtitle"
          minLength={2}
          maxLength={200}
        />
        <span
          id="popup_profile__subtitle-error"
          className="popup__input-error"
        />
        <button className="popup__button popup_profile__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        key='2'
        title="Новое место"
        name="popup_card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="popup_card__title"
          type="text"
          placeholder="Название"
          name="title"
          required
          className="popup__edit popup_card__title"
          minLength={1}
          maxLength={30}
        />
        <span id="popup_card__title-error" className="popup__input-error" />
        <input
          id="popup_card__src"
          type="url"
          placeholder="Ссылка на картинку"
          name="subtitle"
          required
          className="popup__edit popup_card__src"
        />
        <span id="popup_card__src-error" className="popup__input-error" />
        <button className="popup__button popup_card__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        key='3'
        title="Обновить аватар"
        name="popup_avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="popup_avatar__src"
          type="url"
          placeholder="Ссылка на картинку"
          name="subtitle"
          required
          className="popup__edit popup_avatar__src"
        />
        <span id="popup_avatar__src-error" className="popup__input-error" />
        <button className="popup__button popup_avatar__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        key='4'
        title="Вы уверены?"
        name="popup_delete"
        onClose={closeAllPopups}
      >
        <button className="popup__button popup_delete__button" type="submit">
          Да
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isImgPopupOpen} onClose={closeAllPopups}></ImagePopup>

      <div className="popup popup_photo">
        <div className="popup__container popup_photo__container">
          <img className="popup_photo__pic" alt="#" src="#" />
          <h3 className="popup__title popup_photo__title" />
        </div>
        <button
          type="button"
          className="popup__close-icon popup_photo__close-icon"
        />
      </div>
    </div>
  );
}

export default App;
