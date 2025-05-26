import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from './pages/MenuPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import WeatherPage from "./pages/WeatherPage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<MenuPage />} />
         <Route path='/news' element={<NewsPage />} />
         <Route path='/weather' element={<WeatherPage/>} />
         <Route path='movies' element={<MoviesPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
