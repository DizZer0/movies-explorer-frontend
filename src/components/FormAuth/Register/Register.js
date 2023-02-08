import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import React from 'react';
import mainApi from '../../../utils/MainApi'

import useFormWithValidation from '../../../hooks/useFormValidation';

function Register(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const navigate = useNavigate()
  console.log(isValid)

  function submitForm(e) {
    e.preventDefault()
    console.log(values)
    mainApi.signUp(values)
      .then(res => {
        mainApi.signIn(values)
          .then(res => {
            localStorage.setItem('jwt', res.token)
            props.setLoggedIn(true)
            navigate('/')
          })
      })
  }

  React.useEffect(() => {
    resetForm()
  }, [resetForm])
  
  return (
    <section className='register'>
      <form className="form-auth" noValidate onSubmit={submitForm}>
        <Link className="form-auth__img" to="/"/>
        <h2 className="form-auth__title">Добро пожаловать!</h2>
        <fieldset className="form-auth__fieldset">
          <label className='form-auth__input-subtitle'>имя</label>
          <input className="form-auth__input" name='name' pattern='^[a-zA-Zа-яА-Я- ]+$' minLength='2' maxLength='30' required onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.name}</span>
          <label className='form-auth__input-subtitle'>E-mail</label>
          <input className="form-auth__input" name='email' pattern='^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$' required type='email' onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.email}</span>
          <label className='form-auth__input-subtitle'>Пароль</label>
          <input className="form-auth__input" name='password' required type='password'  onChange={handleChange}/>
          <span className='form-auth__error-text' >{errors.password}</span>
        </fieldset>
        <div className="form-auth__container">
          <button className={`form-auth__btn ${isValid ? "" : 'form-auth__btn_disabled'}`} disabled={!isValid}>Зарегистрироваться</button>
          <div className='form-auth__link-container'>
            <p className="form-auth__link-subtitle">Уже зарегистрированы?</p>
            <Link to='/signin' className="form-auth__link">Войти</Link>
          </div>
        </div>
      </form>
    </section>
  );
}; 

export default Register