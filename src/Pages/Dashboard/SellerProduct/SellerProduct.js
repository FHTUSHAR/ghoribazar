import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { AuthContext } from '../../../Context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerProduct = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: sellerProducts = [], refetch } = useQuery({
        queryKey: ['myBookingProducts'], queryFn: async () => {
            const product = await fetch(`https://resell-goods-server.vercel.app/sellerproduct/${user?.email}`)
            const data = await product.json()
            return data;
        }
    })
    const handleDelete = (id) => {
        console.log(id, '=')
        fetch(`https://resell-goods-server.vercel.app/sellerdelete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                toast('Deleted Successfully')
                refetch()
            })
    }
    const handleAd = (ad, id) => {
        delete ad._id
        const advertise = { ...ad, adId: id }

        console.log(advertise)
        fetch(`https://resell-goods-server.vercel.app/advertise`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertise)
        })
            .then(res => res.json())
            .then(data => {
                toast('Successfully add to the advertise section')
                refetch()
            })
    }
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
            <ToastContainer />
            <h2 className='text-3xl text-red-500'>All Product</h2>
            <div className="overflow-x-auto">
                <table className="table w-full rounded-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Advertise</th>
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
                                <td><button onClick={() => { handleDelete(sproduct._id, sproduct.title) }} className='btn btn-primary btn-sm'>DELETE</button></td>
                                <td><button onClick={() => { handleAd(sproduct, sproduct._id) }} className='btn btn-primary btn-sm'>Advertise</button></td>

                            </tr>

                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default SellerProduct;