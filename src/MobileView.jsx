import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Calendar from "./Calendar"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import "./index.css"
// import required modules
import { Pagination } from "swiper";

const MobileView = () => {
    var curr = new Date; // get current date
    const [chosenHour, setchosenHour] = useState(curr.getHours());
    var curr_date = curr.getDate();
    const [chosenDate, setChosenDate] = useState(curr_date);
    var hours = [
     
      23,
      22,
      21,
      20,
      19,
      18,
      17,
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ]
    return (
    
        <>
        <div>
        <div className="h-[250px] bg-lavander">
          <Calendar setchosenDate2={setChosenDate} chosenDate={chosenDate}/>
        </div>
        <div className="h-1/3 bg-lavander ">
        <Swiper
            initialSlide={23-chosenHour}
            slidesPerView={4.5}
            spaceBetween={5}
            className="hourSwiper"
          >
            {
              hours.map( (hour => {
                  return (
                    <SwiperSlide onClick={() => setchosenHour(hour)}>
                    <div className="w-[30px]"></div>
                    <div className={chosenHour === hour ? "w-[75px] h-[30px] bg-white rounded-[15px]":"w-[75px] h-[30px] rounded-[15px]"}>
                    {hour}:00
                      
                    </div>
                    </SwiperSlide>
                    );
                  }))
            }
          </Swiper>
        </div>
        </div>
        <div  className="bg-lavander h-2/3">
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            slidesPerView={1.25}
            spaceBetween={24}
            centeredSlides={true}
            className="cardSwiper bg-lavander"
           
          >
          <></>
            <SwiperSlide>
              <div className="w-[100%] h-[70%] bg-white rounded-[30px] mt-[-20%]">
              Slide 1
              </div>
            </SwiperSlide>
            
            <SwiperSlide>
            <div className="w-[100%] h-[70%] bg-white rounded-[30px] mt-[-20%]">
                slide 2
              </div>
            </SwiperSlide >

            <SwiperSlide>
            <div className="w-[100%] h-[70%] bg-white rounded-[30px] mt-[-20%]">
                slide 3
              </div>
            </SwiperSlide >

            <SwiperSlide>
            <div className="w-[100%] h-[70%] bg-white rounded-[30px] mt-[-20%]">
                slide 4
              </div>
            </SwiperSlide >
            
    
          </Swiper>
          </div>
        </>
      );
}

export default MobileView;