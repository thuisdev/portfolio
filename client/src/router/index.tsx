import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Projects from "../pages/Projects"
import Blogs from "../pages/Blogs"
import Contact from "../pages/Contact"
import SingleBlog from "../pages/SingleBlog"
import AdminDashboard from "../pages/AdminDashboard"
import NotFound from "../pages/NotFound"
import Layout from "../components/Layout"
import Skills from "../pages/Skills"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Profile from "../pages/Profile"
import { ProtectedRouter } from "../pages/ProtectedRoutes"
import PrivateRouter from "../pages/PrivateRouter"


const router = createBrowserRouter([

    {
        element: <Layout />,
        children:
            [{ path: '/', element: <Home /> },
            { path: '/blogs', element: <Blogs /> },
            { path: '/projects', element: <Projects /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> },
            { path: '/blogs/:id', element: <SingleBlog /> },
            {
                path: '/admin-dash', element:
                    <PrivateRouter>
                        <AdminDashboard />
                    </PrivateRouter>
            },
            { path: '/skills', element: <Skills /> },
            { path: '/login', element: <Login /> },
            { path: '/create-account', element: <SignUp /> },
            {
                path: '/profile', element:
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>
            },
            { path: '*', element: <NotFound /> }]
    }
])

export default router