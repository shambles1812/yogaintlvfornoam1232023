import React, { useEffect, useRef, useState, useContext} from "react";
import axios from './api/axios';
import MobileView from "./MobileView";
import spinner from "./spinner.gif"
const API_URL = 'test/api/yoga_date';

const LoadingView = () => {
   
    const curr = new Date()
    var curr_date = curr.getFullYear()+"-"+curr.getMonth()+1+"-"+curr.getDate()
    var timeoutFetch = null
    const handleAPIReqDay = (date) => {
    
      const fetch_data = async(e) => {
          try { 
         
              const response = await axios.get(API_URL, 
                  {params:{
                    "date":date
                  }},
                  {
                    headers: { 'Content-type': 'application/json'},
                    withCredentials:true
                  }).then(
                    () => {
                      setFetching(false)
                      localStorage.setItem('fetching',JSON.stringify(false))
               
                      console.log("Success")
                      console.log(fetching)
                    }
                  );
                
                
            } catch (err) {
              console.log("Fetching Error")
              
          }
      }
      fetch_data(date);
      
  }
  
    for (var i = 0; i < 30; i++) {
      setTimeout(function() {
        handleAPIReqDay(curr_date)
        console.log(i)
      }, i * 1000);
    }
    const [fetching,setFetching] = useState(null);
    

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
    return (
        <>
        <div className="z-10 h-screen w-screen absolute bg-black/[0.6]">
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