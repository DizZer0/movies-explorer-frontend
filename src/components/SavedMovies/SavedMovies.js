import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import PushNotification from "../PushNotification/PushNotification";

import sortingMovies from "../../hooks/sortingMovies";


import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";

function Movies() {
  const { sortingSaveMoviesList, sortingShortValue } = sortingMovies()

  const [saveMovieList, setSaveMovieList] = React.useState([]);
  const [sortedMovieList, setSortedMovieList] = React.useState([])
  const [isShortValue, setIsShortValue] = React.useState(false)
  const [inputValue, setInputValue] = React.useState()

  const [preloaderOn, setPreloaderOn] = React.useState(false)
  const [serverError, setServerError] = React.useState(false)

  const [pushNotificationValue, setPushNotificationValue] = React.useState({
    isActive: false,
    isSuccessful: false
  })

  function openPushNotification(isSuccessful) {
    closedPushNotification(isSuccessful)
    return {
      isActive: true,
      isSuccessful: isSuccessful
    }
  }

  function closedPushNotification(isSuccessful) {
    setTimeout(() => {
      setPushNotificationValue({
        isActive: false,
        isSuccessful: isSuccessful
      })
    }, 3000);
  }

  function handleTumbSearchForm(inputValue, isShortValue) {
    setIsShortValue(isShortValue)
  }

  function submitSearchForm(inputValue, isShortValue) {
    const sortedMovies  = sortingSaveMoviesList(saveMovieList, inputValue)
    console.log(sortedMovies)
    setSortedMovieList(sortedMovies)
    setIsShortValue(isShortValue)
    setInputValue(inputValue)
  }

  function getSaveMovieList() {
    setPreloaderOn(true)

    mainApi.getMovies()
      .then(res => {
        setSaveMovieList(res)
        setSortedMovieList(sortingSaveMoviesList(res, ''))
        setPreloaderOn(false)
        setServerError(false)
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
    console.log('1')
    mainApi.deleteMovie(saveMovieList.find(item => item.movieId === id)._id)
      .then(res => {
        getSaveMovieList()
        changeLocalMovielist(res, false)
        setPushNotificationValue(openPushNotification(true))
      })
      .catch(err => {
        setPushNotificationValue(openPushNotification(false))
      })
  }

  function switchComponent() {
    console.log(inputValue)
    if(serverError) {
      return <h2 className="saved-movies__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
    }  else if(saveMovieList.length > 0 && preloaderOn === false) {
      return <MoviesCardList movieList={sortingShortValue(sortedMovieList, isShortValue)} deleteMovieCard={deleteMovieCard}/>
    } else if (preloaderOn === true) {
      return <Preloader />
    } else {
      return inputValue === undefined ? '' :  <h2 className="movies__not-found">Ничего не найдено</h2>
    }
  }

  React.useEffect(() => {
    setPreloaderOn(false)
    getSaveMovieList()
  }, [])

  return (
    <>
      <Header loggedIn={true}/>    
      <section className="saved-movies">
        <SearchForm submitSearchForm={submitSearchForm} handleTumbSearchForm={handleTumbSearchForm}/>
        {switchComponent()}
      </section>
      <Footer />
      <PushNotification value={pushNotificationValue}/>
    </>
  );
};

export default Movies;