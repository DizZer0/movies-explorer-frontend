function AboutProject() {
  return (
    <div className="about-project" id='aboutProject'>
      <h2 className="about-project__title about-project__title_border">О проекте</h2>
      <div className="about-project__container">
        <h2 className="about-project__title about-project__title_one">Дипломный проект включал 5 этапов</h2>
        <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h2 className="about-project__title about-project__title_two">На выполнение диплома ушло 5 недель</h2>
        <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__plan">
        <div className="about-project__weeks">1 неделя</div>
        <div className="about-project__weeks about-project__weeks_gray">4 неделя</div>
        <p className="about-project__technology">Back-end</p>
        <p className="about-project__technology">Front-end</p>
      </div>
    </div>
  );
};

export default AboutProject;