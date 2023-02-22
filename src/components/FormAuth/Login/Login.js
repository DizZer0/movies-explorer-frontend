import { Link, useNavigate} from 'react-router-dom';
import React from 'react';

import useFormWithValidation from '../../../hooks/useFormValidation';


function Login(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const [isDisabled, setIsDisabled] = React.useState(false)

  const navigate = useNavigate()

  function submitForm(e) {
    e.preventDefault()
    setIsDisabled(true)
    props.handleLogin(values)
    setIsDisabled(false)
  }

  React.useEffect(() => {
    resetForm()
  }, [resetForm])

  React.useEffect(() => {
    if(props.loggedIn) {
      navigate('/')
    }
  }, [props.loggedIn])

  return (
    <section className='login'>
      <form className="form-auth" noValidate onSubmit={submitForm}>
      <Link className="form-auth__img" to="/"/>
        <h2 className="form-auth__title">Рады видеть!</h2>
        <fieldset className="form-auth__fieldset">
          <label className='form-auth__input-subtitle'>E-mail</label>
          <input className="form-auth__input" name='email' pattern='^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$' disabled={isDisabled ? 'disabled' : ''} required type='email' onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.email}</span>
          <label className='form-auth__input-subtitle'>Пароль</label>
          <input className="form-auth__input" name='password' disabled={isDisabled ? 'disabled' : ''} required type='password'  onChange={handleChange}/>
          <span className='form-auth__error-text'>{errors.password}</span>
        </fieldset>
        <div className="form-auth__container">
          <button className={`form-auth__btn ${isValid ? "" : 'form-auth__btn_disabled'}`} disabled={!isValid || isDisabled}>Войти</button>  
          <div className='form-auth__link-container'>
            <p className="form-auth__link-subtitle">Ещё не зарегистрированы?</p>
            <Link to='/signup' className="form-auth__link">Регистрация</Link>
          </div>
        </div>
      </form>
    </section>
  );
}; 

export default Login