import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import productContext from '../context/products/ProductContext'

const PrivateRoute = ({ auth, children }) => {

    const context = useContext(productContext)
    const { admins } = context
    if (admins.includes(localStorage.getItem('id'))) {
        auth = true
    }
    else {
        auth = false
    }

    return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
