
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies'
const MAIN_URL = 'http://localhost:3000'

const DURATION_SHORTMOVIES = 40

const DEVICE_PARAMS = {
  desktop: {
    width: 1280,
    cards: {
      more: 3,
      initialValue: 12,
    },
  },
  tablet: {
    width: 768,
    cards: {
      more: 2,
      initialValue: 8,
    },
  },
  mobile: {
    width: 320,
    cards: {
      more: 1,
      initialValue: 5,
    },
  }
}

export  { MOVIES_URL, MAIN_URL, DURATION_SHORTMOVIES, DEVICE_PARAMS }