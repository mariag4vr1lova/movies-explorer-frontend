import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";
import { ShortDuration } from '../../utils/constants';

export default function SavedMovies({ savedMovie, onDelete, setError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovie)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isShort, setIsShort] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isShort, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isShort ? (searchName && movie.duration <= ShortDuration) : searchName
    }))
  }, [])

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isShort, savedMovie)
  }

  useEffect(() => {
    if (savedMovie.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchedMovie, isShort, savedMovie)
  }, [filter, savedMovie, isShort, searchedMovie])

  function handleSearch() {
    if (isShort) {
      setIsShort(false)
      setFirstEntrance(false)
      filter(searchedMovie, false, savedMovie)
    } else {
      setIsShort(true)
      setFirstEntrance(false)
      filter(searchedMovie, true, savedMovie)
    }
  }

  return (
    <>
      <SearchForm
        isShort={isShort}
        searchMovies={searchMovies}
        searchResults={searchedMovie}
        handleSearch={handleSearch}
        setError={setError}
        firstEntrance={firstEntrance}
        savedMovie={savedMovie}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  )
}
