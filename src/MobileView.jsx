import React, { useEffect, useRef, useState, useContext} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Calendar from "./Calendar"
import Slide from "./Slide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import "./index.css"
// import required modules
import { Pagination } from "swiper";
import { SlideContext } from "./context/SlideContext";
import LoadingView from "./LoadingView";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MobileView = () => {
    var curr = new Date(); // get current date
    var curr_hour = curr.getHours()
    const {slide_json,setSlideJson} = useContext(SlideContext)
    const [chosenHour, setchosenHour] = useState(curr_hour);
    
    
    
  
  const [fetching,setFetching] = useState(true);

  useEffect(() => {
    const fetching = JSON.parse(localStorage.getItem('fetching'));
    if (fetching) {
      setFetching(fetching);
    }
  }, []);
  useEffect(() => {
    console.log(fetching)
    localStorage.setItem('fetching', JSON.stringify(fetching));
  }, [fetching]);


    useEffect(() => {
      const chosenHour = JSON.parse(localStorage.getItem('chosenHour'));
      if (chosenHour) {
         
          setchosenHour(chosenHour);
      }
    }, []);
    useEffect(() => {
      console.log(chosenHour)
      localStorage.setItem('chosenHour', JSON.stringify(chosenHour));
    }, [chosenHour]);
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
        <><div>
            <div className="h-[250px] bg-lavander">
              <Calendar/>
            </div>
            
            <div className="h-1/3 bg-lavander ">
            <Swiper
                initialSlide={20-chosenHour}
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
              { slide_json ?
                slide_json.map( (schedule_json =>{
                  console.log(schedule_json)
                  var curr = new Date();
    
                  const classStartHour_raw = schedule_json.class_start_hour
                  var classStartHour = classStartHour_raw.split(":");
                  // Use the substring() function to extract hours and minutes
                  const hours = classStartHour[0];
                  const minutes = classStartHour[1];
                  
                  // Use the setHours() function to assign hours and minutes
                  // to the "today" date object
                  
                  
                  var classDate = new Date(schedule_json.class_date)
                  classDate.setHours(hours)
                  classDate.setMinutes(minutes)
                  
                  return(
                    hours >= chosenHour && hours < chosenHour+1 ? <SwiperSlide>
                      <Slide schedule_json={schedule_json}></Slide>
                    </SwiperSlide>:<p></p>
                    
                  )})):(<p></p>)
                }
    
              </Swiper>
              
              
              </div>
        </>
      );
}

export default MobileView;