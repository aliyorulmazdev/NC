import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetails from "../../features/products/details/ProductDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import CategoryDetails from "../../features/categories/details/CategoryDetails";
import CategoryForm from "../../features/categories/form/CategoryForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'products', element: <ProductDashboard />},
            {path: 'products/:id', element: <ProductDetails />},
            {path: 'createProduct', element: <ProductForm key='create' />},
            {path: 'manageProduct/:id', element: <ProductForm key='manage' />},

            {path: 'categories', element: <CategoryDashboard />},
            {path: 'categories/:id', element: <CategoryDetails />},
            {path: 'createCategory', element: <CategoryForm key='create' />},
            {path: 'manageCategory/:id', element: <CategoryForm key='manage' />},

            {path: 'login', element: <LoginForm key='login' />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]


export const router = createBrowserRouter(routes);