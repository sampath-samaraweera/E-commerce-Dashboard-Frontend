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


function App() {
  return (
    <div className="app">
      <div className="content">
        <BrowserRouter >
          <NavBar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<Home />} />
              <Route path="/my_products" element={<MyProducts />} />
              <Route path="/add_my_product" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1> Logout Component</h1>} />
              {/* <Route path="/" element={<h1>Profile Component</h1>} /> */}
            </Route>
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

          </Routes>
      
      </BrowserRouter>
     </div>
     {/* <Footer /> */}
    </div>
  );
}

export default App;