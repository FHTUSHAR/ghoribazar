import React, { useEffect, useState } from 'react';

const useVerify = (email) => {

    const [isVerify, setIsVerify] = useState(false)
    const [isVerifyLoading, setIsVerifyLoading] = useState(true)
    useEffect(() => {
        fetch(`https://resell-goods-server.vercel.app/verify/${email}`)
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