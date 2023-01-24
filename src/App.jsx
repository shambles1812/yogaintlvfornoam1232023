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

import "./styles.css";
import "./index.css"


export default function App() {
  
  const [user,setUser] = useState('None');
  const [slide_json,setSlideJson] = useState([])
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
 
  
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 767) {
      setMobileView(false);
    } else if (window.innerWidth < 767) {
      setMobileView(true);
    }
  }, []);
  console.log("USERR")
  console.log(user)
  if(mobileView == true){
    return (
      <>

      <UserContext.Provider value={{user,setUser}}>
        {
          user === "None" ? (<LoginView />)  : 
          (
          <SlideContext.Provider value={{slide_json,setSlideJson}}>
            <MobileView/>
          </SlideContext.Provider>
          
          )
        }
      </UserContext.Provider>
      
      </>
     
      
    );
  }else{
    return (
      <p>App has no desktop view. Please view this on a Mobile phone </p>
    );
  }
  
  
}