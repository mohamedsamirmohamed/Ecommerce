import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination } from 'swiper/modules';
import style from './HeroSlider.module.css';
import { Link } from 'react-router-dom';
import banner_Hero1 from '../../Components/img/banner_Hero1.jpg'
import banner_Hero2 from '../../Components/img/banner_Hero2.jpg'
import banner_Hero3 from '../../Components/img/banner_Hero3.jpg'

export default function HeroSlider() {
  return <>


 <div className={style.hero}>
      <div className={style.container}>
        <Swiper
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className={style.mySwiper}>
          <SwiperSlide className={style.swiperSlide}>
            <div className={style.content}>
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br />360Controller</h3>
              <p>Windows Xp/10/7/8 ps3, Tv Box</p>
              <Link to="/" className={style.btn}>Shop Now</Link>
            </div>
            <img src={banner_Hero1} alt="slider hero 1" />
          </SwiperSlide>

          <SwiperSlide className={style.swiperSlide}>
            <div className={style.content}>
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br />360Controller</h3>
              <p>Windows Xp/10/7/8 ps3, Tv Box</p>
              <Link to="/" className={style.btn}>Shop Now</Link>
            </div>
            <img src={banner_Hero2} alt="slider hero 2" />
          </SwiperSlide>

          <SwiperSlide className={style.swiperSlide}>
            <div className={style.content}>
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br />360Controller</h3>
              <p>Windows Xp/10/7/8 ps3, Tv Box</p>
              <Link to="/" className={style.btn}>Shop Now</Link>
            </div>
            <img src={banner_Hero3} alt="slider hero 3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>




    {/* <Swiper pagination={true} modules={[Pagination]} className={style.mySwiper}>
      <SwiperSlide className={style.swiperSlide}>Slide 1</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 2</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 3</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 4</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 5</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 6</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 7</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 8</SwiperSlide>
      <SwiperSlide className={style.swiperSlide}>Slide 9</SwiperSlide>
    </Swiper> */}
  
  </>
}