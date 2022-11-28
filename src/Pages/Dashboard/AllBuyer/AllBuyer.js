import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';

const AllBuyer = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)

    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ['buyers'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/allbuyer`, {
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

    return (
        <div>
            <Helmet>

                <title>All Buyer</title>

            </Helmet>
            <h2 className='text-3xl text-red-500'>All Buyer</h2>
            <div className="overflow-x-auto">
                <table className="table w-full rounded-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    {
                        allBuyers?.map((buyer, i) => <tbody key={buyer._id}>
                            <tr>
                                <th>{i += 1}</th>

                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.phone}</td>
                                <td><button onClick={() => handleDelete(buyer._id)} className='btn btn-primary btn-sm'>Delete</button></td>

                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default AllBuyer;