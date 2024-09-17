import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import UpdateProduct from './pages/UpdateProduct';
import NavBar from './components/Navbar';
import MyProducts from './pages/MyProducts'
import { CustomProvider } from './context/CustomContext';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Cancel from './pages/Cancel';
import Success from './pages/Success';


function App() {
  return (
    <div className="app">
        <CustomProvider>
          <BrowserRouter >
            <NavBar />
            <Routes>
              <Route element={<PrivateComponent />}>
                <Route path="/my_products" element={<MyProducts />} />
                <Route path="/add_my_product" element={<AddProduct />} />
                <Route path="/update/:id" element={<UpdateProduct />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/" element={<h1>Profile Component</h1>} /> */}
              </Route>
              
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/success" element={<Success />} />

            </Routes>
            <Footer />
          </BrowserRouter>
        </CustomProvider>
    </div>
  );
}

export default App;