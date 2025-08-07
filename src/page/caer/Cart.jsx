import React, { useContext } from 'react'
import stylee from './Cart.module.css'
import { CartContext } from '../../Components/CartContext/CartContext'
import { FaTrashAlt } from "react-icons/fa";

export default function Cart() {


    const { cartItems, increaseQuantity , decreaseQuantity , removeFromCart} = useContext(CartContext)
    // console.log(cartItems)

    // total item 
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)


    return <>

        <div className={stylee.checkout}>
            <div className={stylee.ordersummary}>
                <h1>Order Summary</h1>

                <div className={stylee.items}>
                    {cartItems.length === 0 ? (
                        <p>Your Cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className={stylee.item_cart}>
                                <div className={stylee.image_name}>
                                    <img src={item.images[0]} alt="" />

                                    <div className={stylee.content}>
                                        <h1>{item.title}</h1>
                                        {/* <p  className={stylee.price_item}>${item.price} </p> */}
                                        <p className={stylee.price_item}>${(item.price * item.quantity).toFixed(2)}</p>


                                        <div className={stylee.quantity_control}>
                                            <button onClick={()=>decreaseQuantity(item.id)}>-</button>
                                            <span className={stylee.quantity}>{item.quantity}</span>
                                            <button onClick={()=>increaseQuantity(item.id)}>+</button>
                                        </div>
                                    </div>

                                    <button onClick={()=>removeFromCart(item.id)} className={stylee.delete_item}> <FaTrashAlt /> </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={stylee.bottom_summary}>
                    <div className={stylee.shop_table}>
                        <p>Total:</p>
                        <span className={stylee.total_checkout}> ${total.toFixed(2)} </span>
                    </div>
                    <div className={stylee.button_div}>
                        <button typ='subit'>Place Order </button>
                    </div>
                </div>

            </div>

        </div>

    </>
}
