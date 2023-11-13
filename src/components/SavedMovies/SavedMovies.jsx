import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";

export default function SavedMovies({ savedMovie, onDelete, setError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovie)
  const [searchedMouvie, setSearchResults] = useState('')
  const [isShort, setIsShort] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isShort, movies) => {
    setSearchResults(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isShort ? (searchName && movie.duration <= 40) : searchName
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
    filter(searchedMouvie, isShort, savedMovie)
  }, [filter, savedMovie, isShort, searchedMouvie])

  function handleSearch() {
    if (isShort) {
      setIsShort(false)
      setFirstEntrance(false)
      filter(searchedMouvie, false, savedMovie)
    } else {
      setIsShort(true)
      setFirstEntrance(false)
      filter(searchedMouvie, true, savedMovie)
    }
  }

  return (
    <>
      <SearchForm
        isShort={isShort}
        searchMovies={searchMovies}
        searchResults={searchedMouvie}
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
