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

const TRACKING_ID=process.env.MEASUREMENT//Comment this line out when you are running on localhost
ReactGA.initialize(TRACKING_ID);//Comment this line out when you are running on localhost

function App() {
  return (
    <>
      <ProductState>
        <Router>
          <Navbar />
          <ToastContainer />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/addproduct' element={<AddProduct />} />
            <Route exact path='/deleteproduct' element={<DeleteProduct />} />
            <Route exact path='/updateproduct' element={<UpdateProduct />} />
            <Route exact path="/buynow/:id" element={<BuyNow />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/yourorders" element={<YourOrders />} />
            <Route exact path="/orderfromusers" element={<OrderFromUsers />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/account" element={<Account />} />
          </Routes>
        </Router>
      </ProductState>
    </>
  );
}

export default App;

