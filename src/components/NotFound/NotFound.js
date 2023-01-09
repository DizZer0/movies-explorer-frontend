import { useNavigate } from "react-router-dom";

function NotFound() {
  const history = useNavigate()

  function goBack() {
    history(-1)
  }

  return(
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__error-text">Страница не найдена</p>
      <button className="not-found__btn" onClick={goBack}>Назад</button>
    </div>
  )
}

export default NotFound;