import React, { useEffect, useState } from 'react';

const useSeller = (email) => {

    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/Seller/${email}`)
            .then(res => res.json())
            .then(data => {

                setIsSeller(data.isAdmin)
                setIsSellerLoading(false)
                // console.log(isAdmin)
            })
    }, [email])
    return [isSeller, isSellerLoading]
};

export default useSeller;