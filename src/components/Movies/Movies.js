import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";

function Movies() {
  return (
    <>
      <Header />    
      <div className="movies">
        <SearchForm />
        <MoviesCardList />
        <button className="movies__more-btn">Ещё</button>
      </div>
      <Footer />
    </>
  );
};

export default Movies;