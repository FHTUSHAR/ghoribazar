import React from 'react';
import { useQuery, } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
const Category = () => {
    const { data: products = [] } = useQuery({
        queryKey: ['products'], queryFn: async () => {
            const product = await fetch('http://localhost:5000/products')
            const data = await product.json()
            return data;
        }
    })
    console.log(products)
    return (
        <div className='mt-5 lg:ml-8 divide-y divide-red-600'>
            <h1 className='text-3xl font-semibold text-white mb-5'>Category</h1>

            <div className='grid lg:grid-cols-3 gap-12 mt-9  p-6'>

                {
                    products.map(product => <Link to={`/items/${product._id}`} key={product._id}>
                        <div className="card  border-white  bg-black text-white shadow-red-700 shadow-xl">
                            <figure><img className='w-88' src={product.image} alt="Watch" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.category_title}</h2>
                            </div>
                        </div>

                    </Link>


                    )}
            </div>
        </div>
    );
};

export default Category;