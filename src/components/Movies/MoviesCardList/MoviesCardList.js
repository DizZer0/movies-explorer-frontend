import MoviesCard from '../MoviesCard/MoviesCard'

import moviesApi from '../../../utils/MoviesApi';

import React from 'react';

function MoviesCardList(props) {
  const [movieList, setMovieList] = React.useState([]);
  const [initialNumberCard, setInitialNumberCard] = React.useState(0)
  const screenWidth = window.innerWidth

  function changeNumberCard() {
    if(screenWidth >= 1280) {
      setInitialNumberCard(12 + props.valueMoreBtn * 3)
    } else if (screenWidth >= 768) {
      setInitialNumberCard(8 + props.valueMoreBtn * 2)
    } else {
      setInitialNumberCard(5 + props.valueMoreBtn * 2)
    }
  }

  function saveDataSearch() {
    localStorage.setItem('searchValue', JSON.stringify({
      inputValue: props.searchInputValue, 
      isShortFilm: props.isShortFilm
    }))
  }

  function sortingMovieList(arr) {
    const regex = new RegExp(props.searchInputValue)
    console.log(regex)
    const sortMovieList = []

    arr.forEach((item) => {
      if(item.nameRU.match(regex) === null && item.nameEN.match(regex) === null) {
        return
      } else if (!props.isShortFilm || item.duration <= 40) {
        sortMovieList.push(item);
      }
    })
    setMovieList(sortMovieList)

    saveDataSearch()

    localStorage.setItem('films', JSON.stringify(sortMovieList))

  }

  function getMovieList() {
    if(props.searchInputValue === '') {
      return
    } else {
      moviesApi.getMovies()
        .then(res => {
          sortingMovieList(res)
        })
    }
  }

  React.useEffect(() => {
    props.renderMoreBtn(movieList === null ? true : movieList.length <= initialNumberCard)
  }, [initialNumberCard])

  React.useEffect(() => {
    getMovieList()
  }, [props.searchInputValue])

  React.useEffect(() => {
    changeNumberCard()
  }, [props.valueMoreBtn])

  React.useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('films')))

  }, [movieList])

  React.useEffect(() => {
    setMovieList(JSON.parse(localStorage.getItem('films')))
  }, [])

  return (
    <section className="card-list">
      <ul className='card-list__list'>
        {movieList === null ? '' :movieList.slice(0, initialNumberCard).map((card) => {
          return <MoviesCard key={card.id} name={card.nameRU} duration={card.duration} image={card.image.url} />
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;