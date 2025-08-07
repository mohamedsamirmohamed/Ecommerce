import React, { useContext } from 'react'
import styles from './slideProducts.module.css';
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { FaCheck } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function Product({ item }) {

  // ده علشان الزرار يروح لcart
  const navigate = useNavigate();

  const { cartItems, addToCart, addToFavorites, favorites, removeFromFavorites } = useContext(CartContext)
  //  console.log(cartItems)

  const isInCart = cartItems.some(i => i.id === item.id);


  // جزء الانماشان بتاع الشراء
  const handleAddToCart = () => {
    addToCart(item)

    toast.success(


      <div className={styles.toast_wrapper}>
        <img src={item.images[0]} alt={item.title} className={styles.toast_img} />
        <div className={styles.toast_content}>
          <strong className={styles.toast_title}>{item.title}</strong>
          <span className={styles.toast_message}> Added to Cart   </span>
          <button onClick={() => navigate('/cart')} className={styles.toast_btn}>View Cart </button>
        </div>
      </div>

      , { duration: 3500 }
    )
  }

  // Favorites
  const isInFav = favorites.some(i => i.id === item.id);
  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(item.id)
      toast.error(`${item.title} Removed for favorites`)
    } else {
      addToFavorites(item)
      toast.success(`${item.title} added To favorites`)
    }

  }

  return <>

    <div className={`${styles.product} ${isInCart ? styles.inCart : ''}`}>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/products/${item.id}`}>
        <span className={styles.status_cart}> <FaCheck /> in cart </span>

        <div className={styles.img_product}>
          <img src={item.images[0]} alt="" />
        </div>
        <p className={styles.name_product}> {item.title} </p>

        <div className={styles.stars}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <span className={styles.prics}>
          <p>${item.price}</p> </span>

      </Link>

      <div className={styles.icons}>
        <span className={styles.btn_cart} onClick={handleAddToCart}><FaCartArrowDown /></span>
        {/* <span className={`${isInFav ? "in-fav" : ""}`}  onClick={handleAddToFav}><FaRegHeart /></span> */}

        <button
          className={`btn rounded-circle d-flex align-items-center justify-content-center 
         ${isInFav ? 'btn-danger' : 'btn-outline-secondary'}`}
          style={{ width: '36px', height: '36px' }}
          onClick={handleAddToFav}>
          {isInFav ? <FaHeart /> : <FaRegHeart />}
        </button>

        <span><FaShare /></span>
      </div>

    </div>
  </>
} 
