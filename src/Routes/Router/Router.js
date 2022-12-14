import Main from "../../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Items from "../../Pages/Items/Items";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashBoard from "../../layout/DashBoard";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";
import SellerProduct from "../../Pages/Dashboard/SellerProduct/SellerProduct";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSeller";
import AllUser from "../../Pages/Dashboard/AllUser/AllUser";
import Payment from "../../Pages/Payment/Payment";
import Blogs from "../../Pages/Blogs/Blogs";
import WishList from "../../Pages/Dashboard/WishList/WishList";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/items/:id',
                element: <PrivateRoute> <Items></Items></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }


        ]
    }, {


        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/myproduct',
                element: <MyProduct></MyProduct>
            },
            {
                path: '/dashboard/seller',
                element: <SellerRoute><SellerProduct></SellerProduct></SellerRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/allseller',
                element: <AdminRoute> <AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/alluser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: '/dashboard/mywishproduct',
                element: <WishList></WishList>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/orders/${params.id}`)
                }
            },
        ]
    },

    {
        path: '/*',
        element: <div className="text-center h-4/5">
            <h2 className="text-3xl py-10"> Path Not Found</h2>
            <h1 className="text-5xl font-bold text-red-500 py-4">404</h1>
            <img className="mx-auto py-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8duc9bB3Y20nkpGzwXEq_V5ZgWKHRU5WFBQ&usqp=CAU" alt="" />
        </div>
    }
]);