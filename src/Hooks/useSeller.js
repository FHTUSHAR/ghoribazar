import React, { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    console.log(email)
    useEffect(() => {
        fetch(`https://resell-goods-server.vercel.app/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(isSeller)
                setIsSeller(data.isSeller)
                setIsSellerLoading(false)

            })
    }, [email])
    return [isSeller, isSellerLoading]
};

export default useSeller;