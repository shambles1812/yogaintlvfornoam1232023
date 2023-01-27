import React, { useEffect, useRef, useState, useContext} from "react";
import axios from './api/axios';
import MobileView from "./MobileView";
import spinner from "./spinner.gif"
const API_URL = 'test/api/yoga_date';

const LoadingView = () => {
    return (
        <>
        <div className="z-10 h-screen w-screen absolute bg-white/[0.6]">
          <div className="center w-[80%] mt-[20%]">
            <img src={spinner}></img>
          </div>
          <div id="loading-text" className="text-center mt-[20%] text-[24px] w-[60%] mx-auto font-bold font-heebo" >
            <p>
            מחפש לך שיעורים... בינתיים לולה

            </p>
          </div>
        </div>
        </>
      );
}

export default LoadingView;