import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider'

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostingKey = process.env.REACT_APP_imgbb_key



    const handleAddProduct = data => {
        const image = data.img[0]
        const { category_id, title, location, resale_price, original_price, use_time, posted_time, condition } = data
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imgData) => {
                console.log(imgData)
                if (imgData.success) {
                    const product = {

                        seller_name: user.displayName,
                        seller_email: user.email,
                        category_id,
                        title,
                        location,
                        resale_price,
                        original_price,
                        use_time,
                        posted_time,
                        condition,
                        img_url: imgData.data.url

                    }
                    console.log(product)

                    fetch('http://localhost:5000/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authozization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                // toast.success('Doctor added')
                                // navigate('/dashboard/manageDoctors')
                                alert('success')
                            }
                        })
                        .catch(e => console.error(e))
                }


            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }
    return (
        <div className='lg:ml-7'>
            <h1 className='text-white text-3xl'>ADD Product</h1>
            <form className='w-2/3 ' onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid lg:grid-cols-2'>
                    <div className='mr-7'>
                        <label className="label">
                            <span className="label-text text-xl text-white">Category_id</span>
                        </label>
                        <input  {...register("category_id", { required: "category_id is required" })} type="text" aria-invalid={errors.category_id ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.category_id && <p className='text-red-600' role="alert">{errors.category_id?.message}</p>}
                    </div>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Title</span>
                        </label>
                        <input  {...register("title", { required: "title is required" })} type="text" aria-invalid={errors.title ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.title && <p className='text-red-600' role="alert">{errors.title?.message}</p>}
                    </div>
                </div>
                <div className='grid lg:grid-cols-2'>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Location</span>
                        </label>
                        <input  {...register("location", { required: "location is required" })} type="text" aria-invalid={errors.location ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.location && <p className='text-red-600' role="alert">{errors.location?.message}</p>}
                    </div>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Resale Price</span>
                        </label>
                        <input  {...register("resale_price", { required: "resale_price is required" })} type="text" aria-invalid={errors.resale_price ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.resale_price && <p className='text-red-600' role="alert">{errors.resale_price?.message}</p>}
                    </div>
                </div>
                <div className='grid lg:grid-cols-2'>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Original Price</span>
                        </label>
                        <input  {...register("original_price", { required: "original_price is required" })} type="text" aria-invalid={errors.original_price ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.original_price && <p className='text-red-600' role="alert">{errors.original_price?.message}</p>}
                    </div>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Use time</span>
                        </label>
                        <input  {...register("use_time", { required: "use_time is required" })} type="text" aria-invalid={errors.use_time ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.use_time && <p className='text-red-600' role="alert">{errors.use_time?.message}</p>}
                    </div>
                </div>
                <div className='grid lg:grid-cols-2'>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Posted time</span>
                        </label>
                        <input  {...register("posted_time", { required: "posted_time is required" })} type="text" aria-invalid={errors.posted_time ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.posted_time && <p className='text-red-600' role="alert">{errors.posted_time?.message}</p>}
                    </div>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl text-white">Condition</span>
                        </label>
                        <input  {...register("condition", { required: "condition is required" })} type="text" aria-invalid={errors.condition ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.condition && <p className='text-red-600' role="alert">{errors.condition?.message}</p>}
                    </div>
                </div>
                <div className=''>
                    <label className="label">
                        <span className="label-text text-xl text-white">Photo</span>
                    </label>
                    <input  {...register("img", { required: "Image is required" })} type="file" aria-invalid={errors.img ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full h-20 pt-5 max-w-xs" />
                    {errors.img && <p className='text-red-600' role="alert">{errors.img?.message}</p>}
                </div>
                <input type="submit" value='ADD PRODUCT' className="input text-white input-bordered lg:w-full max-w-xs lg:ml-16 mt-6 bg-slate-500" />
            </form>

        </div>
    );
};

export default AddProduct;