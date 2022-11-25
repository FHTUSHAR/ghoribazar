import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsCheck2, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthProvider';

const Items = () => {
    const items = useLoaderData();
    const { user } = useContext(AuthContext)
    return (
        <div className='p-6 divide-y divide-red-600'>
            <h1 className='text-3xl font-semibold text-white ml-6 mb-5'>Items</h1>

            <div className='grid lg:grid-cols-3 gap-9 p-6'>
                {
                    items.map(item => <div key={item._id} className="card  border-white font-thin  bg-black text-white shadow-red-700 shadow-xl">
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

                            <label htmlFor="item-modal" className="btn btn-success text-white mx-auto px-12">BOOK Now</label>

                        </div>
                        <>
                            <input type="checkbox" id="item-modal" className="modal-toggle" />
                            <div className="modal ">
                                <div className="modal-box relative bg-black">
                                    <label htmlFor="item-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <h3 className="text-lg font-semibol mb-4">{item.title}</h3>
                                    <p className="text-lg font-semibol mb-3"> Price : ${item.resale_price}</p>

                                    <form >
                                        <input type="text" name='pname' defaultValue={user?.displayName} readOnly placeholder="Full Name" className="input input-bordered w-full text-black font-semibold  mb-3" />
                                        <input type="text" name='email' defaultValue={user?.email} readOnly placeholder="Email" className="input input-bordered w-full text-black font-semibold  mb-3" />
                                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full text-black font-semibold  mb-3" />
                                        <input type="text" name='location' placeholder="Your Location" className="input input-bordered w-full text-black font-semibold  mb-3" />
                                        <input type="submit" value="SUBMIT" className="input input-bordered w-full font-bold  mb-3  text-white bg-slate-600" />
                                    </form>
                                </div>
                            </div>
                        </>

                    </div>)
                }
            </div>


        </div>
    );
};

export default Items;