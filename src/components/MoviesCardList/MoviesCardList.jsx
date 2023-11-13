import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'
import {
  BigDisplay,
  MediumDispaly,
  MiniDisplay,
  InitMoreBigDisplay,
  InitLessBigDisplay,
  InitMediumDispaly,
  InitMiniDisplay,
  StepBigDisplay,
  StepMediumDisplay,
  StepMinDisplay
} from "../../utils/constants";

function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, likeMovie, notFound, firstEntrance })  {
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const fact = movies.slice(0, screenWidth)

  function cardsMovies() {
    const screenWidth = window.innerWidth;
    const counter = { init: InitMoreBigDisplay, step: StepBigDisplay }
    if (screenWidth < BigDisplay) {
      counter.init = InitLessBigDisplay
      counter.step = StepMediumDisplay
    }
    if (screenWidth < MediumDispaly) {
      counter.init = InitMediumDispaly
      counter.step = StepMinDisplay
    }
    if (screenWidth < MiniDisplay) {
      counter.init = InitMiniDisplay
      counter.step = StepMinDisplay
    }
    return counter
  }
  

  useEffect(() => {
    if (location.pathname === '/movies') {
      setScreenWidth(cardsMovies().init)
      function cardsMovieForResize() {
        if (window.innerWidth >= StepBigDisplay) {
          setScreenWidth(cardsMovies().init)
        }
        if (window.innerWidth < StepBigDisplay) {
          setScreenWidth(cardsMovies().init)
        }
        if (window.innerWidth < MediumDispaly) {
          setScreenWidth(cardsMovies().init)
        }
        if (window.innerWidth < MiniDisplay) {
          setScreenWidth(cardsMovies().init)
        }
      }
      window.addEventListener('resize', cardsMovieForResize);
      return () => window.removeEventListener('resize', cardsMovieForResize);
    }
  }, [location.pathname, movies])

  function clickMore() {
    setScreenWidth(screenWidth + cardsMovies().step)
  }
    return (
        <section className='movies page__movies'>
        <ul className='movies__lists'>
        {isLoading ? <Preloader /> :
          (location.pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  likeMovie={likeMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : notFound ?
                <span className='movies__serch-error'>«Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз»
                </span>
                : !firstEntrance ?
                <span className='movies__serch-error'>«Ничего не найдено»</span>
                : location.pathname === '/movies' ?
                <span className='movies__serch-error'>«Чтобы увидеть список фильмоа выполните поиск»</span>
                :
                <span className='movies__serch-error'>«Нет сохранённых фильмов»</span>
        }
        </ul>
        {location.pathname === '/movies' && <button type='button' className={`movies__more ${screenWidth >= movies.length && 'movies__more_hidden'}`} onClick={clickMore}>Ёще</button>}
        </section>
    )
}
export default MoviesCardList
