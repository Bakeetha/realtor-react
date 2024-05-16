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

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { getAuth } from "firebase/auth";
import Contact from '../components/Contact';
import { FaShare } from "react-icons/fa";
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
export default function Listing() {
  const auth = getAuth();
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contactLandlord, setContactLandlord] = useState(false);
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
                    <div className='relative w-full overflow-hidden h-[500px]' 
                    style={{background: `url(${listing.imgUrls[index]}) no-repeat center`,
                    backgroundSize: 'cover'}}>
                    {/* <img src={url} alt="slide" /> */}
                    </div>
                </SwiperSlide>
            ))}
      </Swiper>
      <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'
      onClick={()=> {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(() => {
          setShareLinkCopied(false);
        }, 2000);
      }} >
      <FaShare className='text-lg text-slate-500'/>
      </div>
      {shareLinkCopied && (
        <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md
        bg-white z-10 p-2'>Link Copied</p>
      )}

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
        <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg
        shadow-lg bg-white lg:space-x-5 '>
          <div className='w-full'>
            <p className='text-2xl font-bold mb-3 text-blue-900'>
              {listing.name} - $ {listing.offer ? listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice
              .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {listing.type === 'rent' ? " / month" : ""}
            </p>
            <p className='flex items-center mt-6 mb-3 font-semibold'>
              <FaMapMarkerAlt className='text-green-700 mr-1'/>{listing.address}
            </p>
            <div className='flex justify-start items-center space-x-4 w-[75%]'>
              <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white
              text-center font-semibold shadow-md'>{listing.type === "rent" ? "Rent" : "Sale"}
              </p>
              {listing.offer &&(
                <p className='w-full max-w-[200px] bg-green-800
                  rounded-md p-1 text-white text-center font-semibold shadow-md'>
                  ${+listing.regularPrice - +listing.discountedPrice} discount
                  </p>
              )}
            </div>
            <p className='mt-3 mb-3'> 
              <span className='font-semibold'>Description - </span>
              {listing.description}  
            </p>
            <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6'>
              <li className='flex items-center whitespace-nowrap'>
              <FaBed className='text-lg mr-1'/>
                {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
              <FaBath  className='text-lg mr-1'/>
                {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
              <FaParking  className='text-lg mr-1'/>
                {listing.parking ? "Parking spot" : "No parking"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
              <FaChair  className='text-lg mr-1'/>
                {listing.furnished ? "Furnished" : "Not furnished"}
              </li>
            </ul>
            {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
               <div className='mt-6'>
               <button onClick={()=>setContactLandlord(true)} className='px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase
               rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
               w-full text-center transition duration-150 ease-in-out'>Contact Landlord</button>
                </div>
            )}
            {contactLandlord && (
              <Contact userRef={listing.userRef} listing = {listing}/>
            )
              }
          </div>
          <div className='w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2'>
          <MapContainer center={[listing.geolocation.lat, listing.geolocation.lng]} 
          zoom={13} scrollWheelZoom={false}
          style={{width: '100%', height: '100%'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
              <Popup>
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
          </div>
        </div>
    </main>
  )
}
 