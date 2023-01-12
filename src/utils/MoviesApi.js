import apiSettings from "./apiSettings";

class MoviesApi {
  constructor({ apiSettings }) {
    this._baseUrl = apiSettings.moviesApi;
  }
  
  _parseResponse(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => this._parseResponse(res));
  }
}

const moviesApi = new MoviesApi({apiSettings});
export default moviesApi;