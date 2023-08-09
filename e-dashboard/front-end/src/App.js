import  Nav  from "./components/Nav";
import './App.css';
import Footer from './components/Footer';
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav/>
      
      <Routes>
      // Whatever you want to be in private component than just wrap all this component in PrivateComponentin
      <Route element={<PrivateComponent/>} >
      <Route path="/" element={<h1>Product Listing</h1>}/>
      <Route path="/add" element={<h1> Add Product Component</h1>}/>
      <Route path="/update" element={<h1> Update Product Component</h1>}/>
      <Route path="/logout" element={<h1> Logout Product Component</h1>}/>
      <Route path="/profile" element={<h1> Profile Component</h1>}/>
      </Route>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
