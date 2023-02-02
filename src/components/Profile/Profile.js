import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import mainApi from '../../utils/MainApi'

import useFormWithValidation from '../../hooks/useFormValidation';

function Profile(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const navigate = useNavigate()

  function submitForm(e) {
    e.preventDefault()
    mainApi.updateUser(values)
      .then(res => props.setUserInfo({name: res.name, email: res.email}))
  }

  function handleClickBtnExit() {
    props.setLoggedIn(false)
    localStorage.clear()
    console.log(localStorage.getItem('jwt'))
    navigate('/')
  }

  React.useEffect(() => {
    console.log(props.userInfo)
    resetForm(props.userInfo, {}, true)
  }, [])

    return (
      <>
        <Header loggedIn={true}/>
        <section className="profile">
          <h2 className="profile__title">Привет, пользователь!</h2>
          <form onSubmit={submitForm}>
            <div className="profile__inner-container profile__inner-container_border">
                <p className="profile__notation">Имя</p>
                <input className="profile__user-data" name='name' pattern='^[a-zA-Zа-яА-Я- ]+$' minLength='2' maxLength='30' value={values.name} required onChange={handleChange}/>
                
            </div>
            <span className='profile__error-text'>{errors.name}</span>
            <div className="profile__inner-container">
                <p className="profile__notation">E-mail</p>
                <input className="profile__user-data" name='email' pattern='^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$' required value={values.email} type='email' onChange={handleChange}/>
                
            </div>
            <span className='profile__error-text'>{errors.email}</span>
            <div className="profile__btn-container">
                <button className="profile__btn" type='submit'>Редактировать</button>
                <button className="profile__btn profile__btn_red" type='button' onClick={handleClickBtnExit}>Выйти из аккаунта</button>
            </div>
          </form>
        </section>
      </>
    );
};

export default Profile;