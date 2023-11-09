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

function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstEntrance })  {
  const { pathname } = useLocation()
  const [count, setCount] = useState('')
  const fact = movies.slice(0, count)

  function printCards() {
    const counter = { init: InitMoreBigDisplay, step: StepBigDisplay }
    if (window.innerWidth < BigDisplay) {
      counter.init = InitLessBigDisplay
      counter.step = StepMediumDisplay
    }
    if (window.innerWidth < MediumDispaly) {
      counter.init = InitMediumDispaly
      counter.step = StepMinDisplay
    }
    if (window.innerWidth < MiniDisplay) {
      counter.init = InitMiniDisplay
      counter.step = StepMinDisplay
    }
    return counter
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= StepBigDisplay) {
          setCount(printCards().init)
        }
        if (window.innerWidth < StepBigDisplay) {
          setCount(printCards().init)
        }
        if (window.innerWidth < MediumDispaly) {
          setCount(printCards().init)
        }
        if (window.innerWidth < MiniDisplay) {
          setCount(printCards().init)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [pathname, movies])

  function clickMore() {
    setCount(count + printCards().step)
  }
    return (
        <section className='movies page__movies'>
        <ul className='movies__lists'>
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
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
              }) : serverError ?
                <span className='movies__serch-error'>«Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз»
                </span>
                : !firstEntrance ?
                <span className='movies__serch-error'>«Ничего не найдено»</span>
                : pathname === '/movies' ?
                <span className='movies__serch-error'>«Чтобы увидеть список фильмоа выполните поиск»</span>
                :
                <span className='movies__serch-error'>«Нет сохранённых фильмов»</span>
        }
        </ul>
        {pathname === '/movies' && <button type='button' className={`movies__more ${count >= movies.length && 'movies__more_hidden'}`} onClick={clickMore}>Ёще</button>}
        </section>
    )
}
export default MoviesCardList
