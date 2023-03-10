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
// import LoadingView from "./LoadingView";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MobileView = () => {
    var curr = new Date(); // get current date
    var curr_hour = curr.getHours()
    var curr_date = curr.getDate();
    const {slide_json,setSlideJson} = useContext(SlideContext)
    // var local_date = JSON.parse(localStorage.getItem('chosenDate'))
    // if (typeof local_date !== undefined){
    //   curr_date = local_date
    // }
    const [chosenHour, setchosenHour] = useState(curr_hour);
   
    const [fetching,setFetching] = useState(false);
    const [chosenDate, setchosenDate] = useState(curr_date);
    console.log("Mobile View Chosen Date")
    console.log(chosenDate)
    useEffect(() => {
      // if (localStorage.getItem('chosenDate')){
      //   const chosenDate = JSON.parse(localStorage.getItem('chosenDate'));
      // }
      
      // if (chosenDate) {
         
      //     setchosenDate(chosenDate);
      // }
    }, []);
  useEffect(() => {
    console.log("SETTING CUR HOUR")
    
    
    // setchosenHour(JSON.parse(localStorage.getItem('chosenHour')))
    const fetching = JSON.parse(localStorage.getItem('fetching'));
    console.log("FETCHING")
    console.log(fetching)
    if (fetching) {
      setFetching(fetching);
      console.log("Fetching by first render function")
      console.log(fetching)
    }
    
    const chosenHour = JSON.parse(localStorage.getItem('chosenHour'));
      if (chosenHour) {
         
          setchosenHour(chosenHour);
          
      }
  }, []);
  

  useEffect(() => {
    
    localStorage.setItem('fetching', JSON.stringify(fetching));
    console.log("Fetching state based on changes")
    console.log(fetching)
    setFetching(fetching)
  }, [fetching]);


    // useEffect(() => {
    //   
    // }, []);
    useEffect(() => {
      console.log("Onclick chosen hour")
      console.log(chosenHour)
      localStorage.setItem('chosenHour', JSON.stringify(chosenHour));
      // setchosenHour(chosenHour)
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
    hours = hours.reverse()
    return (
        <>{ fetching === true ? (<p>Fetching</p>) : (
          <>
          <div>
          <div className="h-[240px] bg-lavander">
            <Calendar setFetching={setFetching} setMobileDate={setchosenDate} chosenDate={chosenDate}/>
          </div>
          
          <div className="h-1/3 bg-lavander ">
          <Swiper
              initialSlide={23-chosenHour}
              slidesPerView={5}
              spaceBetween={5}
              onLoad={(swiper) => swiper.slideTo(chosenHour)}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              slideToClickedSlide={true}
              > 
              {
                hours.map( (hour => {
                    return (
                      <SwiperSlide onClick={() => setchosenHour(hour)} className={chosenHour === hour ? "swiper-slide-active":""}>
                      <div className="w-[30px] font-bold font-inter">
                        <div className={chosenHour === hour ? "w-[75px] h-[30px] bg-white rounded-[15px]":"w-[75px] h-[30px] rounded-[15px]"}>
                        {hour}:00
                          
                        </div>
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
                  hours >= chosenHour && hours < chosenHour+1 ? <SwiperSlide >
                    <Slide schedule_json={schedule_json}></Slide>
                  </SwiperSlide>:<p></p>
                  
                )})):(<p></p>)
              }
  
            </Swiper>
            
            
            </div>
          </>
        )

        }
        </>
      );
}

export default MobileView;