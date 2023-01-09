import { Link } from 'react-router-dom';

function NavigationPopup(props) {

  return (
    <div className={`nav-popup ${props.navPopupOn ? '' : 'nav-popup_disabled'}`}>
      <button className='nav-popup__exit-btn' onClick={props.handleClickStatePopup}/>
        <div className='nav-popup__container'>
          <Link className='nav-popup__link' to="/movies" >Фильмы</Link>
          <Link className='nav-popup__link' to="/saved-movies" >Сохранённые фильмы</Link>
          <Link className='nav-popup__link' to="/" >Главная</Link>
        </div> 
        <Link className='nav-popup__profile-link' to="/profile" >Аккаунт</Link>
    </div>
  );
};

export default NavigationPopup;