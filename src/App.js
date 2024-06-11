import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';
import NavBar from './components/Navbar';


function App() {
  return (
    <div className="app">
      <div className="content">
        <BrowserRouter >
          <NavBar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1> Logout Component</h1>} />
              <Route path="/" element={<h1>Profile Component</h1>} />
            </Route>
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

          </Routes>
      
      </BrowserRouter>
     </div>
     <Footer />
    </div>
  );
}

export default App;