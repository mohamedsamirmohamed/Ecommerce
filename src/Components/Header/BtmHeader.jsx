import React, { useEffect, useState } from 'react'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import style from "./header.module.css";

// Navbar Links
const NavLinks = [
  { title: "Home", link: "/home" },
  // أضف روابط أخرى إذا أردت
];

export default function BtmHeader({ userDate, logOut }) {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories API data:", data); // لفحص البيانات في الكونسول
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${style.category_nav}`) &&
        !event.target.closest(`.${style.mobile_menu_toggle}`) &&
        !event.target.closest(`.${style.mobile_nav}`)
      ) {
        setIsCategoryOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={style.btm_header}>
      <div className={style.container}>
        <nav className={style.nav}>
          {/* تصنيف المنتجات */}
          <div className={style.category_nav}>
            <div
              className={style.category_btn}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <IoMdMenu />
              <p className={style.p}>Browse Category</p>
              <MdOutlineArrowDropDown
                className={isCategoryOpen ? style.rotate : ""}
              />
            </div>
            <div
              className={`${style.category_nav_list} ${
                isCategoryOpen ? style.active : ""
              }`}
            >
              {categories.map((category, idx) => {
                if (typeof category === "string") {
                  // لو العنصر نص عادي
                  return (
                    <Link key={category} to={`category/${category}`}>
                      {category}
                    </Link>
                  );
                } else if (
                  typeof category === "object" &&
                  category.slug &&
                  category.name
                ) {
                  // لو العنصر كائن فيه slug و name
                  return (
                    <Link key={category.slug} to={`category/${category.slug}`}>
                      {category.name}
                    </Link>
                  );
                } else {
                  // حالة fallback
                  return <React.Fragment key={idx}></React.Fragment>;
                }
              })}
            </div>
          </div>

          {/* روابط التنقل */}
          <div className={style.nav_links}>
            {NavLinks.map((item) => (
              <Link
                key={item.link}
                className={location.pathname === item.link ? style.active : ""}
                to={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* أيقونات تسجيل الدخول والملف */}
          <div className={style.sign_regs_icon}>
            {userDate && (
              <Link
                onClick={logOut}
                className="btn btn-danger btn-sm ms-3"
                to="/login"
              >
                <PiSignInBold />
              </Link>
            )}
            <Link className="btn bg-success btn-sm ms-3" to="/profile">
              <CgProfile />
            </Link>
          </div>

          {/* زر الهامبرجر للموبايل */}
          <button
            className={style.mobile_menu_toggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            title="Menu"
          >
            {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>

          {/* قائمة الموبايل */}
          <div
            className={`${style.mobile_nav} ${
              isMobileMenuOpen ? style.mobile_nav_open : ""
            }`}
          >
            <div className={style.mobile_nav_links}>
              {NavLinks.map((item) => (
                <Link
                  key={item.link}
                  className={location.pathname === item.link ? style.active : ""}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className={style.mobile_auth}>
              {userDate && (
                <Link
                  onClick={(e) => {
                    logOut(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn btn-danger btn-sm"
                  to="/login"
                >
                  <PiSignInBold /> Sign Out
                </Link>
              )}
              <Link
                className="btn bg-success btn-sm"
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CgProfile /> Profile
              </Link>
            </div>
          </div>
        </nav>

        {/* تراكب الإغلاق للموبايل */}
        {isMobileMenuOpen && (
          <div
            className={style.mobile_overlay}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
