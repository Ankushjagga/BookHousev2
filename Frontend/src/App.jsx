import './App.css';
import Home from './Pages/Home/Home';
import { Route ,Routes,useParams , createBrowserRouter , createRoutesFromElements} from 'react-router-dom';
import Shop from './Pages/Shop/Shop';
import Contact from './Pages/contact/Contact';
import Register from './Pages/login/Register';
import Login from './Pages/login/login';
import Logout from './Pages/logout/Logout';
import Category from './Pages/category/category';
import Shopitem from './Pages/ShopItems/Shopitem';
import Explorecategories from "./Pages/category/Explorecategories"
import Explorelatest from './Pages/ExploreLatest/Explorelatest';
import Explorerandom from './Pages/ExploreRandom/Explorerandom';
import Cartpage from './Pages/Cart/Cartpage';
import Layout from './components/Layout/Layout';
import Error from './Pages/Error/Error';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Search from './Pages/search/Search';
import Dashboard from './Pages/Dashboard/Dashboard';
import CheckoutSuccess from './Pages/Checkout/CheckoutSuccess';
import CheckoutError from './Pages/Checkout/CheckoutError';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminUser from './Pages/Admin/AdminUser';
import AdminLayout from './components/Layout/AdminLayout';
import AdminProduct from './Pages/Admin/AdminProduct';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminMessages from './Pages/Admin/AdminMessages';
import AdminCategory from './Pages/Admin/AdminCategory';
import AdminReviews from './Pages/Admin/AdminReviews';
import EditProduct from './Pages/Admin/EditProduct';
import AdminAddProduct from './Pages/Admin/AdminAddProduct';
import AddCategory from './Pages/Admin/AddCategory';
import ScrollToTop from './components/scroll/Scroll';
const token = Cookies.get("token");

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Home />} />
<Route exact path="/shop" element={<Shop/>}/>
<Route exact path="/cart" element={<Cartpage/>}/>
<Route exact path="/contact" element={<Contact />  } /> 
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/category" element={<Category/>}/>
<Route exact path="/shopitm/:id" element={<Shopitem/>}/>
<Route exact path="/categories/:id" element={<Explorecategories/>}/>
<Route exact path="/exploreLatest" element={<Explorelatest/>}/>
<Route exact path="/exploreRandom" element={<Explorerandom/>}/>
<Route path="/resetPassword/:token" element={<ResetPassword />}/> 

<Route exact  path ="/*"  element={<Error/>} ></Route>
<Route exact path="/logout" element={<Logout/>}></Route>
<Route exact path="/forgetPassword" element={<ForgetPassword/>}></Route>
<Route exact path="/search" element={<Search/>}/>
<Route exact path ="/dashboard" element = {<Dashboard/>}/>
<Route exact path ="/checkoutSuccess" element = {<CheckoutSuccess/>}/>
<Route exact path ="/checkoutCancel" element = {<CheckoutError/>}/>
<Route exact path ="/adminLogin" element = {<AdminLogin/>}/>
<Route exact path ="" element = {<AdminLayout/>}>
<Route exact path ="/adminDashboard" element = {<AdminDashboard/>}/>
<Route exact path ="/adminUsers" element = {<AdminUser/>}/>
<Route exact path ="/adminProducts" element = {<AdminProduct/>}/>
<Route exact path ="/adminOrders" element = {<AdminOrders/>}/>
<Route exact path ="/adminMessages" element = {<AdminMessages/>}/>
<Route exact path ="/adminCategory" element = {<AdminCategory/>}/>
<Route exact path ="/adminReviews" element = {<AdminReviews/>}/>
<Route exact path ="/admineditProduct" element = {<EditProduct/>}/>
<Route exact path ="/adminaddProduct" element = {<AdminAddProduct/>}/>
<Route exact path ="/adminaddCategory" element = {<AddCategory/>}/>
</Route>

    </Route>
  )
 )



function App() {

  
  return (

    <>
    </>
  );
}

export default App;
