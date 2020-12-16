import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext  } from '../contexts/CurrentUserContext';
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"

function App() {
  const [currentUser, setCurrentUser] = React.useState();
  
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

  

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard]=React.useState();

  function handleCardClick(card) {
    setSelectedCard(card)
    handleImgClick();
  }

  function handleUpdateUser(data) {
    api.editUserProfile(data)
  .then(() => {
    setCurrentUser(data)
    closeAllPopups()
  })
  .then(()=> {
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
    console.log('Ошибка. Запрос не выполнен: ', err);
  }); 
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
  }).catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => (c._id !== card._id)  )
      setCards(newCards);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
  });
  }


  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
  .then(() => {
    setCurrentUser(data)
    closeAllPopups()
  })
  .then(()=>{
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
    console.log('Ошибка. Запрос не выполнен: ', err);
  }); 
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

  function handleAddPlaceSubmit(newCard) {
    
    api.addNewCard(newCard)
      .then(() => {
        setCards([newCard, ...cards]); 
      })
      .then(() => {
        closeAllPopups()
        })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
        })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onImgClick={handleCardClick}
        cards={(cards) ? cards : [{}]}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
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
      <ImagePopup card={selectedCard} isOpen={isImgPopupOpen} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
