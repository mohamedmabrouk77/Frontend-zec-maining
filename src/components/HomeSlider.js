import React from 'react';import {Swiper,SwiperSlide} from 'swiper/react';import {Pagination,Autoplay} from 'swiper/modules';import {motion} from 'framer-motion';import 'swiper/css';import 'swiper/css/pagination';import {useConfig} from '../context/ConfigContext';
export default function HomeSlider(){
  const{slides,cfg}=useConfig();
  const imgs=slides.length?slides.map(s=>s.imageUrl):[
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=300&fit=crop'
  ];
  return(
  <motion.div initial={{opacity:0,scale:0.95}}animate={{opacity:1,scale:1}}transition={{duration:0.5}}className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-lg">
  <Swiper modules={[Pagination,Autoplay]}pagination={{clickable:true}}autoplay={{delay:4000,disableOnInteraction:false}}loop={imgs.length>1}className="w-full h-44">
  {imgs.map((img,i)=><SwiperSlide key={i}><img src={img}alt={`slide-${i}`}className="w-full h-full object-cover"/></SwiperSlide>)}
  </Swiper>
  </motion.div>);
}
