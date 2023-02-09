import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

import PushNotification from "../../PushNotification/PushNotification";

import mainApi from '../../../utils/MainApi'

import useFormWithValidation from '../../../hooks/useFormValidation';


function Login(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const navigate = useNavigate()

  const [pushNotificationValue, setPushNotificationValue] = React.useState({
    isActive: false,
    isSuccessful: false
  })

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

  function submitForm(e) {
    e.preventDefault()
    console.log(values)
    mainApi.signIn(values)
      .then(res => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        props.setLoggedIn(true)
        navigate('/movies')
        setPushNotificationValue(openPushNotification(true))
      })
      .catch(() => {
        setPushNotificationValue(openPushNotification(false))
      })
  }

  React.useEffect(() => {
    resetForm()
  }, [resetForm])

  return (
    <section className='login'>
      <form className="form-auth" noValidate onSubmit={submitForm}>
      <Link className="form-auth__img" to="/"/>
        <h2 className="form-auth__title">Рады видеть!</h2>
        <fieldset className="form-auth__fieldset">
          <label className='form-auth__input-subtitle'>E-mail</label>
          <input className="form-auth__input" name='email' pattern='^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$' required type='email' onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.email}</span>
          <label className='form-auth__input-subtitle'>Пароль</label>
          <input className="form-auth__input" name='password' required type='password'  onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.password}</span>
        </fieldset>
        <div className="form-auth__container">
          <button className={`form-auth__btn ${isValid ? "" : 'form-auth__btn_disabled'}`} disabled={!isValid}>Войти</button>  
          <div className='form-auth__link-container'>
            <p className="form-auth__link-subtitle">Ещё не зарегистрированы?</p>
            <Link to='/signup' className="form-auth__link">Регистрация</Link>
          </div>
        </div>
      </form>
      <PushNotification value={pushNotificationValue}/>
    </section>
  );
}; 

export default Login