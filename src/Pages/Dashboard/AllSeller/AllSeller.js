import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSeller = () => {
    const { data: allSeller = [] } = useQuery({
        queryKey: ['sellers'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/allseller`)
            const data = await product.json()
            return data;
        }
    })
    return (
       
    );
};

export default AllSeller;