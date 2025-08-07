import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import SlideProducts from '../SlideProducts/SlideProducts';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';



export default function ProductDetails() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true)

    const { cartItems, addToCart ,  addToFavorites, favorites, removeFromFavorites } = useContext(CartContext)
    // ده علشان الزرار يروح لcart
    const navigate = useNavigate();
    // جزء الانماشان بتاع الشراء
    const handleAddToCart = () => {
        addToCart(product)

        toast.success(


            <div className={styles.toast_wrapper}>
                <img src={product.images[0]} alt={product.title} className={styles.toast_img} />
                <div className={styles.toast_content}>
                    <strong className={styles.toast_title}>{product.title}</strong>
                    <span className={styles.toast_message}> Added to Cart   </span>
                    <button onClick={() => navigate('/cart')} className={styles.toast_btn}>View Cart </button>
                </div>
            </div>

            , { duration: 3500 }
        )
    }

  // Favorites
  const isInFav = product && favorites.some(i => i.id === product.id);
  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(product.id)
      toast.error(`${product.title} Removed for favorites`)
    } else {
      addToFavorites(product)
      toast.success(`${product.title} added To favorites`)
    }

  }
  

    // ده الي لو المنتج في سله مينفعش اضيفه تاني
  const isInCart = product && cartItems.some(i => i.id === product.id);
    useEffect(() => {
        const fatchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                const data = await res.json()
                setProduct(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fatchProduct()
    }, [id])

    // بيظهر الكارسول تحت 
    useEffect(() => {
        if (!product) return
        fetch(`https://dummyjson.com/products/category/${product.category}`)
            .then((res) => res.json())
            .then((data) => {
                setRelatedProducts(data.products)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingRelatedProducts(false))
    }, [product?.category])




    if (loading) return <p>Loading......</p>
    if (!product) return <p>Product Not Found</p>



    return <>


        <div>

            <div className={styles.item_details}>

                <div className={styles.container}>

                    <div className={styles.imgs_item}>

                        <div className={styles.big_img}>
                            <img id='big_img' src={product.images[0]} alt={product.title} />
                        </div>
                        <div className={styles.sm_img}>
                            {product.images.map((img, index) => (
                                <img key={index} src={img} alt={product.title} onClick={() => document.getElementById("big_img").src = img} />   ///ده جزي اظهار المنتج
                            ))}
                        </div>
                    </div>


                    <div className={styles.details_item}>
                        <h1 className={styles.name}> {product.title} </h1>
                        <div className={styles.stars}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                        </div>

                        <p className={styles.price}> ${product.price} </p>

                        <h5> Availability: <span> {product.availabilityStatus} </span> </h5>
                        <h5> Brand: <span> {product.brand} </span> </h5>
                        <p className={styles.desc}> {product.description}</p>
                        <h5 className={styles.stock}> <span>Hurry Up! {product.stock} Products left in stock. </span> </h5>

                        <button onClick={handleAddToCart} className={`${styles.btn} ${isInCart ? styles.inCart : ''}`}>
                             {isInCart ? "item in cart" : "Add to cart"} <TiShoppingCart />
                        </button>


                        <div className={styles.icons}>
                            {/* <span ><FaRegHeart /></span> */}
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
                </div>

            </div>



            {loadingRelatedProducts ? (

                <p>Loadding.....</p>
            ) : (
                <SlideProducts key={product.category} data={relatedProducts} title={product.category.replace("-", " ")} />
            )}

        </div>



    </>
}
