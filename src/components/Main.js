import {useEffect, useState, useContext} from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  //Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__image">
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
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
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} className="profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Места">
        {cards.map((card) => (
          <Card 
          key={card._id} 
          card={card} 
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
