import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useCallback, useEffect, useState } from 'react';
import SendContext from '../contexts/SendContext';
import ActualUserContext from '../contexts/ActualUserContext';
import ErrorContext from '../contexts/ErrorContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedPage from './ProtectedPage/ProtectedPage';
import Preloader from './Preloader/Preloader';
import mainApi from '../utils/MainApi';


function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [isPreloader, setIsPreloader] = useState(false);
  const [movies, setMovies] = useState([])
  const [actualUser, setActualUser] = useState({})
  const [error, setError] = useState(false)
  const [isShortToken, setIsShortToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  
  useEffect(() => {
    if (localStorage.jwt) {
      mainApi.getUserData(localStorage.jwt) 
        .then((userData) => {
          setActualUser(userData)
          setLoggedIn(true)
          setIsShortToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке данных ${err}`)
          setIsShortToken(false)
          setLoggedIn(true)
        })
      mainApi.getMovies(localStorage.jwt) 
        .then((dataMovies) => {
          setMovies(dataMovies.reverse())
        })
        .catch((err) => {
          console.error(`Нет сохраненных фильмов ${err}`)
        })
    } 
    else {
      setLoggedIn(false)
      setIsShortToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

  function handleLikelMovie(data) {
      const isLike = movies.some(element => data.id === element.movieId)
      const movieClick = movies.filter((movie) => {
        return movie.movieId === data.id
      })
      if (isLike) {
        handleDeleteMovie(movieClick[0]._id)
      }
    }
  function handelSaveMovie(data) {
    mainApi.addMovie(data, localStorage.jwt)
      .then(res => {
        setMovies([res, ...movies])
      })
      .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
  }
  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, []) 
  function handleDeleteMovie(deletemovieId) {
      mainApi.deleteMovie(deletemovieId, localStorage.jwt)
        .then(() => {
          setMovies((state) =>
            state.filter((movie) => {
              return movie._id !== deletemovieId;
            }))
        })
        .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
        .finally(() => setIsPreloader(false));
    }

  function handleRegister(username, email, password) {
    setIsPreloader(true)
    mainApi.registration(username, email, password)
    .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.authorization(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
          })
          .catch((err) => {
            console.error(`Ошибкак после регистрации ${err}`)
          })
      }
    })
    .catch((err) => {
      setLoggedIn(false)
      console.error(`Ошибкак при авторизации ${err}`)
    })
    .finally(() => setIsPreloader(false))
  }

  function handleAuthorization(email, password) {
    setIsPreloader(true)
    mainApi.authorization(email, password)
    .then(res => {
      localStorage.setItem('jwt', res.token)
      setLoggedIn(true)
      navigate("/movies", { replace: true });
      window.scrollTo(0, 0);
    })
    .catch((err) => {
      setLoggedIn(false)
      setError(true)
      console.error(`Ошибка авторизации. ${err}`)
    })
    .finally(() => {setIsPreloader(false)})
  }
  
  function handleLogout() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }
  function handleUpdateUser(username, email) {
    setIsPreloader(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
    .then(res => {
      setActualUser(res)
      setIsSuccess(true)
      setIsEdit(false)
    })
      .catch((err) => {
        setError(true)
        console.error(`При редактировании профиля произошла ошибка ${err}`)
      })
      .finally(() => setIsPreloader(false))
  }
  return (
    <div className="page__container">
      {isShortToken ? <Preloader /> :
        <ActualUserContext.Provider value={actualUser}>
          <SendContext.Provider value={isPreloader}>
            <ErrorContext.Provider value={error}>
              <Routes>

                <Route path='/signin' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signin' 
                      onLogin={handleAuthorization} 
                      setError={setError}
                    />
                } />

                <Route path='/signup' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signup' 
                      onRegister={handleRegister} 
                      setError={setError}
                    />
                } />

                <Route path='/profile' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='profile'
                  loggedIn={loggedIn}
                  handleLogout={handleLogout}
                  editUserData={handleUpdateUser}
                  setError={setError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                />
                } />

                <Route path='/' element={
                  <>
                    <Header name='home' loggedIn={loggedIn} />
                    <Main name='home' />
                    <Footer />
                  </>
                } />

                <Route path='/movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='movies'
                  savedMovies={movies}
                  addMovie={handelSaveMovie}
                  likeMovie={handleLikelMovie}
                  loggedIn={loggedIn}
                  setError={setError}
                />
                } />

                <Route path='/saved-movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='savedmovies'
                  onDelete={handleDeleteMovie}
                  savedMovies={movies}
                  loggedIn={loggedIn}
                  setError={setError}
                />
                } />

                <Route path='*' element={
                  <>
                    <Main name='error' />
                  </>
                } />

              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </ActualUserContext.Provider>
      }
    </div>
  );
}

export default App;
