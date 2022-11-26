import React, { useContext, useEffect, useState } from 'react';


const useUser = (email) => {

    const [isBuyer, setIsBuyer] = useState(false)
    const [isBuyerLoading, setIsBuyerLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {

                setIsBuyer(data.isAdmin)
                setIsBuyerLoading(false)
                // console.log(isAdmin)
            })
    }, [email])
    return [isBuyer, isBuyerLoading]
};

export default useUser;