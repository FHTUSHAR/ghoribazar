import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner'
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { loginUser, googleSignIn, loading } = useContext(AuthContext)
    const [temail, setTEmail] = useState('')
    console.log(temail)
    const [token] = useToken(temail)
    const [error, setError] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setTEmail(email)

        loginUser(email, password)
            .then(result => {
                const user = result.user;

                console.log(email)

                form.reset()

                setError('')
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message)
                console.error(error)
            })
    }
    const googleBtn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const currentUser = {
                    email: user.email
                }
                // fetch('https://doctors-services-server.vercel.app/jwt', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(currentUser)
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(data)
                //         localStorage.setItem('doctorToken', data.token)
                //         // navigate(from, { replace: true });
                //     })
                //     .catch(error => console.error(error))
                navigate(from, { replace: true });
                setError('')
            })
            .catch(err => {
                setError(err.message)
                console.error(err)
            })
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

        <div className="card lg:card-side  p-4 w-1/2 flex justify-center mx-auto">
            <div className="card-body w-1/3  shadow-xl shadow-red-700 rounded-lg p-4 text-center">
                <h2 className='text-2xl font-bold text-blue-600'>Login</h2>
                <form className='p-4' onSubmit={handleSubmit}>
                    <div><input type="email" name='email' placeholder="Type email" className="input input-bordered input-accent w-3/4 mb-4  " required /></div>
                    <div> <input type="password" name='password' placeholder="Type password" className="input input-bordered input-accent w-3/4 mb-4 " required /></div>
                    <div><input type="submit" placeholder="Type password" className="btn btn-primary px-9 " /></div>
                </form>
                <div><button onClick={googleBtn} className="btn btn-outline btn-success w-1/3 justify-between"> <FaGoogle className=' border-green-600 text-2xl rounded-full' />Google <span></span></button></div>
                <p>Don't have an account.Please <Link to={'/register'} className='text-blue-700'>Register</Link></p>
                <p>{error}</p>
            </div>

        </div>


    );
};

export default Login;