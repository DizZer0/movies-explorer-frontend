import myPhoto from '../../../images/my-photo.png'

function AboutMe() {
  return (
    <section className="about-me" id='aboutMe'>
      <h3 className="about-me__title">Студент</h3>
      <div className='about-me__container'>
        <img className="about-me__img" src={myPhoto} alt="фотография человека" />
        <div className='about-me__inner-container'>
          <div className='about-me__profile-container'>
            <h2 className="about-me__my-name">Максим</h2>
            <p className="about-me__status">Фронтенд-разработчик, 20 лет</p>
            <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <a className='about-me__github' target="_blank" href='https://github.com/DizZer0'>Github</a>
        </div>
      </div>
      <h3 className="about-me__portfolio">Портфолио</h3>
      <ul className="about-me__links-site">
        <li className="about-me__item">
          <a className="about-me__link" target="_blank" href="https://github.com/DizZer0/how-to-learn">Статичный сайт</a>
        </li>
        <li className="about-me__item">
          <a className="about-me__link" target="_blank" href="https://github.com/DizZer0/russian-travel">Адаптивный сайт</a>
        </li>
        <li className="about-me__item">
          <a className="about-me__link" target="_blank" href="https://github.com/DizZer0/react-mesto-api-full">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default AboutMe;