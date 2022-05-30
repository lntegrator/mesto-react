function Card(props){
    function handleCardClick(){
        props.onCardClick(props.card);
    }

    return(
        <article key={props.card._id} className="element" onClick={handleCardClick}>
            <img src={props.card.link} alt={props.card.name} className="element__image" />
            <button className="element__delete"></button>
            <div className="element__place">
                <h3 className="element__name">{props.card.name}</h3>
                <div className="element__likes">
                    <button className="element__button"></button>
                    <p className="element__like-quantity">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card