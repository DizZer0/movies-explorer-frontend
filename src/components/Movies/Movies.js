import React from "react";

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";

//import moviesApi from "../../utils/MoviesApi";
//import Preloader from "./Preloader/Preloader";

function Movies() {
const [searchInputValue, setSearchInputValue] = React.useState('')
const [isShortFilm, setIsShortFilm] = React.useState(false)

const [valueMoreBtn, setValueMoreBtn] = React.useState(0)
const [moreBtn, setMoreBtn] = React.useState(true)

function renderMoreBtn(bool) {
  setMoreBtn(bool)
}

function submitSearchForm(inputValue, isShortFilm) {
  setSearchInputValue(inputValue)
  setIsShortFilm(isShortFilm)
  setValueMoreBtn(0)
}

function handleClickMoreBtn() {
  console.log('f')
  setValueMoreBtn(valueMoreBtn + 1)
}

  return (
    <>
      <Header />    
      <div className="movies">
        <SearchForm submitSearchForm={submitSearchForm}/>
        {/*<Preloader /> */}
        <MoviesCardList  searchInputValue={searchInputValue} isShortFilm={isShortFilm} valueMoreBtn={valueMoreBtn} renderMoreBtn={renderMoreBtn}/>
        <button className={`movies__more-btn ${moreBtn ? 'movies__more-btn_invisible' : ''}`} onClick={handleClickMoreBtn}>Ещё</button>
      </div>
      <Footer />
    </>
  );
};

export default Movies;