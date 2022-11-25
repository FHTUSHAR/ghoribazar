import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const ItemModal = () => {
    const { user } = useContext(AuthContext)
    return (
        <div></div>
    );
};

export default ItemModal;