import MoviesCard from '../MoviesCard/MoviesCard'

import React from 'react';
import { useLocation } from 'react-router-dom'

function MoviesCardList(props) {
  const [initialNumberCard, setInitialNumberCard] = React.useState(0)
  const [moreBtn, setMoreBtn] = React.useState(false)
  const [valueMoreBtn, setValueMoreBtn] = React.useState(0)
  const location = useLocation().pathname
  console.log('log')
  function changeValueMoreBtn() {
    setValueMoreBtn(valueMoreBtn + 1)
  }

  function renderMoreBtn(bool) {
    setMoreBtn(bool)
  }

  function changeNumberCard() {
    if(window.innerWidth >= 1280) {
      setInitialNumberCard(12 + valueMoreBtn * 3)
    } else if (window.innerWidth >= 768) {
      setInitialNumberCard(8 + valueMoreBtn * 2)
    } else {
      setInitialNumberCard(5 + valueMoreBtn * 2)
    }
  }

  React.useEffect(() => {
    renderMoreBtn(props.movieList.length <= initialNumberCard ? true : false)
  }, [initialNumberCard])

  React.useEffect(() => {
    renderMoreBtn(props.movieList.length <= initialNumberCard ? true : false)
  }, [props.movieList])

  React.useEffect(() => {
    if(location === '/saved-movies') {
      setInitialNumberCard(props.movieList.length)
    } else {
      changeNumberCard()
    }
  }, [valueMoreBtn])

  React.useEffect(() => {
    renderMoreBtn(props.movieList.length <= initialNumberCard ? true : false)
    console.log(props.movieList.length <= initialNumberCard)
    let locked = false
    window.addEventListener("resize", function() {
      if(locked) {
        return
      } else {
        locked = true

        setTimeout(() => {
          changeNumberCard()
          locked = false
        }, 100)
      }
    })  
  }, [])

  return (
    <section className="card-list">
      <ul className='card-list__list'>
        {props.movieList.slice(0, initialNumberCard).map((card) => {
            return <MoviesCard
              key={location === '/movies' ? card.id : card.movieId} 
              id={location === '/movies' ? card.id : card.movieId} 
              isSave={card.isSave}
              name={card.nameRU} 
              duration={card.duration} 
              image={location === '/movies' ? `https://api.nomoreparties.co${card.image.url}` : card.image} 
              saveMovieCard={props.saveMovieCard}
              deleteMovieCard={props.deleteMovieCard}
            />
        })}
      </ul>
      <button className={`card-list__more-btn ${moreBtn ? 'card-list__more-btn_invisible' : ''}`} onClick={changeValueMoreBtn}>Ещё</button>
    </section>
  );
};

export default MoviesCardList;