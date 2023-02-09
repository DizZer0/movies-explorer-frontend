import { MOVIES_URL } from "./constants";

class MoviesApi {
  constructor(apiUrl) {
    this._baseUrl = apiUrl;
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

const moviesApi = new MoviesApi(MOVIES_URL);
export default moviesApi;