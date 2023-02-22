import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [currentInputValue, setCurrentInputValue] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('');
  const [placeHolder, setPlaceHolder] = React.useState('Фильм');
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const location = useLocation()

  function handleChangeInput(e) {
    setInputValue(e.target.value)
  }

  function handleTumb() {    
    setIsShortFilm(!isShortFilm);
    props.handleTumbSearchForm(currentInputValue, !isShortFilm)
  }
  
  function handleSearchForm(e) {
    e.preventDefault()
    setCurrentInputValue(inputValue)

    if (inputValue === '') {
      setPlaceHolder('Нужно ввести ключевое слово')
    } else {
      props.submitSearchForm(inputValue.toLowerCase(), isShortFilm)
      setPlaceHolder('Фильм')
    }
  }

  React.useEffect(() => {
    if(location.pathname === '/movies') {
      const searchValue = JSON.parse(localStorage.getItem('searchValue'))
      setInputValue(searchValue === null ? '' : searchValue.inputValue)
      setIsShortFilm(searchValue === null ? false : searchValue.isShortFilm)
      setCurrentInputValue(searchValue === null ? '' : searchValue.inputValue)
    }
  }, [])

  return (
    <form className="search-form" onSubmit={handleSearchForm}>
      <div className="search-form__input-container">
        <input className={`search-form__input ${placeHolder === "Фильм" ? "" : 'search-form__input_error'}`}
          onChange={handleChangeInput}
          placeholder={placeHolder}
          value={inputValue}
        />
        <button className="search-form__btn-input" type="submit">Найти</button>
      </div>
      <div className="search-form__container">
        <h2 className="search-form__btn-description">Короткометражки</h2>
        <button className={`search-form__tumb ${isShortFilm ? 'search-form__tumb_on' : ''}`} type='button' onClick={handleTumb}>
          <div className="search-form__tumb-circle" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;