import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MoviesCard({ onDelete, addMovie, likeMovie, data, savedMovies }) {
  const location = useLocation();
  const [click, setClick] = useState(false)

  useEffect(() => {
    if (location.pathname === '/movies')
      setClick(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, setClick, location.pathname])

  function onClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClick(true)
      //addMovie(data)
      likeMovie(data)
    } else {
      setClick(false)
      addMovie(data)
      likeMovie(data)
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
  }
    return (
        <li className='movies__card'>
        <article>
            <Link to={data.trailerLink} target='_blank'>
            <img src={location.pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className='movies__image' />
            </Link>
            <div className='movies__information'>
            <div className='movies__text'>
                <p className='movies__subtitle'>{data.nameRU}</p>
                <span className='movies__duration'>{convertTime(data.duration)}</span>
            </div>
            {location.pathname === '/movies' ?
                <button type='button' className={`movies__save ${click ? 'movies__save_active' : ''}`} onClick={onClick}></button>
                :
                <button type='button' className={`movies__save movies__save_type_delete`} onClick={() => onDelete(data._id)}></button>
            }
            </div>
        </article>
        </li>
    )
}
export default MoviesCard
