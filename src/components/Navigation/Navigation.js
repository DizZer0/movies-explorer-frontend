import React from 'react';

import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Navigation(props) {
  const [navPopupOn, setNavPopupOn] = React.useState(false)

  function handleClickStatePopup() {
    setNavPopupOn(!navPopupOn)
  }

  return (
    <nav className={props.isMain ? 'nav nav_main' : 'nav'}> 
      <NavigationPopup navPopupOn={navPopupOn} handleClickStatePopup={handleClickStatePopup}/>
      <Link className="nav__logo" to="/"/>
      {props.loggedIn ? (
        <>
          <div className='nav__container'>
            <Link className='nav__link' to="/movies" >Фильмы</Link>
            <Link className='nav__link' to="/saved-movies" >Сохранённые фильмы</Link>
          </div> 
          <Link className='nav__profile-link' to="/profile" >Аккаунт</Link>
          <button className='nav__burger-btn' onClick={handleClickStatePopup}/>
        </>
        
      ) : (
        <div className='nav__main-container'> 
          <Link className='nav__link-reg' to='/signup'>Регистрация</Link>
          <Link className='nav__link-log' to='/signin'>Войти</Link>
        </div>
      )}   
    </nav>
  );
};

export default Navigation;