import React, { useContext } from 'react';
import { useNavigation } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const ItemModal = ({ bookedProduct, setBookedProduct }) => {
    const { user } = useContext(AuthContext)
    const navigation = useNavigation()
    console.log(bookedProduct)
    const handleBooking = (event) => {
        event.preventDefault();
        const phone = event.target.phone.value;
        const location = event.target.location.value;
        const title = event.target.title.value;
        const price = event.target.price.value;
        const userBookedProduct = {
            name: user?.displayName,
            email: user?.email,
            title,
            price,
            phone,
            location,
            img: bookedProduct.img_url
        }
        fetch('http://localhost:5000/bookingProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userBookedProduct)
        }).then(res => res.json())
            .then(data => {
                alert('Product added')
                console.log(data)
                setBookedProduct(null)
            })
        event.target.reset()

    }
    return (
        <>
            <input type="checkbox" id="item-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative bg-black">
                    <label htmlFor="item-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking}>
                        <input type="text" name='title' defaultValue={bookedProduct.title} readOnly placeholder="Full Name" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="text" name='price' defaultValue={bookedProduct.resale_price} readOnly placeholder="Full Name" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="text" name='pname' defaultValue={user?.displayName} readOnly placeholder="Full Name" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="text" name='email' defaultValue={user?.email} readOnly placeholder="Email" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="text" name='location' placeholder="Your Location" className="input input-bordered w-full text-black font-semibold  mb-3" />
                        <input type="submit" value="SUBMIT" className="input input-bordered w-full font-bold  mb-3  text-white bg-slate-600" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ItemModal;