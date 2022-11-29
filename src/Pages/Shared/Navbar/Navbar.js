import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import img from '../../../images/favicon.jpg'
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    let location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const logOutBtn = () => {
        logOut()
            .then()
            .catch(err => {
                console.error(err)
            })
    }
    const navItems = <React.Fragment>
        <li><Link className='text-white' to={'/home'}>Home</Link></li>

        <li>
            <Link className='text-white' to={'/blogs'}>Blog</Link>
        </li>
        <li>
            {
                user?.uid ?
                    <>

                        <Link to={'/dashboard'} className='text-white'>Dashboard</Link>
                        <li><button onClick={logOutBtn} className='text-white'>Log Out</button></li>

                    </>
                    :
                    <>
                        <li><Link className='text-white' to={'/login'}>Login</Link></li>
                    </>
            }
        </li>


    </React.Fragment>
    return (
        <div className="navbar bg-base-100 h-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-3xl">Ghorir Bazar</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        navItems
                    }
                </ul>

            </div>
            <label htmlFor='dashboard-drawer' tabIndex={2} className="btn btn-ghost  lg:hidden ml-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;