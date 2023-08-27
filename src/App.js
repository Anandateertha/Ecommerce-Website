import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductState from './context/products/ProductState';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import UpdateProduct from './components/UpdateProduct';
import BuyNow from './components/BuyNow';
import Login from './components/Login';
import SignUp from './components/SignUp';
import YourOrders from './components/YourOrders';
import OrderFromUsers from './components/OrderFromUsers';
import Cart from './components/Cart';
import Alert from './components/Alert';
import Account from './components/Account';
import ReactGA from "react-ga4";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading'
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

const TRACKING_ID = process.env.MEASUREMENT//Comment this line out when you are running on localhost
ReactGA.initialize(TRACKING_ID);//Comment this line out when you are running on localhost

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <ProductState>
        <Router>
          <Navbar />
          <ToastContainer />
          <Alert />
          <Routes>
            {loading ? <Route path='/*' element={<Loading />} /> :
              <>
                <Route exact path='/' element={<Home />} />
                <Route
                  exact path="/addproduct"
                  element={
                    <PrivateRoute>
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact path="/deleteproduct"
                  element={
                    <PrivateRoute>
                      <DeleteProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact path="/updateproduct"
                  element={
                    <PrivateRoute>
                      <UpdateProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact path="/orderfromusers"
                  element={
                    <PrivateRoute>
                      <OrderFromUsers />
                    </PrivateRoute>
                  }
                />
                <Route exact path="/buynow/:id" element={<BuyNow />} />
                <Route exact path="/login" element={<Login setLoading={setLoading} />} />
                <Route exact path="/signup" element={<SignUp setLoading={setLoading} />} />
                <Route exact path="/yourorders" element={<YourOrders />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/account" element={<Account />} />
              </>
            }
          </Routes>
        </Router>
      </ProductState>
    </>
  );
}

export default App;

