import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import React from 'react';

function Register() {
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleNameChange = (e) => {
    const input = e.target;

    const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(input.value);

    if (validName) {
      setNameError('')
      setIsValidName(true)
    } else {
      setNameError('Имя может содержать только буквы, пробел или дефис')
      setIsValidName(false)
    }
  }

  const handleEmailChange = (e) => {
    const input = e.target;

    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(input.value);

    if (validEmail) {
      setEmailError('')
      setIsValidEmail(true)
    } else {
      setEmailError('неверно введена почта')
      setIsValidEmail(false)
    }
  }

  return (
    <div className='register'>
      <form className="form-auth" noValidate>
        <img className="form-auth__img" src={logo}/>
        <h2 className="form-auth__title">Добро пожаловать!</h2>
        <fieldset className="form-auth__fieldset">
          <label className='form-auth__input-subtitle'>имя</label>
          <input className="form-auth__input" required onChange={handleNameChange}/>
          <span className='form-auth__error-text'>{nameError}</span>
          <label className='form-auth__input-subtitle'>E-mail</label>
          <input className="form-auth__input" required type='email' onChange={handleEmailChange}/>
          <span className='form-auth__error-text'>{emailError}</span>
          <label className='form-auth__input-subtitle'>Пароль</label>
          <input className="form-auth__input" required type='password' />
          <span className='form-auth__error-text'>{passwordError}</span>
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