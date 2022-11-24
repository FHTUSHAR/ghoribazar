import Main from "../../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Items from "../../Pages/Items/Items";

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
                element: <Items></Items>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
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