import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard

  //Коллбэки кликов по кнопкам
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  //Получаем данные
  React.useEffect(() => {
    api.getInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    });

    api.getCards()
    .then((cardsData) => {
      setCards(cardsData);
    })
    .catch((err) => {
      console.log(err);
    });

    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }

  }, [isOpen])

  //Функция лайка карточки
  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked){
      api.unlikeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === card._id ? newCard : currentCard))
      })
      .catch((err) => console.log(err))
    }
    else{
      api.likeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === card._id ? newCard : currentCard))
      })
      .catch((err) => console.log(err))
    }
  }

  //Функция удаления карточки
  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))
    })
    .catch((err) => console.log(err))
  }

  //Функция обновления стейта имени
  function handleUpdateUser(userInfo){
    api.patchInfo(userInfo)
    .then((newInfo) => {
      setCurrentUser(newInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция обновления аватара
  function handleUpdateAvatar(link){
    api.patchAvatar(link)
    .then((newInfo) => {
      setCurrentUser(newInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  //Функция сохранения карточки
  function handleAddPlaceSubmit(cardInfo){
    api.postCard(cardInfo)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });  
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header />
        <Main
          cards ={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;