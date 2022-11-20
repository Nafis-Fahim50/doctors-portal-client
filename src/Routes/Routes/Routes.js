import { createBrowserRouter } from "react-router-dom";
import DashboardLaoyout from "../../Layout/DashboardLaoyout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctors from "../../Pages/Dashboard/AddDoctors/AddDoctors";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<DisplayError></DisplayError>,
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
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'/dashboard/add-doctors',
                element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
            },
            {
                path:'/dashboard/manage-doctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`http://localhost:5000/bookings/${params.id}`)
            }

        ]
    }
])

export default router;