import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  //Коллбэки кликов по кнопкам
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={setSelectedCard}
      />
      <Footer />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        title="Новое место"
        name="mesto"
        onClose={closeAllPopups}
        buttonText = 'Создать'
      >
        <input
          name="mestoName"
          id="mesto-input"
          type="text"
          className="form__field form__field_type_mesto"
          placeholder="Название"
          defaultValue=""
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__input-error mesto-input-error"></span>
        <input
          name="mestoLink"
          type="url"
          id="link-input"
          className="form__field form__field_type_link"
          placeholder="Ссылка на картинку"
          defaultValue=""
          required
        />
        <span className="form__input-error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        name="profile"
        onClose={closeAllPopups}
        buttonText = 'Сохранить'
      >
        <input
          name="personName"
          id="name-input"
          type="text"
          className="form__field form__field_type_name"
          placeholder="Введите имя"
          defaultValue=""
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__input-error name-input-error"></span>
        <input
          name="personDescription"
          id="job-input"
          type="text"
          className="form__field form__field_type_job"
          placeholder="Введите специальность"
          defaultValue=""
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__xwinput-error job-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title="Обновить аватар"
        name="avatar"
        onClose={closeAllPopups}
        buttonText = 'Сохранить'
      >
        <input
          name="avatarLink"
          type="url"
          id="avatar-input"
          className="form__field form__field_type_link"
          placeholder="Вставьте ссылку"
          defaultValue=""
          required
        />
        <span className="form__input-error avatar-input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
