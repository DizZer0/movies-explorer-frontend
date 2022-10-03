import devImage from '../../../images/devImgMoviesCard.png'

function MoviesCard() {
  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <h2 className="movies-card__title">В погоне за Бенкси</h2>
        <p className="movies-card__duration">27 минут</p>
      </div>
      <img className="movies-card__preview" src={devImage} alt="Превью фильма"/>
      <button className="movies-card__save-btn">Сохранить</button>
    </div>
  );
};

export default MoviesCard;