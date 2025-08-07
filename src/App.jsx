import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import BtmHeader from "./Components/Header/BtmHeader";
import ToHeader from "./Components/Header/ToHeader";
import Home from "./page/Home/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import style from './Components/Header/header.module.css';
import Register from './page/Home/Register';
import Login from "./page/Home/Login";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Profile from "./page/Home/Profile";
import Cart from "./page/caer/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SearchResults from "./page/SearchResults";
function App() {
  const [userDate, setUserDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserDate();
    }
  }, []);

  // function saveUserDate() {
  //   const encodedToken = localStorage.getItem('userToken');
  //   const decodedToken = jwtDecode(encodedToken);
  //   setUserDate(decodedToken);
  // }
  function saveUserDate() {
  const encodedToken = localStorage.getItem('userToken');

  if (encodedToken && encodedToken.split(".").length === 3) {
    try {
      const decodedToken = jwtDecode(encodedToken);
      setUserDate(decodedToken);
    } catch (error) {
      console.error("خطأ في فك التوكن:", error);
      localStorage.removeItem('userToken');
      navigate('/login');
    }
  } else {
    console.warn("توكن غير صالح أو ناقص");
    localStorage.removeItem('userToken');
    navigate('/login');
  }
}


  function logOut() {
    localStorage.removeItem('userToken');
    setUserDate(null);
    navigate('/login');
  }

  const showNavbar = userDate !== null;

  return (
    <>
      {showNavbar && (
        <header className={style.header}>
          <ToHeader userDate={userDate} />
          <BtmHeader userDate={userDate} logOut={logOut} />
        </header>
      )}

      <Toaster position="bottem-right" toastOptions={{
        style:{
          background:'#e9e9e9',
          borderRadius:'5px',
          padding:'14px'
        }
      }}/>

      <ScrollToTop/>

      <Routes>
        <Route path="/" element={userDate ? <Navigate to="/home" /> : <Register />} />
        <Route path="/login" element={userDate ? <Navigate to="/home" /> : <Login />} />
         <Route path="/cart" element={<Cart />}/>
         <Route path="/search" element={<SearchResults />}/>
         {/* <Route path="/cart" element= {<Cart/> }/> */}
        <Route path="/home" element={userDate ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={userDate ? <Profile userDate={userDate} /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} /> 
        
      </Routes>
    </>
  );
}
  
export default App;
