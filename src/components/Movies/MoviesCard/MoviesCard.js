import devImage from '../../../images/devImgMoviesCard.png'
import React from 'react';

function MoviesCard(props) {
  const [isActiveSaveBtn, setIsActiveSaveBtn] = React.useState(false)

function handleSaveBtn() {
  setIsActiveSaveBtn(!isActiveSaveBtn)
}

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <h2 className="movies-card__title">{props.name}</h2>
        <p className="movies-card__duration">{`${props.duration} минут`}</p>
      </div>
      <img className="movies-card__preview" src={`https://api.nomoreparties.co/${props.image}`} alt="Превью фильма"/>
      <button className={`movies-card__save-btn ${isActiveSaveBtn ? 'movies-card__save-btn_active' : ''}`} onClick={handleSaveBtn}>{isActiveSaveBtn ? '' : 'Сохранить'}</button>
    </div>
  );
};

export default MoviesCard;