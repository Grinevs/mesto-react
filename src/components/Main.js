import React from "react";
import Cards from "./Cards";
import { api } from "../utils/api.js";

function Main(props) {
  const [ownerId, setOwnerId] = React.useState("");
  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState(
    "Исследователь океана"
  );
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  

  React.useEffect(() => {
    api
      .getUserProfile()
      .then((getUser) => {
        setUserName(getUser.name);
        setUserDescription(getUser.about);
        setUserAvatar(getUser.avatar);
        setOwnerId(getUser._id);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }, []);

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



  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay">
          <img
            src={userAvatar}
            alt="Портрет Жак-Ив Кусто в красной шапке на фоне моря"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-edit">
            <h2 className="profile__title">{userName}</h2>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Cards card={card} key={card._id} ownerId={ownerId} onImgClick={props.onImgClick}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
