import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { AuthContext } from '../../../Context/AuthProvider';

const SellerProduct = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: sellerProducts = [] } = useQuery({
        queryKey: ['myBookingProducts'], queryFn: async () => {
            const product = await fetch(`http://localhost:5000/sellerproduct/${user?.email}`)
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
            <h2 className='text-3xl text-red-500'>All Product</h2>
            <div className="overflow-x-auto">
                <table className="table w-full rounded-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    {
                        sellerProducts.map((sproduct, i) => <tbody key={sproduct._id}>
                            <tr>
                                <th>{i += 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={sproduct.img_url} alt={sproduct.title} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{sproduct.title}</td>
                                <td>${sproduct.resale_price}</td>
                                <td>${sproduct.location}</td>

                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default SellerProduct;