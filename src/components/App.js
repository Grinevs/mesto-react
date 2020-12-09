import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard]=React.useState();

  function handleCardClick(card) {
    setSelectedCard(card)
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
        onImgClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
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
        title="Вы уверены?"
        name="popup_delete"
        onClose={closeAllPopups}
      >
        <button className="popup__button popup_delete__button" type="submit">
          Да
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isImgPopupOpen} onClose={closeAllPopups}></ImagePopup>

    </div>
  );
}

export default App;
