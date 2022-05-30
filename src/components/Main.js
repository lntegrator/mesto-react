import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__image">
            <div
              style={{ backgroundImage: `url(${userAvatar})` }}
              className="profile__avatar"
            >
              {" "}
            </div>
            <button
              onClick={onEditAvatar}
              className="profile__edit-avatar"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} className="profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Места">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
