function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <input className="search-form__input" placeholder="Фильм"/>
        <button className="search-form__btn-input">Найти</button>
      </div>
      <div className="search-form__container">
        <h2 className="search-form__btn-description">Короткометражки</h2>
        <button className="search-form__tumb">
          <div className="search-form__tumb-circle" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;