import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useUser from '../Hooks/useUser';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashBoard = () => {
    const { user, loading } = useContext(AuthContext)
    const [isBuyer] = useUser(user?.email)
    const [isAdmin] = useAdmin(user?.email)


    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content ">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay">abc</label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        {
                            isAdmin ? <>
                                <li ><Link to={'/dashboard/alluser'} className='text-white'>All User</Link></li>
                                <li ><Link to={'/dashboard/allbuyer'} className='text-white'>All Buyer</Link></li>
                                <li ><Link to={'/dashboard/allseller'} className='text-white'>All Seller</Link></li>

                            </>
                                :
                                isBuyer ? <>
                                    <li ><Link to={'/dashboard/myproduct'} className='text-white'>My Orders</Link></li>
                                    <li ><Link to={'/dashboard/mywishproduct'} className='text-white'>My WishList</Link></li>
                                </> :
                                    <>
                                        <li ><Link to={'/dashboard/seller'} className='text-white'>My Product</Link></li>
                                        <li ><Link to={'/dashboard/addproduct'} className='text-white'>Add Product</Link></li>
                                    </>
                        }





                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;