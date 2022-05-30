function ImagePopup(props){
    return(
        <div className={`popup popup_type_photo ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup__photo-container">
                <button onClick={props.onClose} className="popup__button-close"></button>
                <img className="popup__photo" src={props.card ? props.card.link : ''} alt="{props.card.name}" />
                <p className="popup__caption">{props.card.name}</p>
                <div onClick={props.onClose} className="popup__overlay popup__overlay_photo"></div>
            </div>
        </div>
    )
}

export default ImagePopup