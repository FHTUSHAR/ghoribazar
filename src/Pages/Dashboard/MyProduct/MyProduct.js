import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { AuthContext } from '../../../Context/AuthProvider';

const MyProduct = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: myBookingProducts = [] } = useQuery({
        queryKey: ['myBookingProducts'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/mybookingproduct/${user?.email}`)
            const data = await product.json()
            return data;
        }
    })
    if (loading) {
        return <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    }
    console.log(myBookingProducts)
    return (
        <div>
            <h2 className='text-3xl text-red-500'>My Product</h2>
            <div className="overflow-x-auto">
                <table className="table w-full rounded-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    {
                        myBookingProducts.map((product, i) => <tbody key={product._id}>
                            <tr>
                                <th>{i += 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.img} alt={product.title} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td><button className='btn btn-primary btn-xs'>PAY</button></td>
                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default MyProduct;