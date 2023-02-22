import React from "react"

function PushNotification({ value: { isActive, isSuccessful }}) {

  return (
    <section className={`push-notification ${!isActive ? 'push-notification_disabled' : ''} ${isSuccessful ? 'push-notification_successful' : ''}`}>
      <h2 className="push-notification__title">{isSuccessful ? 'Запрос прошёл успешно' : 'Произошла какая-то ошибка'}</h2>
    </section>
  )
}

export default PushNotification