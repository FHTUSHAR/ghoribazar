import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../../Context/AuthProvider';
import useVerify from '../../../Hooks/useVerify';

const AllSeller = () => {
    const { user } = useContext(AuthContext)
    // const [isVerify] = useVerify(user?.email)
    const { data: allSeller = [], refetch } = useQuery({
        queryKey: ['sellers'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/allseller`, {
                headers: {
                    authozization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await product.json()
            return data;
        }
    })

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/buyerdelete/${id}`, {
            method: 'DELETE',
            headers: {
                authozization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
    }
    const handleVerify = (email) => {
        fetch(`http://localhost:5000/verify/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authozization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
    }
    return (
        <div>
            <Helmet>

                <title>All Seller</title>

            </Helmet>
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
                            <th>Verification</th>
                        </tr>
                    </thead>
                    {
                        allSeller.map((seller, i) => <tbody key={seller._id}>
                            <tr>
                                <th>{i += 1}</th>

                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.phone}</td>
                                <td><button onClick={() => handleDelete(seller._id)} className='btn btn-primary btn-sm'>Delete</button></td>
                                {

                                    <td><button onClick={() => handleVerify(seller.email)} className='btn btn-primary btn-sm'>Verify</button></td>}

                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default AllSeller;