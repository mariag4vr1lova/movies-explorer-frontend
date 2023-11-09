import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useState } from "react";
import apiMovies from '../../utils/MoviesApi';
import { useEffect } from "react";
import { ShortDuration } from '../../utils/constants'

function Movies({ setIsError, addMovie, savedMovies }) {
  const [searchedMovie, setSearchedMovie] = useState('')
  const [allMovies, setAllMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)
  const [serverError, setServerError] = useState(false)
  

  const filters = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isCheck))
    localStorage.setItem('allmovies', JSON.stringify(movies))
    setFilterMovies(movies.filter((movie) => {
      const searchTitle = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchTitle && movie.duration <= ShortDuration) : searchTitle
    }))
  }, [])

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      apiMovies.getMovies()
        .then((res) => {
          setAllMovies(res)
          setIsCheck(false)
          setFirstEntrance(false)
          setServerError(false)
          filters(search, isCheck, res)
        })
        .catch(err => {
          setServerError(true)
          console.error(`Ошибкак во время поиска фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filters(search, isCheck, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setServerError(false)
      setFirstEntrance(false)
      setSearchedMovie(search)
      setIsCheck(isCheck)
      setAllMovies(movies)
      filters(search, isCheck, movies)
    }
  }, [filters])

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filters(searchedMovie, false, allMovies)
      localStorage.setItem('shorts', JSON.stringify(false))
    } else {
      setIsCheck(true)
      filters(searchedMovie, true, allMovies)
      localStorage.setItem('shorts', JSON.stringify(true))
    }
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        firstEntrance={firstEntrance}
        searchMovies={searchMovies}
        changeShort={changeShort}
        searchedMovie={searchedMovie}
        setIsError={setIsError} 
      />
      <MoviesCardList
        movies={filterMovies}
        firstEntrance={firstEntrance}
        isLoading={isLoading}
        addMovie={addMovie}
        savedMovies={savedMovies}
        serverError={serverError}
      />
    </>
  )
}
export default Movies
