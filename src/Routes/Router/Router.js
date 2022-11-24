import Main from "../../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";

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


        ]
    },
    {
        path: '/*',
        element: <div className="text-center">
            <h2 className="text-3xl"> Path Not Found</h2>
            <h1 className="text-5xl font-bold text-red-500">404</h1>
        </div>
    }
]);