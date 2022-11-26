import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyer = () => {

    const { data: allBuyers = [] } = useQuery({
        queryKey: ['buyers'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/allbuyer`)
            const data = await product.json()
            return data;
        }
    })
    return (
        <div>
            <h2 className='text-3xl text-red-500'>My Product</h2>
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
                        allBuyers.map((buyer, i) => <tbody key={buyer._id}>
                            <tr>
                                <th>{i += 1}</th>

                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.phone}</td>
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

export default AllBuyer;