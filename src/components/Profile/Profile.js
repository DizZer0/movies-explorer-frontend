
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

import Header from '../Header/Header';

import PushNotification from "../PushNotification/PushNotification";

import mainApi from '../../utils/MainApi'

import useFormWithValidation from '../../hooks/useFormValidation';

import { InfoUserContext } from '../../contexts/InfoUserContext';

function Profile(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const navigate = useNavigate()

  const [pushNotificationValue, setPushNotificationValue] = React.useState({
    isActive: false,
    isSuccessful: false
  })
  const userInfo = useContext(InfoUserContext)

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

    if(userInfo.name !== values.name || userInfo.email !== values.email) {
      mainApi.updateUser(values)
      .then(res => {
        props.setUserInfo({name: res.name, email: res.email})
        setPushNotificationValue(openPushNotification(true))
      })
      .catch(() => {
        setPushNotificationValue(openPushNotification(false))
      })
    } else {
    }
  }

  function handleClickBtnExit() {
    props.setLoggedIn(false)
    localStorage.clear()
    console.log(localStorage.getItem('jwt'))
    navigate('/')
  }

  React.useEffect(() => {
    resetForm(userInfo, {}, true)
  }, [userInfo])

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
                <button className="profile__btn" disabled={!isValid} type='submit'>Редактировать</button>
                <button className="profile__btn profile__btn_red" type='button' onClick={handleClickBtnExit}>Выйти из аккаунта</button>
            </div>
          </form>
          <PushNotification value={pushNotificationValue}/>
        </section>
      </>
    );
};

export default Profile;