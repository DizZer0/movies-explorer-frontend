import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
