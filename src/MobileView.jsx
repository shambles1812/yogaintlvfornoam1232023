import React, { useEffect, useRef, useState, useContext} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Calendar from "./Calendar"
import Slide from "./Slide";
import { useSwiper } from 'swiper/react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import "./index.css"
// import required modules
import { Pagination } from "swiper";
import { SlideContext } from "./context/SlideContext";

import LoadingView from "./LoadingView";
import location_svg from './location 1.svg';
import clock_svg from './clock 1.svg';
import yoga_svg from './yoga 1.svg';
import call_svg from './call.svg';
import world_svg from './world.svg';

const MobileView = () => {
    const swiper = useSwiper();
    var curr = new Date(); // get current date
    var curr_hour = curr.getHours()
    var curr_date = curr.getDate();

    const {slide_json,setSlideJson} = useContext(SlideContext)
    const [chosenHour, setchosenHour] = useState(1);
    const [hourSwiper, setHourSwiper] = useState(null);
    const [fetching,setFetching] = useState(true);
    
    const [chosenDate, setchosenDate] = useState(curr_date);

    const [inactiveStudios,setInactiveStudios] = useState([]);
    const [activeStudios,setActiveStudios] = useState([]);

     var fixed_hours = [
      
     
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
    fixed_hours = fixed_hours.reverse()
    const [activeHours,setActiveHours] = useState(fixed_hours);
    // const studios = [
    //   {"studio_name":"איקיגאי",
    //   "studio_logo":"https://static.wixstatic.com/media/4d0a61_d2686cde98304e9fac4a8812934e6d84~mv2.png/v1/crop/x_0,y_0,w_282,h_289/fill/w_36,h_36,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Asset%203_3x.png",
    //   "studio_address":"איקיגאי - שנקין 38"}
    // ]
    const studios = {
      "יוגה לבונטין":{"studio_logo":"https://yogalev.co.il/wp-content/uploads/2021/11/trans-logo-58.png",
      "studio_address":"יוגה לבונטין - לבונטין 7"},//mindbodyonline
      "ויג'נאנה יוגה":{"studio_logo":"https://yogatlv.co.il/wp-content/uploads/2019/03/logo.png",
      "studio_address":"ויג'נאנה יוגה - מזא\"ה 22"},//yogatlv
      "ביקראם יוגה":{"studio_logo":"https://bikramyoga.co.il/wp-content/uploads/2016/02/logo.png",
      "studio_address":"ביקראם יוגה - בן אביגדור 26"},//bikram
      "אור היוגה":{"studio_logo":"https://www.oryoga.com/application/assets/images/logo-full.png",
      "studio_address":"אור היוגה - סירקין 9 על בוגרשוב"},//oryoga
      "סטודיו נעים במזא\"ה":{"studio_logo":"https://m2.fizikal.co.il/wsv2/ImageService.aspx?id=79,2,0&updatedAt=20190924.124112&type=BranchLogo",
      "studio_address":"סטודיו נעים - מזא\"ה 42 על רוטשילד"},//fizkal
      "סטודיו נעים באבן גבירול":{"studio_logo":"https://m2.fizikal.co.il/wsv2/ImageService.aspx?id=79,2,0&updatedAt=20190924.124112&type=BranchLogo",
      "studio_address":"סטודיו נעים - אבן גבירול 108"},//fizkal2
      "איקיגאי":{"studio_logo":"https://static.wixstatic.com/media/4d0a61_d2686cde98304e9fac4a8812934e6d84~mv2.png/v1/crop/x_0,y_0,w_282,h_289/fill/w_36,h_36,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Asset%203_3x.png",
      "studio_address":"איקיגאי - שנקין 38"},//ikigai

    }
    const allStudios = [

     // "יוגה לבונטין", //mindbodyonline
      "ויג'נאנה יוגה", //yogatlv
      "ביקראם יוגה", //bikram
      "אור היוגה", //oryoga
      "סטודיו נעים במזא\"ה", //fizkal 1
      "סטודיו נעים באבן גבירול",//fizkal 2
      "איקיגאי", //ikigai
    ]
    // useEffect(() => {
      
    
    //   var activeStudios = []
    //   slide_json.forEach( (schedule_json =>{
    //     if(!(schedule_json.studio_name in activeStudios)){
    //       activeStudios.push(schedule_json.studio_name)
    //     }
    //   }))
    //   var inactiveStudios = allStudios.filter(x => !activeStudios.includes(x));
    //   console.log(activeStudios)
    //   // if (localStorage.getItem('chosenDate')){
    //   //   const chosenDate = JSON.parse(localStorage.getItem('chosenDate'));
    //   // }
      
    //   // if (chosenDate) {
         
    //   //     setchosenDate(chosenDate);
    //   // }
    // }, [slide_json]);


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
        console.log("CHOSEN HOUR AFTER PARSE")
          console.log(chosenHour)
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
      console.log(slide_json)
      localStorage.setItem('chosenHour', JSON.stringify(chosenHour));
      setInactiveStudios([])
      setActiveHours([])
      console.log("CHECKING SLIDE JSON")
      console.log(chosenHour)
      var currentActiveStudios = []
      var currentActiveHours = []

      slide_json.forEach(schedule_json=>{
        const classStartHour_raw = schedule_json.class_start_hour
        var classStartHour = classStartHour_raw.split(":");
        
        const hours = classStartHour[0];
        const minutes = classStartHour[1];
        if(!currentActiveHours.includes(parseInt(hours))){
          currentActiveHours.push(parseInt(hours))
        }
        var classDate = new Date(schedule_json.class_date)
        classDate.setHours(hours)
        classDate.setMinutes(minutes)
        if(hours >= chosenHour && hours < chosenHour+1){
          if(!currentActiveStudios.includes(schedule_json.studio_name)){
            currentActiveStudios.push(schedule_json.studio_name)
            console.log("ACTIVE STUDIO FOUND")
          }
        }
        
      })

      console.log("CURRENT ACTIVE HOURS")
      console.log(currentActiveHours)
      setActiveHours(currentActiveHours)
      console.log(currentActiveStudios)
      var currinactiveStudios = allStudios.filter(x => !currentActiveStudios.includes(x));
      console.log(allStudios)
      console.log("INACTIVE STUDIOS")
      console.log(currinactiveStudios)
      console.log(studios[currinactiveStudios[0]])
      setInactiveStudios(currinactiveStudios)
      console.log("Updated inactive studio")
      console.log(studios[inactiveStudios[0]])
      
    }, [chosenHour]);

    useEffect(() => {

    })
  
    var hours = activeHours
    
    return (
        <>{ fetching === true ? (<LoadingView />) : (
          <></>
        )
        }
        <>
        <div className="z-0">
        <div className="h-[240px] bg-lavander">
          <Calendar setFetching={setFetching} setMobileDate={setchosenDate} chosenDate={chosenDate} setMobileHour={setchosenHour} chosenHour={chosenHour}/>
        </div>
        
        <div className="h-1/3 bg-lavander ">
        <Swiper
            initialSlide={chosenHour}
            snapIndex={chosenHour}
            slidesPerView={5}
            spaceBetween={5}
            onActiveIndexChange={() => console.log("active index changed to "+ chosenHour)}
            onSlideChange={() => console.log('slide change')}
            onUpdate={()=> console.log("updated")}
            // onSwiper={(swiper) => console.log(swiper)}            
            slideToClickedSlide={true}
            onSwiper={setHourSwiper}
            
            > 
            {/* {hourSwiper? hourSwiper.slideTo(chosenHour): console.log("nothing initialized")} */}
            {/* {hourSwiper? setActiveStudios([]): console.log("resetting active studios")} */}
            {
              
              hours.map( (hour => {
                
                  return (
                    <SwiperSlide onClick={() => setchosenHour(hour)} className={chosenHour === toString(hour) ? "swiper-slide-active":""}>
                    <div className="w-[30px] font-bold font-inter">
                      <div className={chosenHour === hour ? "w-[75px] h-[30px] bg-white rounded-[15px]":"w-[75px] h-[30px] rounded-[15px]"}>
                      {hour}:00
                        
                      </div>
                    </div>
                    
                    </SwiperSlide>
                    );
                  }))
                  
            }
            <SwiperSlide >
                    <div className="w-[30px] font-bold font-inter" >
                      <div className="w-[75px] h-[30px] rounded-[15px]">
                       
                        
                      </div>
                    </div>
  
            </SwiperSlide>
            <SwiperSlide >
                    <div className="w-[30px] font-bold font-inter" >
                      <div className="w-[75px] h-[30px] rounded-[15px]">
                     
                        
                      </div>
                    </div>
  
            </SwiperSlide>
            <SwiperSlide >
                    <div className="w-[30px] font-bold font-inter" >
                      <div className="w-[75px] h-[30px] rounded-[15px]">
                     
                        
                      </div>
                    </div>
  
            </SwiperSlide>
            <SwiperSlide >
                    <div className="w-[30px] font-bold font-inter" >
                      <div className="w-[75px] h-[30px] rounded-[15px]">
                     
                        
                      </div>
                    </div>
  
            </SwiperSlide>
   
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
            className="cardSwiper bg-lavander">
          <>
          { slide_json ?
            
            slide_json.map( ((schedule_json,index,arr) =>{
       
              var curr = new Date();

              const classStartHour_raw = schedule_json.class_start_hour
              var classStartHour = classStartHour_raw.split(":");
              
              const hours = classStartHour[0];
              const minutes = classStartHour[1];
        
              var classDate = new Date(schedule_json.class_date)
              classDate.setHours(hours)
              classDate.setMinutes(minutes)

              console.log("TESTING INACTIVES")
              console.log(inactiveStudios)
              if (hours >= chosenHour && hours < chosenHour+1 ) {
                return(
                  <>
                  <SwiperSlide >
                  <Slide schedule_json={schedule_json}></Slide>
                  </SwiperSlide>
                  </>
                )
              }

              // if (arr.length -1 == index) {
              //   return(
              //     <>
              //     {
              //       inactiveStudios.map(inactiveStudio => {
              
              //         return(
              //           <SwiperSlide>
              //   <div id="image container"className={  (" w-[100%] translate-y-[-25%] h-[60%] bg-black/[75%] rounded-[30px] mt-[-10%] shadow-xl")}>
              //     <div className='mt-[5%] h-[75%] w-[90%] mx-auto'>
              //         <img src={studios[inactiveStudio].studio_logo} className="!object-contain"></img>
                  
              //     </div>
              //     <div className="w-[91%]  h-auto bg-white rounded-[18px]  mx-auto my-[8%] py-[2%] shadow-xl">
                  
                      
              //         <div className="font-bold text-[18px] text-right font-heebo pr-[5%] pt-[3%]">
              //         <p >
              //             {" לא נמצאו שיעורים"}</p>
              //         </div>
        
                      
        
              //     <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
              //         <p className='!inline'>
              //         <img src={location_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
              //         </img>
              //         {" "+studios[inactiveStudio].studio_address}
              //         </p>
              //         </div>
                      
        
              //     </div>
              //     </div> 
              //           </SwiperSlide>
              //         )
              //       })
              //     }
              //     </>
              //   )
              // }
              }))
            
              :(<p></p>)
            }
          </>
        
          

          </Swiper>
          
          
          </div>
        </>
        </>
        
      );
}

export default MobileView;