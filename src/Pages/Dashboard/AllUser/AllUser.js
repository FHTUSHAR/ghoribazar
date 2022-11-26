import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';

const AllUser = () => {
    const { user } = useContext(AuthContext);


    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['users'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/alluser`)
            const data = await product.json()
            return data;
        }
    })
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/buyerdelete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
    }
    const handleAdmin = (id) => {
        fetch(`http://localhost:5000/makeadmin/${id}`, {
            method: 'PUT',
            'content-type': 'application/json'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
            })
    }
    return (
        <div>
            <h2 className='text-3xl text-red-500'>All User</h2>
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
                        allUsers.map((users, i) => <tbody key={users._id}>
                            <tr>
                                <th>{i += 1}</th>

                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.phone}</td>
                                <td><button onClick={() => handleDelete(users._id)} className='btn btn-primary btn-sm'>Delete</button></td>
                                {
                                    users?.type !== 'admin' ? <>
                                        <td><button onClick={() => handleAdmin(users._id)} className='btn btn-primary btn-sm'>Admin</button></td>
                                    </> :
                                        <>
                                            <td><button onClick={() => handleAdmin(users._id)} disabled className='btn btn-primary btn-sm'>Admin</button></td>
                                        </>
                                }
                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default AllUser;