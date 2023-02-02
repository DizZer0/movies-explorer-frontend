import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";

import sortingMovies from "../../hooks/sortingMovies";

import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";

function Movies() {
  const { sortingMoviesList, sortingShortValue } = sortingMovies()

  const [movieList, setMovieList] = React.useState([]);
  const [sortedMovieList, setSortedMovieList] = React.useState([]);
  const [saveMovieList, setSaveMovieList] = React.useState([]);
  const [isShortValue, setIsShortValue] = React.useState(false)

  const [preloaderOn, setPreloaderOn] = React.useState(false)
  const [serverError, setServerError] = React.useState(false)

  function handleTumbSearchForm(inputValue, isShortValue) {
    setIsShortValue(isShortValue)
    console.log(inputValue)

    localStorage.setItem('searchValue', JSON.stringify({
      inputValue: inputValue, 
      isShortFilm: isShortValue
    }))
  }

  function submitSearchForm(inputValue, isShortValue) {
    const sortedMovies  = sortingMoviesList(movieList, saveMovieList, inputValue)
    localStorage.setItem('films', JSON.stringify(sortedMovies))
    setSortedMovieList(sortedMovies)
    setIsShortValue(isShortValue)

    localStorage.setItem('searchValue', JSON.stringify({
      inputValue: inputValue, 
      isShortFilm: isShortValue
    }))
  }

  function getMovieList() {
    moviesApi.getMovies()
        .then(res => {
          setMovieList(res)
          setPreloaderOn(false)
          setServerError(false)
        })
        .catch(err => setServerError(true))
  }

  function getSaveMovieList() {
    mainApi.getMovies()
      .then(res => {
        setSaveMovieList(res)
        setServerError(false)
      })
      .catch(err => setServerError(true))
  }

  function saveMovieCard(id) {
    getSaveMovieList()

    mainApi.saveMovie(sortedMovieList.find(item => item.id === id))
      .then(res => {
        setServerError(false)
        changeLocalMovielist(res, true)
      })
      .catch(err => setServerError(true))
  }

  function changeLocalMovielist(movie, bool) {
    const movieList = JSON.parse(localStorage.getItem('films'))
    
    movieList.forEach((item, index) => {
      if(item.id === movie.movieId) {
        console.log(item.id)
        movieList[index].isSave = bool
      }
    });

    localStorage.setItem('films', JSON.stringify(movieList))
  }

  function deleteMovieCard(id) {
    getSaveMovieList()

    mainApi.deleteMovie(saveMovieList.find(item => item.movieId === id)._id)
      .then(res => {
        setServerError(false)
        changeLocalMovielist(res, false)
      })
      .catch(err => setServerError(true))
  }

  function switchComponent() {
    if(serverError) {
      return <h2 className="movies__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
    } else if (sortedMovieList === null || sortedMovieList.length === 0) {
      return <h2 className="movies__not-found">Ничего не найдено</h2>
    } else if(sortedMovieList.length > 0 && preloaderOn === false) {
      return <MoviesCardList movieList={sortingShortValue(sortedMovieList, isShortValue)} saveMovieCard={saveMovieCard} deleteMovieCard={deleteMovieCard}/>
    } else if (preloaderOn === true) {
      return <Preloader />
    } 
  }

  React.useEffect(() => {
    setPreloaderOn(false)
    getMovieList()
    getSaveMovieList()
    setSortedMovieList(JSON.parse(localStorage.getItem('films')))

    const searchValue = JSON.parse(localStorage.getItem('searchValue'))
    setIsShortValue(searchValue === null ? '' : searchValue.isShortFilm)
  }, [])

  return (
    <>
      <Header loggedIn={true}/>    
      <section className="movies">
        <SearchForm submitSearchForm={submitSearchForm} handleTumbSearchForm={handleTumbSearchForm}/>
        {switchComponent()}
      </section>
      <Footer />
    </>
  );
};

export default Movies;