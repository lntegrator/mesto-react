import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__button-close"
        ></button>
        <form
          className="popup__form form"
          name={`${props.name}_form`}
          noValidate
        >
          <h2 className="form__title">{`${props.title}`}</h2>
          {props.children}
          <button className="form__submit-button" type="submit">
            Сохранить
          </button>
        </form>
        <div
          onClick={props.onClose}
          className="popup__overlay popup__overlay_profile"
        ></div>
      </div>
    </div>
  );
}

export default PopupWithForm;
