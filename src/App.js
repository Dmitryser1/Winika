
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Login from './pages/login/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { useContext } from 'react';
import { AuthContext } from './context/authContext'
import { DarkModeContext } from './context/darkModeContext'

function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  const { darkMode } = useContext(DarkModeContext)


  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"} `}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>

        </div>
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/home" />
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/profile/cart/:cartid",
          element: <Cart />
        },
        {
          path: "*",
          element: <Error />
        }

      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
