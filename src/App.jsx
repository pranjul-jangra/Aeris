import { useState, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import WeatherToastContainer from './components/WeatherToast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./Home'));
const HourlyForcast = lazy(() => import('./components/HourlyForcast'));


export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('Aeris-theme') || 'light');

  function toggleTheme() {
    if (theme === 'light') {
      localStorage.setItem('Aeris-theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('Aeris-theme', 'light');
      setTheme('light');
    }
  }


  return (
    <>
      <Router scrollRestoration="auto">
        <Routes>
          <Route path='/' element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path='/hours-forecast' element={<HourlyForcast theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>


      <WeatherToastContainer />
    </>
  )
}
