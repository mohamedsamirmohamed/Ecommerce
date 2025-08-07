


//Navba
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Components/img/logo.png'    // بعرف الصوره
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
 import { CartContext } from '../CartContext/CartContext';
import SerachBox from './SerachBox';
import style from './header.module.css'

export default function ToHeader({ userDate }) {

    const { cartItems , favorites } = useContext(CartContext)

    return <>


        <div className={style.top_header}  >
            <div className={style.container}  >
                <Link to="/" className={style.logo}>
                    <img src={Logo} alt="logo" />
                </Link>

               <SerachBox/>

                <div className={style.header_icons}>
                    <div className={style.icon}>
                        <FaRegHeart />
                        <span className={style.count}>{favorites.length}</span>
                    </div>

                    <div className={style.icon}>
                        <Link to="/cart" className={style.cartLink}>
                            <BsCart4 className={style.cartIcon} />
                            <span className={style.count}>{cartItems.length}</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </>
} 