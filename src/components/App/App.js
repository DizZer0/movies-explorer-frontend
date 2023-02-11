import { Routes, Route, useNavigate } from 'react-router-dom'
import React from 'react';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../FormAuth/Login/Login';
import Register from '../FormAuth/Register/Register';
import NotFound from '../NotFound/NotFound';
import PushNotification from "../PushNotification/PushNotification";

import ProtectedRoute from '../../hooks/ProtectedRoute';

import mainApi from '../../utils/MainApi';

import { InfoUserContext } from '../../contexts/InfoUserContext';

function App() {
  const [userInfo, setUserInfo] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(true)
  const [pushNotificationValue, setPushNotificationValue] = React.useState({
    isActive: false,
    isSuccessful: false
  })

  const navigate = useNavigate()

  function openPushNotification(isSuccessful) {
    closedPushNotification(isSuccessful)
    return {
      isActive: true,
      isSuccessful: isSuccessful
    }
  }

  function closedPushNotification(isSuccessful) {
    setTimeout(() => {
      setPushNotificationValue({
        isActive: false,
        isSuccessful: isSuccessful
      })
    }, 3000);
  }

  function handleLogin(values) {
    mainApi.signIn(values)
      .then(res => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        getUserInfo()
        setPushNotificationValue(openPushNotification(true))
      })
      .catch(() => {
        setPushNotificationValue(openPushNotification(false))
      })
  }

  function handleRegister(values) {
    mainApi.signUp(values)
      .then(res => {
        setPushNotificationValue(openPushNotification(true))
        handleLogin(values)
      })
      .catch(() => {
        setPushNotificationValue(openPushNotification(false))
      })
  }

  function getUserInfo() {
    mainApi.getUser()
    .then(res => {
      setUserInfo({name: res.name, email: res.email})
      setLoggedIn(true)
    })
    .catch(res => setLoggedIn(false))
  }

  React.useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <InfoUserContext.Provider value={userInfo}>
      <div className="App">
        <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} />} />
            <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
            <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />} />
            <Route path='/profile' element={<ProtectedRoute component={Profile} setUserInfo={setUserInfo} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
            <Route path='/signin' element={<Login handleLogin={handleLogin}  loggedIn={loggedIn}/>}/>
            <Route path='/signup' element={<Register handleRegister={handleRegister} loggedIn={loggedIn}/>}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
        <PushNotification value={pushNotificationValue}/>
      </div>
    </InfoUserContext.Provider>
  );
}

export default App;
