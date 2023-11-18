import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useState } from "react";
import apiMovies from '../../utils/MoviesApi';
import { useEffect } from "react";
import { ShortDuration } from '../../utils/constants'

function Movies({ setError, addMovie, likeMovie, savedMovies }) {
  const [searchResults, setSearchResults] = useState('')
  const [isMovies, setIsMovies] = useState([])
  const [filterResults, setFilterResults] = useState([])
  const [isShort, setIsShort] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)
  const [notFound, setNotFound] = useState(false)
  

  const filter = useCallback((search, isShort, movies) => {
    setSearchResults(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isShort))
    localStorage.setItem('isMovies', JSON.stringify(movies))
    setFilterResults(movies.filter((movie) => {
      const sort = 
      movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(search.toLowerCase());
      return isShort ? (sort && movie.duration <= ShortDuration) : sort
    }))
  }, [])

  function searchMovies(search) {
    if (isMovies.length === 0) {
      setIsLoading(true)
      apiMovies.getMovies()
        .then((res) => {
          setIsMovies(res)
          setIsShort(false)
          setFirstEntrance(false)
          setNotFound(false)
          filter(search, isShort, res)
        })
        .catch(err => {
          setNotFound(true)
          console.error(`Ошибкак во время поиска фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filter(search, isShort, isMovies)
    }
    console.log(search)
  }

  useEffect(() => {
    if (localStorage.isMovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.isMovies)
      const search = JSON.parse(localStorage.movie)
      const isShort = JSON.parse(localStorage.shorts)
      setNotFound(false)
      setFirstEntrance(false)
      setSearchResults(search)
      setIsShort(isShort)
      setIsMovies(movies)
      filter(search, isShort, movies)
    }
  }, [filter])

  function handleSearch() {
    if (isShort) {
      setIsShort(false)
      filter(searchResults, false, isMovies)
      localStorage.setItem('shorts', JSON.stringify(false))
    } else {
      setIsShort(true)
      filter(searchResults, true, isMovies)
      localStorage.setItem('shorts', JSON.stringify(true))
    }
  }

  return (
    <>
      <SearchForm
        isShort={isShort}
        firstEntrance={firstEntrance}
        searchMovies={searchMovies}
        handleSearch={handleSearch}
        searchResults={searchResults}
        setError={setError} 
      />
      <MoviesCardList
        movies={filterResults}
        firstEntrance={firstEntrance}
        isLoading={isLoading}
        addMovie={addMovie}
        likeMovie={likeMovie}
        savedMovies={savedMovies}
        notFound={notFound}
      />
    </>
  )
}
export default Movies
