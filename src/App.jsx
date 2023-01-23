import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components

import MobileView from './MobileView';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import "./index.css"


export default function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  
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
      <MobileView />
    );
  }else{
    return (
      <p>App has no desktop view. Please view this on a Mobile phone </p>
    );
  }
  
  
}