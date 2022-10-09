import Header from '../Header/Header';


function Profile() {
    //вместо пользователя подставлять зарегестрированное имя
    return (
      <>
        <Header />
        <div className="profile">
          <h2 className="profile__title">Привет, пользователь!</h2>
          <div className="profile__inner-container profile__inner-container_border">
              <p className="profile__notation">Имя</p>
              <p className="profile__user-data">Максим</p>
          </div>
          <div className="profile__inner-container">
              <p className="profile__notation">E-mail</p>
              <p className="profile__user-data">Pochta@mail.ru</p>
          </div>
          <div className="profile__btn-container">
              <button className="profile__btn">Редактировать</button>
              <button className="profile__btn profile__btn_red">Выйти из аккаунта</button>
          </div>
        </div>
      </>
    );
};

export default Profile;