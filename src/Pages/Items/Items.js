import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsCheck2, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthProvider';
import ItemModal from './ItemModal/ItemModal';
import useUser from '../../Hooks/useUser';
import useVerify from '../../Hooks/useVerify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Items = () => {

    const [verified, setVerified] = useState()

    console.log('verify', verified)
    const items = useLoaderData();
    const [bookedProduct, setBookedProduct] = useState(null)
    const { user } = useContext(AuthContext)
    const [isBuyer] = useUser(user?.email)
    const handleWIshList = (item) => {

        delete item.seller_email
        delete item._id
        const wish = { ...item, buyer: user?.email }
        console.log(wish)
        fetch('https://resell-goods-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wish)
        })
            .then(res => res.json())
            .then(data => {
                toast('Added to wishlist')
            })
    }
    return (
        <div className='p-6   divide-y divide-red-600 divide-red-600'>
            <ToastContainer />
            <h1 className='text-3xl font-semibold text-white ml-6 mb-5'>Items</h1>

            <div className='grid lg:grid-cols-3 gap-9 p-6'>
                {
                    items.map(item => <div key={item._id} className="card  border-white font-thin   text-white shadow-red-700 shadow-xl">
                        <figure><img className='w-88' src={item.img_url} alt="Watch" /></figure>

                        <div className="card-body">
                            <h2 className="card-title">Title : {item.title}</h2>
                            <h2 className="card-title font-thin"><small>Location : {item.location}</small></h2>
                            <h2 className="card-title font-thin"><small>ReSale Price : ${item.resale_price}</small></h2>
                            <h2 className="card-title font-thin"><small>Original Price : ${item.original_price}</small></h2>
                            <h2 className="card-title font-thin"><small>Time of used : {item.use_time}</small></h2>
                            <div className='flex'>
                                <h2 className="card-title font-thin mr-4"><small> Seller : {item.seller_name}</small></h2>
                                {

                                    item.verified === 'true' ? <>
                                        <h2><small className='text-primary'> <FaCheck className='mt-2' /></small></h2>
                                    </> :
                                        <></>
                                }

                            </div>

                            {
                                isBuyer && < div className='flex'>
                                    <label htmlFor="item-modal" onClick={() => { setBookedProduct(item) }} className="btn btn-success text-white mx-auto px-12">BOOK Now</label>
                                    <button onClick={() => { handleWIshList(item) }} className='btn btn-primary btn-sm'>WishList</button>
                                </div>}

                        </div>


                    </div>)
                }

                {
                    bookedProduct && <ItemModal key={bookedProduct._id} bookedProduct={bookedProduct} setBookedProduct={setBookedProduct}></ItemModal>
                }
            </div>


        </div>
    );
};

export default Items;