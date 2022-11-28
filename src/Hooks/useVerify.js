import React, { useEffect, useState } from 'react';

const useVerify = (email) => {

    const [isVerify, setIsVerify] = useState(false)
    const [isVerifyLoading, setIsVerifyLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/verify/${email}`)
            .then(res => res.json())
            .then(data => {

                setIsVerify(data.isVerify)
                setIsVerifyLoading(false)
                // console.log(isAdmin)
            })
    }, [email])
    return [isVerify, isVerifyLoading]
};

export default useVerify;