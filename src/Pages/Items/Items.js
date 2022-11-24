import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Items = () => {
    const usedItems = useLoaderData();
    const items = usedItems.category_items;
    return (
        <div className='p-6 divide-y divide-red-600'>
            <h1 className='text-3xl font-semibold text-white ml-6 mb-5'>Items</h1>

            <div className='grid lg:grid-cols-3 gap-9 p-6'>
                {
                    items.map(item => <div key={item.id} className="card  border-white  bg-black text-white shadow-red-700 shadow-xl">
                        <figure><img className='w-88' src={item.img_url} alt="Watch" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Items;