import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../FormAuth/Login/Login';
import Register from '../FormAuth/Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../../hooks/ProtectedRoute';
import { Routes, Route } from 'react-router-dom'
//import moviesApi from '../../utils/MoviesApi';

import React from 'react';
import mainApi from '../../utils/MainApi';

function App() {
  const [userInfo, setUserInfo] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(true)

  React.useEffect(() => {
    console.log(loggedIn)
    mainApi.getUser()
      .then(res => {
        setUserInfo({name: res.name, email: res.email})
        setLoggedIn(true)
      })
      .catch(res => setLoggedIn(false))
  }, [])

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />} />
          <Route path='/profile' element={<ProtectedRoute component={Profile} userInfo={userInfo} setUserInfo={setUserInfo} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path='/signin' element={<Login setLoggedIn={setLoggedIn}  />} />
          <Route path='/signup' element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
