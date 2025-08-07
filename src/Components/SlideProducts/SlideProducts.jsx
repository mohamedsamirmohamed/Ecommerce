import React from 'react'
import Product from './Product'
import styles from './slideProducts.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,Navigation } from 'swiper/modules';

export default function SlideProducts({data, title}) {
  return <>
     


             <div className={styles.slide_products}>
      <div className={styles.container}>
        <div className={styles.top_slide}>
          <h2>{title}</h2>
          <p>Add bestselling products to weekly line up</p>
        </div>

         

 <Swiper 
  loop={Product.length >= 6} // عدد كافي للـ loop
  autoplay={{
    delay: 2000, 
    disableOnInteraction: false,
  }}
  slidesPerView={1}
  spaceBetween={20}
  navigation={true} 
  modules={[Navigation, Autoplay]} 
  className="mySwiper"
  breakpoints={{
    // Mobile
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // Small tablets
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // Tablets
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // Medium desktops
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    // Large desktops - 5 products
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  }}
>

    {data.map((item) => {
        return(
              <SwiperSlide>  <Product item={item} />  </SwiperSlide>
        )

    })}
  

</Swiper>


        
      </div>
    </div>
   
    </>
}
