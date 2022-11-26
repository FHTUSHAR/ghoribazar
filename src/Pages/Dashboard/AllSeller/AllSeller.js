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
        <div>
            <h2 className='text-3xl text-red-500'>All Seller</h2>
            <div className="overflow-x-auto">
                <table className="table w-full rounded-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allSeller.map((seller, i) => <tbody key={seller._id}>
                            <tr>
                                <th>{i += 1}</th>

                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.phone}</td>
                                <td><button className='btn btn-primary btn-sm'>Delete</button></td>
                                <td><button className='btn btn-primary btn-sm'>Admin</button></td>
                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default AllSeller;