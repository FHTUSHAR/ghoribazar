import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const WishList = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: mywishlist = [] } = useQuery({
        queryKey: ['mylist'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/mywishList/${user?.email}`)
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
    return (
        <div>
            <h2 className='text-3xl text-red-500'>My Orders</h2>
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
                        mywishlist.map((product, i) => <tbody key={product._id}>
                            <tr>
                                <th>{i += 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.img_url} alt={product.title} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{product.title}</td>
                                <td>${product.resale_price}</td>
                                <td>{
                                    !product.paid &&
                                    <Link ><button disabled className='btn btn-primary btn-xs'>PAY</button></Link>
                                }
                                    {/* //to={`/dashboard/payment/${product._id}`} */}

                                </td>

                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default WishList;