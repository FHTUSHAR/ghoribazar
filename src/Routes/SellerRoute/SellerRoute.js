import React, { Children, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useSeller from '../../Hooks/useSeller';

const SellerRoute = ({ children }) => {
    let location = useLocation()
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    console.log(isSeller)

    if (loading || isSellerLoading) {
        return <p className='flex justify-center'>Loading...</p>
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;