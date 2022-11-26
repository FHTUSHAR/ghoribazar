import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { TailSpin } from 'react-loader-spinner'
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const { user, createUser, googleSignIn, userProfile, loading } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const password = form.password.value;
        const opt = form.options.value;


        console.log(name, email, password, opt, phone)
        createUser(email, password)
            .then(result => {

                handleUpdateUserProfile(name)
                const customer = {
                    name,
                    email,
                    phone,
                    type: opt
                }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(customer)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        alert('Successfully Inserted')
                    })


                navigate('/')
                form.reset()
                setError('')
            })
            .catch(error => {
                setError(error)
                console.error(error.message)
            })
    }
    const googleBtn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const currentUser = {
                    email: user.email
                }
                fetch('https://doctors-services-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('doctorToken', data.token)
                        // navigate(from, { replace: true });
                    })
                    .catch(error => console.error(error))
                setError('')
                navigate('/')
            })
            .catch(err => {
                setError(err)
                console.error(err.message)
            })
    }
    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name,
        }
        userProfile(profile)
            .then(() => { })
            .catch((e) => { setError(error.message) })
    }
    if (!error) {
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
    }


    return (
        <div className="card lg:card-side  p-4 mx-auto w-1/2">

            <div className="card-body w-1/2 shadow-xl rounded-lg p-4 text-center shadow-red-700">
                <h2 className='text-2xl font-bold text-blue-600'>Register</h2>
                <form className='p-4' onSubmit={handleSubmit}>
                    <div><input type="text" name='name' placeholder="Type Name" className="input input-bordered input-accent w-3/4 mb-4  " required /></div>
                    <div><input type="email" name='email' placeholder="Type email" className="input input-bordered input-accent w-3/4 mb-4  " required /></div>
                    <div><input type="textl" name='phone' placeholder="Type phone" className="input input-bordered input-accent w-3/4 mb-4  " required /></div>
                    <div> <input type="password" name='password' placeholder="Type password" className="input input-bordered input-accent w-3/4 mb-4" required /></div>
                    <div><select className='text-white bg-black input input-bordered input-accent w-3/4 mb-4' name='options'>
                        <option selected>Buyer</option>
                        <option>Seller</option>
                    </select></div>
                    <div><input type="submit" placeholder="Type password" className="btn btn-primary px-9 " /></div>
                </form>

                <div><button onClick={googleBtn} className="btn btn-outline btn-success w-1/3 justify-between"> <FaGoogle className=' border-green-600 text-2xl rounded-full' />Google <span></span></button></div>
                <p>Already have an account.Please <Link to={'/login'} className='text-blue-700'>Login</Link></p>
                <p>{error}</p>
            </div>


        </div>
    );
};

export default Register;