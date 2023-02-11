import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import PushNotification from "../PushNotification/PushNotification";


import mainApi from '../../utils/MainApi'

import useFormWithValidation from '../../hooks/useFormValidation';

function Profile(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const navigate = useNavigate()

  const [isDisabled, setIsDisabled] = React.useState(false)
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
    setIsDisabled(true)

    if(props.userInfo.name !== values.name || props.userInfo.email !== values.email) {
      mainApi.updateUser(values)
      .then(res => {
        props.setUserInfo({name: res.name, email: res.email})
        setPushNotificationValue(openPushNotification(true))
      })
      .catch(() => {
        setPushNotificationValue(openPushNotification(false))
      })
    } 
    
    setIsDisabled(false)
  }

  function handleClickBtnExit() {
    props.setLoggedIn(false)
    localStorage.clear()
    console.log(localStorage.getItem('jwt'))
    navigate('/')
  }

  React.useEffect(() => {
    resetForm(props.userInfo, {}, true)
  }, [props.userInfo])

    return (
      <>
        <Header loggedIn={true}/>
        <section className="profile">
          <h2 className="profile__title">Привет, пользователь!</h2>
          <form onSubmit={submitForm}>
            <div className="profile__inner-container profile__inner-container_border">
                <p className="profile__notation">Имя</p>
                <input className="profile__user-data" disabled={isDisabled ? 'disabled' : ''} name='name' pattern='^[a-zA-Zа-яА-Я- ]+$' minLength='2' maxLength='30' value={values.name} required onChange={handleChange}/>
                
            </div>
            <span className='profile__error-text'>{errors.name}</span>
            <div className="profile__inner-container">
                <p className="profile__notation">E-mail</p>
                <input className="profile__user-data" disabled={isDisabled ? 'disabled' : ''} name='email' pattern='^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$' required value={values.email} type='email' onChange={handleChange}/>
                
            </div>
            <span className='profile__error-text'>{errors.email}</span>
            <div className="profile__btn-container">
                <button className="profile__btn" disabled={!isValid || isDisabled} type='submit'>Редактировать</button>
                <button className="profile__btn profile__btn_red" type='button' onClick={handleClickBtnExit}>Выйти из аккаунта</button>
            </div>
          </form>
          <PushNotification value={pushNotificationValue}/>
        </section>
      </>
    );
};

export default Profile;