import React, { useEffect, useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md"; //icons
import { Link, useLocation } from 'react-router-dom';
 import { PiSignInBold } from "react-icons/pi";//icons
import { FaUserPlus } from "react-icons/fa6"; //icons
import { CgProfile } from "react-icons/cg";
import style from './header.module.css'



// Navbar
const NavLinks = [
    {title: "Home" ,link:"/home"},
    {title: "About" ,link:"/about"},
    {title: "Accessories" ,link:"/accessories"},
    {title: "Blog" ,link:"/blog"},
    {title: "Contact" ,link:"/contact"},
]
export default function BtmHeader({userDate, logOut}) {
    const location = useLocation()
    const[categories , setCategories] = useState([])
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)  //المنيوا

    useEffect(() =>{
        setIsCategoryOpen(false)
    }, [location])


    useEffect(()=>{
        fetch('https://dummyjson.com/products/categories')
        .then((res) => res.json( ))
        .then((data) => setCategories(data))    
    },[])
    console.log(isCategoryOpen)
// console.log(categories)
  return <>


              <div className={style.btm_header}>
            <div className= {style.container}>
                <nav className={style.nav}>


                    <div className={style.category_nav}>
                        <div className={style.category_btn} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                            <IoMdMenu />
                              <p>Browse Category</p>
                              {/* icons */}
                              <MdOutlineArrowDropDown />
  
                        </div>
                        <div className={`${style.category_nav_list} ${isCategoryOpen ? style.active : ""}`}>
                             {categories.map((category) => (
                                <Link key={category.slug} to={`category/${category.slug}`}> {category.name} </Link>
                             ))}
                        </div>
                    </div>
                        <div className={style.nav_links}>
                            {NavLinks.map((item) => (

                                <Link key={item.link} className={location.pathname ===item.link ? "active" : ""} to={item.link}> {item.title}</Link>
                                
                            ))}
                        </div>
                                        {/* icons */}
                                <div className={style.sign_regs_icon}>
                                   
                                        {userDate && (<Link onClick={logOut} className="btn btn-danger btn-sm ms-3 " to="/login"> <PiSignInBold /></Link>   )}
                                        {/* <Link  to="/"> <FaUserPlus /></Link> */}
                                    <Link className="btn bg-success  btn-sm ms-3 " to="/profile"> <CgProfile /> </Link>
                                    
                                </div>
                </nav>
            </div>
        </div>
  
  </>
}
