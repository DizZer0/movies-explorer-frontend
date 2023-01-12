function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <div className="footer__link-container">
          <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/DizZer0" target="_blank" className="footer__link">Github</a>
        </div>
        <p className="footer__year">©2022</p>
      </div>
    </footer>
  );
};

export default Footer