import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import ErrorContext from '../../contexts/ErrorContext'
import './SearchForm.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import useFormValidation from '../../useFormValidation/useFormValidation'
import { useLocation } from 'react-router-dom'

function SearchForm({ isShort, handleSearch, searchResults, searchMovies, setError, firstEntrance, savedFilms, }) {
  const location = useLocation();
  const error = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation()
  // const searchInputValue = values.search
  
  useEffect(() => {
    if ((location.pathname === '/saved-movies' && savedFilms.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchResults })
    }
    setError(false)
  }, [searchResults, reset, setError, location.pathname, savedFilms])

  function onSubmit(evt) {
    evt.preventDefault()
      searchMovies(evt.target.search.value)
  }
  

  return (
    <section className='search page__search'>
      <div className='search__container'>
        <form noValidate className='search__form' name={'SearchForm'} onSubmit={onSubmit}>
          <input
            type="text"
            name='search'
            placeholder='Фильм'
            className='search__input'
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt)
              setError(false)
            }}
            disabled={savedFilms ? (savedFilms.length === 0 && true) : false}
            required
          />
          <button type='submit' className={`search__submit ${savedFilms ? (location.pathname === '/saved-movies' && savedFilms.length === 0) && 'search__submit_disabled' : ''}`}></button>
        </form>
        <span className={`search__error ${error && 'search__error_active'}`}>{'Введите ключевое слово'}</span>
        <FilterCheckbox  isShort={isShort} handleSearch={handleSearch} firstEntrance={firstEntrance} />
      </div>
    </section>
  )
}
export default SearchForm
