import { createBrowserRouter } from "react-router-dom";
import DashboardLaoyout from "../../Layout/DashboardLaoyout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/appointment',
                element:<PrivateRoute><Appointment></Appointment></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLaoyout></DashboardLaoyout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            }
        ]
    }
])

export default router;