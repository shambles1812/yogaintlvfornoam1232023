import React, { useEffect, useRef, useState, useContext} from "react";
// Import Swiper React components
import AuthContext from "./context/AuthProvider";
import { UserContext } from "./context/UserContext";
import MobileView from './MobileView';
import LoginView from './LoginView';

import { SlideContext } from "./context/SlideContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import spinner from "./spinner.gif";
import "./styles.css";
import "./index.css"
import axios from './api/axios';
// import homepage from './homepage.jpeg'
import homepage from './Middle component.png'
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
import App from "./App";
export default function App_over() {
  
  const [firstVisit,setfirstVisit] = useState(null);

  useEffect(() => {
    const firstVisit = JSON.parse(localStorage.getItem('firstVisit'));
    if(firstVisit){
      setfirstVisit(firstVisit)
    }
    console.log("GET")
    console.log("firstVisit")
    
  }, []);
  useEffect(() => {
    console.log("setfirstVisit")
    console.log(firstVisit)
    localStorage.setItem('firstVisit', JSON.parse(firstVisit));
  }, [firstVisit]);

  
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  // localStorage.setItem('user', JSON.stringify(user));
  

  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 767) {
      setMobileView(false);
    } else if (window.innerWidth < 767) {
      setMobileView(true);
    }
  }, []);

  if(mobileView == true){
    return (<>
    { 
      firstVisit === null ? (
        <div id="Entirety" className="h-screen w-screen" dir="rtl">
      <div className="w-full h-[65%] pt-[15%]">
        <img src={homepage}  className="object-contain bg-center h-full w-full"/>
        
      </div>
      <div id="text-cont" className="font-normal font-heebo text-white  text-center text-20 text-[40px] h-1/6 my-auto">
      <p >
      נועם עושה יוגה
      </p>
      <p>
      בתל-אביב
      </p>
      </div>
      <div id="entry_button" className=" text-center h-auto">
        <div className="font-light font-heebo text-[20px] my-[2%] py-[15px] h-[60px] bg-sky-blue w-5/6 mx-auto rounded-[40px] align-middle " onClick={()=>setfirstVisit(true)}>
        <>{console.log(firstVisit)}</>
        <p>
        מי טובה מאוד?
        </p>
        </div>
      </div>
      </div>
      ):(
        <App />
      )
    }
    </>
      
      
      
      
      
      
      
     
      
    );
  }else{
    return (
      <p>App has no desktop view. Please view this on a Mobile phone </p>
    );
  }
  
  
}