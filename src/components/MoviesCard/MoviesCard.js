import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const [isActiveSaveBtn, setIsActiveSaveBtn] = React.useState(props.isSave)

  const location = useLocation().pathname

  function switchStatusBtn() {
    if (isActiveSaveBtn && location === '/movies') {
      return 'movies-card__save-btn_active'
    } else if (location === '/saved-movies') {
      return 'movies-card__save-btn_delete'
    } else {
      return ''
    }
  }

  function handleSaveBtn() {
    console.log(isActiveSaveBtn)
    if (isActiveSaveBtn) {
      props.deleteMovieCard(props.id)
    } else {
      props.saveMovieCard(props.id)
    }
    setIsActiveSaveBtn(!isActiveSaveBtn)
  }

  return (
    <li className='movies-card'>
      <article className="movies-card__item">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{props.name}</h2>
          <p className="movies-card__duration">{`${props.duration} минут`}</p>
        </div>
        <a className='movies-card__preview-link' href={`${props.trailerLink}`} target='_blank' rel="noreferrer">
          <img className="movies-card__preview" src={props.image} alt="Превью фильма"/>
        </a>
        <button className={`movies-card__save-btn ${switchStatusBtn()}`} onClick={handleSaveBtn}>{!isActiveSaveBtn && location === '/movies' ? 'Сохранить' : ''}</button>
      </article>
    </li>
  );
};

export default MoviesCard;