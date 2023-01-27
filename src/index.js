
import React,{useState}from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line
import "swiper/css/bundle";
import "./styles.css";
import App_over
 from "./App_over";
import App from "./App.jsx";

import { AuthProvider} from './context/AuthProvider'



ReactDOM.render(
    
   <div className="bg-lavander h-full" dir="rtl">
        <App_over />
        </div> 
        
    
 ,
document.getElementById("app")
);
  