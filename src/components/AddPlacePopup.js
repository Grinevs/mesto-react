import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceCard({
      name: name,
      link: link,
    });
  }

  function handleChangeTitle(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }


  return (
    <PopupWithForm
      title="Новое место"
      name="popup_card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        onChange={handleChangeTitle}
        value={name ? name : ''}
      />
      <span id="popup_card__title-error" className="popup__input-error" />
      <input
        id="popup_card__src"
        type="url"
        placeholder="Ссылка на картинку"
        name="subtitle"
        required
        className="popup__edit popup_card__src"
        onChange={handleChangeLink}
        value={link ? link : ''}
      />
      <span id="popup_card__src-error" className="popup__input-error" />
      <button className="popup__button popup_card__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
