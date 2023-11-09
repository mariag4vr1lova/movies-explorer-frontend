class ApiMovies {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkRes(res) {return res.ok ? res.json() : Promise.reject}

  _request(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._checkRes)
  }

  getMovies() {
    return this._request('/')
  }
}

const apiMovies = new ApiMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default apiMovies
