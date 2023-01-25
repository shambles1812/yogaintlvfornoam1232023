import React from 'react';
import CalendarDate from './CalendarDate';
import { useState,useRef,useContext,useEffect } from 'react';

import { SlideContext } from './context/SlideContext';
import axios from './api/axios';
const API_URL = 'test/api/yoga_date';
const Calendar = () => {
    const errRef = useRef()
    const [schedules,setSchedules] = useState("Init")
    const {slide_json,setSlideJson} = useContext(SlideContext)
    var curr = new Date; // get current date
    var curr_date = curr.getDate();
    var curr_month = ("0" + curr.getMonth()+1).slice(-2);
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).getDate();
    var lastday = new Date(curr.setDate(last)).getDate();
    // var week_array = Array.from({length: 7}, (_, i) => i + firstday)
    // const day_name = ["א","ב","ג","ד","ה","ו","ש"]
    const [chosenDate, setchosenDate] = useState(curr_date);
    useEffect(() => {
        const chosenDate = JSON.parse(localStorage.getItem('chosenDate'));
        if (chosenDate) {
           
            setchosenDate(chosenDate);
        }
      }, []);
      useEffect(() => {
        console.log(chosenDate)
        localStorage.setItem('chosenDate', JSON.stringify(chosenDate));
      }, [chosenDate]);
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
                    }).then(res => setSlideJson(res.data));
                  
                  
              } catch (err) {
                
                setSlideJson([])
                console.log("Empty Slide Json")
            }
        }
        fetch_data(date);
        
    }
    useEffect(() => {
        handleAPIReqDay(curr.getFullYear()+"-"+curr.getMonth()+1+"-"+chosenDate);
      }, []);
    var week_object = [
        
        {"name":"ש", "date":firstday+6},
        {"name":"ו", "date":firstday+5},
        {"name":"ה", "date":firstday+4},
        {"name":"ד", "date":firstday+3},
        {"name":"ג", "date":firstday+2},
        {"name":"ב", "date":firstday+1},
        {"name":"א", "date":firstday},
    ]
    
    return (
        <>
        <div className='text-center h-1/4 pt-[20px]'>
            
            {firstday}/{curr_month}-{lastday}/{curr_month}
        </div>
        <div className='grid grid-cols-7 gap-2 h-2/4 text-center pt-[20px] mx-[10px] text-white '>
            
            {
                week_object.map( (day => {
                    return(
                        <CalendarDate   day={day} 
                                        isActive={chosenDate === day.date? true : false }
                                        onShow={(date) => setchosenDate(date)}
                                        clickFunction={handleAPIReqDay}/>
                    );
                }))
            }
            
            
        </div>
        <div className='text-right pt-[20px] h-1/4 bg-lavander'>
        שיעורים היום:
        </div>
        </>
    );
}

export default Calendar;