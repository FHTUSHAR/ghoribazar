import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Advertise = () => {
    const [adProducts, setAdProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/advertise").then((data) => {
            setAdProducts(data.data);
        });
    }, []);


    return (
        <div>
            {
                adProducts.length > 0 ? <>
                    <div className='mt-5 lg:ml-8 divide-y divide-red-600'>
                        <h1 className='text-3xl font-semibold text-blue-500 mb-5'>Advertise</h1>

                        <div className='grid lg:grid-cols-3 gap-12 mt-9  p-6'>

                            {
                                adProducts.map(product => <Link key={product._id}>
                                    <div className="card  border-white  bg-black text-white shadow-red-700 shadow-xl">
                                        <figure><img className='w-88' src={product.img_url} alt="Watch" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{product.title}</h2>
                                        </div>
                                    </div>

                                </Link>


                                )}
                        </div>
                    </div>
                </> : <>
                </>
            }
        </div>
    );
};

export default Advertise;