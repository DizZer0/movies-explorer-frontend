import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

function Register() {
  return (
    <div className='register'>
      <form className="form-auth">
        <img className="form-auth__img" src={logo}/>
        <h2 className="form-auth__title">Рады видеть!</h2>
        <fieldset className="form-auth__fieldset">
          <p className='form-auth__input-subtitle'>имя</p>
          <input className="form-auth__input"></input>
          <p className='form-auth__input-subtitle'>E-mail</p>
          <input className="form-auth__input"></input>
          <p className='form-auth__input-subtitle'>Пароль</p>
          <input className="form-auth__input"></input>
        </fieldset>
        <div className="form-auth__container">
          <button className="form-auth__btn">Войти</button>
          <div className='form-auth__link-container'>
            <p className="form-auth__link-subtitle">Уже зарегистрированы?</p>
            <Link to='/signin' className="form-auth__link">Войти</Link>
          </div>
        </div>
      </form>
    </div>
  );
}; 

export default Register