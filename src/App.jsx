import { useState, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import WeatherToastContainer from './components/WeatherToast';
import { createBrowserRouter, Outlet, ScrollRestoration, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const HourlyForcast = lazy(() => import('./components/HourlyForcast'));


const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
      <WeatherToastContainer />
    </>
  )
}

const RouteElements = ({ theme, toggleTheme }) => createBrowserRouter([
  {
    element: <RootLayout />,
    path: '/',
    children: [
      { path: "", element: <Home theme={theme} toggleTheme={toggleTheme} /> },
      { path: "hours-forecast", element: <HourlyForcast theme={theme} toggleTheme={toggleTheme} /> },
    ]
  }
]);

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

  const router = RouteElements({ theme, toggleTheme });

  return <RouterProvider router={router} />
}

