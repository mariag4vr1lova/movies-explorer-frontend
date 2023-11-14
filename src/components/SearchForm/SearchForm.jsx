import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import ErrorContext from '../../contexts/ErrorContext'
import './SearchForm.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import useFormValidation from '../../useFormValidation/useFormValidation'
import { useLocation } from 'react-router-dom'

function SearchForm({ isShort, handleSearch, searchResults, getMovies, setError, firstEntrance, savedMovie, }) {
  const location = useLocation();
  const error = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation()
  const searchInputValue = values.search
  
  useEffect(() => {
    if ((location.pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchResults })
    }
    setError(false)
  }, [searchResults, reset, setError, location.pathname, savedMovie])

  function onSubmit(evt) {
    evt.preventDefault()
    getMovies(evt.target.search.value)
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
            disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
            required
          />
          <button type='submit' className={`search__submit ${savedMovie ? (location.pathname === '/saved-movies' && savedMovie.length === 0) && 'search__submit_disabled' : ''}`}></button>
        </form>
        <span className={`search__error ${error && 'search__error_active'}`}>{'Введите ключевое слово'}</span>
        <FilterCheckbox searchInputValue={searchInputValue} isShort={isShort} handleSearch={handleSearch} firstEntrance={firstEntrance} />
      </div>
    </section>
  )
}
export default SearchForm
