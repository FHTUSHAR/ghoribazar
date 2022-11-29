import React, { useContext, useEffect, useState } from 'react';


const useUser = (email) => {

    const [isBuyer, setIsBuyer] = useState(false)
    const [isBuyerLoading, setIsBuyerLoading] = useState(true)
    useEffect(() => {
        fetch(`https://resell-goods-server.vercel.app/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {

                setIsBuyer(data.isBuyer)
                setIsBuyerLoading(false)
                // console.log(isAdmin)
            })
    }, [email])
    return [isBuyer, isBuyerLoading]
};

export default useUser;