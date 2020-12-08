import React from "react";
import Cards from "./Cards";

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay">
          <img
            src={props.userAvatar}
            alt="Портрет Жак-Ив Кусто в красной шапке на фоне моря"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-edit">
            <h2 className="profile__title">{props.userName}</h2>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{props.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Cards card={card} key={card._id} ownerId={props.ownerId} onImgClick={props.onImgClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
