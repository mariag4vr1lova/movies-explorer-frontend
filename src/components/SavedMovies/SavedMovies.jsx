import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";
import { ShortDuration } from '../../utils/constants';

export default function SavedMovies({ savedFilms, onDelete, setError }) {

  const [filterResults, setFilterResults] = useState(savedFilms)
  const [searchResults, setSearchResults] = useState('')
  const [isShort, setIsShort] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isShort, movies) => {
    setSearchResults(search)
    setFilterResults(movies.filter((movie) => {
      const sort = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isShort ? (sort && movie.duration <= ShortDuration) : sort
    }))
  }, [])

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isShort, savedFilms)
  }

  useEffect(() => {
    if (savedFilms.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchResults, isShort, savedFilms)
  }, [filter, savedFilms, isShort, searchResults])

  function handleSearch() {
    if (isShort) {
      setIsShort(false)
      setFirstEntrance(false)
      filter(searchResults, false, savedFilms)
    } else {
      setIsShort(true)
      setFirstEntrance(false)
      filter(searchResults, true, savedFilms)
    }
  }

  return (
    <>
      <SearchForm
        isShort={isShort}
        searchMovies={searchMovies}
        searchResults={searchResults}
        handleSearch={handleSearch}
        setError={setError}
        firstEntrance={firstEntrance}
        savedFilms={savedFilms}
      />
      <MoviesCardList
        movies={filterResults}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  )
}
