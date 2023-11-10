import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useCallback, useEffect, useState } from 'react';
import SendContext from '../contexts/SendContext';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ErrorContext from '../contexts/ErrorContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedPage from './ProtectedPage/ProtectedPage';
import Preloader from './Preloader/Preloader';
import mainApi from '../utils/MainApi';

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  //const [headerEmail, setHeaderEmail] = useState("");
  //const [errorMessage, setErrorMessage] = useState()
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  
  // useEffect(() => {
  //   if (localStorage.jwt) {
  //     mainApi.setUserInfo(localStorage.jwt)
  //     .then(res => {
  //       // setHeaderEmail(res.email)
  //       setLoggedIn(true)
  //       navigate("/movies", { replace: true });
  //     })
  //     .catch(error => console.error("Ошибка авторизации при повторном входе"`${error}`))
  //   } else {
  //   setLoggedIn(false)
  //   }
  // }, [navigate])
  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserData(localStorage.jwt), mainApi.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          //setErrorMessage('При авторизации произошла ошибка.')
          console.error(`Ошибка при загрузке данных ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

  function handleLikelMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachMovieClick = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachMovieClick[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
    }
  }
  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])
  
  function handleDeleteMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }
  function handleRegister(username, email, password) {
    setIsSend(true)
    mainApi.registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.authorization(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
          })
          .catch((err) => {
            setIsError(true)
            //setErrorMessage('При авторизации произошла ошибка.')
            console.error(`При авторизации произошла ошибка. ${err}`)
          })
          .finally(() => setIsSend(false))
      }
    })
    .catch((err) => {
      setIsError(true)
      //setErrorMessage('При регистрации произошла ошибка.')
      console.error(`При регистрации произошла ошибка ${err}`)
    })
    .finally(() => setIsSend(false))
  }

  function handleAuthorization(email, password) {
    setIsSend(true)
    mainApi.authorization(email, password)
    .then(res => {
      localStorage.setItem('jwt', res.token)
      setLoggedIn(true)
      navigate("/movies", { replace: true });
    })
    .catch((err) => {
      setIsError(true)
      //setErrorMessage('Ошибка авторизации.')
      console.error(`Ошибка авторизации. ${err}`)
    })
    .finally(() => {setIsSend(false)})
  }

  function editUserData(username, email) {
    setIsSend(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
    .then(res => {
      setCurrentUser(res)
      setIsSuccess(true)
      setIsEdit(false)
    })
      .catch((err) => {
        setIsError(true)
        //setErrorMessage('При редактировании профиля произошла ошибка')
        console.error(`При редактировании профиля произошла ошибка ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <div className="page__container">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>

                <Route path='/signin' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signin' 
                      onLogin={handleAuthorization} 
                      setIsError={setIsError}
                    />
                } />

                <Route path='/signup' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signup' 
                      onRegister={handleRegister} 
                      setIsError={setIsError}
                    />
                } />

                <Route path='/profile' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='profile'
                  loggedIn={loggedIn}
                  editUserData={editUserData}
                  setIsError={setIsError}
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
                  savedMovies={savedMovies}
                  addMovie={handleLikelMovie}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path='/saved-movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='savedmovies'
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
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
        </CurrentUserContext.Provider>
      }
    </div>
  );
}

export default App;
