import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile'
import Login from '../FormAuth/Login/Login';
import Register from '../FormAuth/Register/Register';
import NotFound from '../NotFound/NotFound';
import { Routes, Route } from 'react-router-dom'
//import moviesApi from '../../utils/MoviesApi';

import React from 'react';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<Movies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
