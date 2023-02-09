import { DURATION_SHORTMOVIES } from '../utils/constants'

export default function sortingMovies() {
  const sortingMoviesList = (movieList, saveMovieList, inputValue) => {

    const sortMovieList = []
    const regex = new RegExp(inputValue)
    movieList.forEach((item) => {
      if(regex.test(item.nameRU.toLowerCase()) || regex.test(item.nameEN.toLowerCase())) {
        if (saveMovieList.some(saveMovie => saveMovie.movieId === item.id)) {
          item.isSave = true
        } else {
          item.isSave = false
        }
        sortMovieList.push(item);
      }
    })

    return sortMovieList
  }

  const sortingSaveMoviesList = (movieList, inputValue) => {
    const sortMovieList = []
    const regex = new RegExp(inputValue)
    movieList.forEach((item) => {
      if(regex.test(item.nameRU.toLowerCase()) || regex.test(item.nameEN.toLowerCase())) {
        item.isSave = true
        sortMovieList.push(item);
      }
    })

    return sortMovieList
  }

  const sortingShortValue = (movieList, isShortValue) => {
    const sortMovieList = []

    movieList.forEach((item) => {
      if(item.duration <= DURATION_SHORTMOVIES || !isShortValue) {
        sortMovieList.push(item)
      }
    })

    return sortMovieList
  }
  
  return {sortingMoviesList, sortingShortValue, sortingSaveMoviesList}
}