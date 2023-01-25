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

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function App() {
  
  const [user,setUser] = useState(null);

  const [slide_json,setSlideJson] = useState([])
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  // localStorage.setItem('user', JSON.stringify(user));
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUser(user)
    }
    console.log("GET")
    console.log("User")
    
  }, []);
  useEffect(() => {
    console.log("setUser")
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 767) {
      setMobileView(false);
    } else if (window.innerWidth < 767) {
      setMobileView(true);
    }
  }, []);

  if(mobileView == true){
    return (
      <>
      
         
      <UserContext.Provider value={{user,setUser}}>
        
      
        {
          user === null ? (<LoginView />)  : (
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