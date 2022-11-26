import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useUser from '../Hooks/useUser';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashBoard = () => {
    const { user } = useContext(AuthContext)
    const [isBuyer] = useUser(user?.email)


    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side border-red-600">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  border-2 border-red-600 text-white text-base-content">

                        {isBuyer &&
                            <li ><Link to={'/dashboard'} className='text-white'>My Product</Link></li>
                        }
                        {
                            !isBuyer && <>
                                <li ><Link to={'/dashboard/seller'} className='text-white'>My Product</Link></li>
                                <li ><Link to={'/dashboard/addproduct'} className='text-white'>Add Product</Link></li>
                            </>
                        }



                        {/* {
                        isAdmin && <>
                            <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
                            <li><Link to={'/dashboard/adddoctor'}>Add Doctor</Link></li>
                            <li><Link to={'/dashboard/manageDoctors'}>All Doctor</Link></li>
                        </>
                    } */}

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;