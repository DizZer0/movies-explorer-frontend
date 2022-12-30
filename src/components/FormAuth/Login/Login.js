import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

function Login() {
  

  return (
    <div className='login'>
      <form className="form-auth">
        <img className="form-auth__img" src={logo}/>
        <h2 className="form-auth__title">Рады видеть!</h2>
        <fieldset className="form-auth__fieldset">
          <label className='form-auth__input-subtitle'>E-mail</label>
          <input className="form-auth__input"></input>
          <label className='form-auth__input-subtitle'>Пароль</label>
          <input className="form-auth__input"></input>
        </fieldset>
        <div className="form-auth__container">
          <button className="form-auth__btn">Войти</button>
          <div className='form-auth__link-container'>
            <p className="form-auth__link-subtitle">Ещё не зарегистрированы?</p>
            <Link to='/signup' className="form-auth__link">Регистрация</Link>
          </div>
        </div>
      </form>
    </div>
  );
}; 

export default Login