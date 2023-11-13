import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error'
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';

function Main({
  name,
  onRegister,
  onLogin,
  logOut,
  editUserData,
  setError,
  savedMovies,
  onDelete,
  addMovie,
  likeMovie,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit
}) {

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login name={name} onLogin={onLogin} setError={setError} />,
        signup: <Register name={name} onRegister={onRegister} setError={setError} />,
        error: <Error />,
        profile: <Profile
          name={name}
          logOut={logOut}
          editUserData={editUserData}
          setError={setError}
          isSuccess={isSuccess}
          setSuccess={setSuccess}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />,
        movies:
          <>
            <Movies savedMovies={savedMovies} addMovie={addMovie} likeMovie={likeMovie} setError={setError} />
          </>,
        savedmovies:
          <>
            <SavedMovies savedMovie={savedMovies} onDelete={onDelete} setError={setError} />
          </>
      }[name]}
    </main>
  )
}
export default Main
