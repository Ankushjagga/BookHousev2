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
const token = Cookies.get("token");

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Home />} />
<Route exact path="/shop" element={<Shop/>}/>
<Route exact path="/cart" element={<Cartpage/>}/>
<Route exact path="/contact" element={
        token ? <Contact /> : (
          <>
            <Navigate to="/login" replace state={{ from: '/contact' }} />
          </>
        )
      } /> 
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/category" element={<Category/>}/>
<Route exact path="/shopitm/:id" element={<Shopitem/>}/>
<Route exact path="/categories/:id" element={<Explorecategories/>}/>
<Route exact path="/exploreLatest" element={<Explorelatest/>}/>
<Route exact path="/exploreRandom" element={<Explorerandom/>}/>
<Route exact  path ="/*"  element={<Error/>} ></Route>
<Route exact path="/logout" element={<Logout/>}></Route>

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
