import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';

const useUser = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/buyer/${user?.email}`)
            .then(res => res.json())
            .then(data => {

                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
                // console.log(isAdmin)
            })
    }, [user?.email])
    return [isAdmin, isAdminLoading]
};

export default useUser;