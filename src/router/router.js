import { Route, BrowserRouter, createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import Error from '../pages/Error'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Navbar from '../components/Navbar'

const currentUser = true

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
        return <Navigate to="/login" />
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
                path: "/",
                element: <Home/>
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

export default router;