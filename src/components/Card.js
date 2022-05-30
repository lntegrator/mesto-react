function Card({card, onCardClick}){
    function handleCardClick(){
        onCardClick(card);
    }

    return(
        <article key={card._id} className="element" onClick={handleCardClick}>
            <img src={card.link} alt={card.name} className="element__image" />
            <button className="element__delete"></button>
            <div className="element__place">
                <h3 className="element__name">{card.name}</h3>
                <div className="element__likes">
                    <button className="element__button"></button>
                    <p className="element__like-quantity">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card