import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Navigation() {
  return (
    <nav className="nav">
      <NavigationPopup />
      <img src={logo} className="nav__logo" alt="три полоски меню"/>
      <div className='nav__container'>
        <Link className='nav__link' to="/movies" >Фильмы</Link>
        <Link className='nav__link' to="/saved-movies" >Сохранённые фильмы</Link>
      </div> 
      <Link className='nav__profile-link' to="/profile" >Аккаунт</Link>
      <button className='nav__burger-btn'/>
    </nav>
  );
};

export default Navigation;