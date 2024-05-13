import React, { useEffect, useState } from 'react'
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from'react-router-dom';
import Spinner from '../components/Spinner';
// import { Swiper, SwiperSlide} from 'swiper/react';
// import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination, Scrollbar, A11y } from'swiper';
// import 'swiper/css/bundle';
// import Swiper bundle with all modules installed
// import Swiper from 'swiper/bundle';

// // import styles bundle
// import 'swiper/css/bundle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules

import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


// import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper';

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    // init Swiper:
    // const swiper = new Swiper('.swiper', {
    //     SwiperSlider: {
    //       effect: 'fade',
    //     },
    //     // Optional parameters
    //     direction: 'vertical',
    //     loop: true,
      
    //     // If we need pagination
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
      
    //     // Navigation arrows
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
      
    //     // And if we need scrollbar
    //     scrollbar: {
    //       el: '.swiper-scrollbar',
    //     },
    //   });
    // SwiperCore.use(EffectFade, Autoplay, Navigation, Pagination, Scrollbar, A11y);
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.exists(), docSnap.data(),);
            if(docSnap.exists()){
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
        console.log(listing);
    },[params.listingId]);
    if(loading){
        return <Spinner />
    }
  return (
    <main>
    {/* <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false,}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className='w-full overflow-hidden h-[300px]'>Slide 1</SwiperSlide>
      <SwiperSlide className='w-full overflow-hidden h-[300px]'>Slide 2</SwiperSlide>
      <SwiperSlide className='w-full overflow-hidden h-[300px]'>Slide 3</SwiperSlide>
      <SwiperSlide className='w-full overflow-hidden h-[300px]'>Slide 4</SwiperSlide>
    </Swiper> */}
     <Swiper 
        className="mySwiper"
        slidesPerView={1}
        navigation={true}
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[ Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={50}
        centeredSlides={true}
        //   scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div className='relative w-full overflow-hidden h-[300px]' 
                    style={{background: `url(${listing.imgUrls[index]}) no-repeat center`,
                    backgroundSize: 'cover'}}>
                    {/* <img src={url} alt="slide" /> */}
                    </div>
                </SwiperSlide>
            ))}
      </Swiper>

      {/* <Swiper slidesPerView={1} 
      navigation={true}
      spaceBetween={50} 
      pagination={{ clickable: true, type: 'progressbar'}}
      modules={[Autoplay, Pagination, Navigation, EffectFade, Scrollbar, A11y]}
      effect="fade"
      autoplay={{delay: 3000}}
      scrollbar={{ draggable: true }}
      centeredSlides={true}> 
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div className='w-full overflow-hidden h-[300px]' 
                    style={{background: `url(${listing.imgUrls[index]}) no-repeat center`}}>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>  */}

        {/* <Swiper slidesPerView={1} navigation pagination={{type: 'progressbar'}} effect='fade' modules={[EffectFade]}
        autoplay={{delay: 3000}}> 
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div className='w-full overflow-hidden h-[300px]' style={{background: `url(${listing.imgUrls[index]}) no-repeat center`}}>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper> */}
    </main>
  )
}
