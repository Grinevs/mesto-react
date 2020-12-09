export default function Cards(props) {

  function handleClick() {
    props.onImgClick(props.card);
  }  
  const arrayOfLikes =props.card.likes;
  const checkArray = arrayOfLikes.map((item)=> item._id)

  return (
    <li className="element">
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.alt ? props.card.alt : props.card.name}
        onClick={handleClick}
      />
      <h3 className="element__title">{props.card.name}</h3>
      {props.ownerId === props.card.owner._id ? (
        <button type="button" className="element__recyclebin"></button>
      ) : (
        <></>
      )}

      <button
        type="button"
        className={
          checkArray.includes(props.ownerId)
            ? "element__like-button element__like-button_active"
            : "element__like-button"
        }
      ></button>
      <p className="element__likes">{arrayOfLikes.length}</p>
    </li>
  );
}
