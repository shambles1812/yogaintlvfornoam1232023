import React from 'react';
import CalendarDate from './CalendarDate';
import { useState,useRef,useContext,useEffect } from 'react';

import { SlideContext } from './context/SlideContext';
import axios from './api/axios';

const API_URL = 'test/api/yoga_date';

const Calendar = ({setFetching,setMobileDate,mobileDate,setMobileHour,mobileHour,firstRequest,setFirstRequest}) => {
    
    
    const {slide_json,setSlideJson} = useContext(SlideContext)
    const [fetching,setCalendarFetching] = useState(false);

    useEffect(() => {
        const fetching = JSON.parse(localStorage.getItem('fetching'));
        if (fetching) {
        setFetching(fetching);
        console.log("Fetching by first calendar render function")
        console.log(fetching)
        }
    },[])

    useEffect(() => {
        localStorage.setItem('fetching', JSON.stringify(fetching));
        // setFetching(fetching)
    },[fetching])
    const curr = new Date; // get current date
    var curr_date = curr.getDate();
    var curr_hour = curr.getHours()
    
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first))
    // var firstday = new Date(curr.setDate(first)).getDate();

    // const secondday = new Date(firstday);
    // secondday.setDate(secondday.getDate())
    // if(curr_date > secondday.getDate()){
    //     secondday.setMonth(curr.getMonth()+1)
    // }
    const secondday = new Date(curr);
    secondday.setDate(secondday.getDate() +1)
    if(curr_date - 7 > secondday.getDate()){
        secondday.setMonth(curr.getMonth()+1)
    }

    const thirdday = new Date(curr);
    thirdday.setDate(thirdday.getDate() +2)
    if(curr_date - 7 > thirdday.getDate()){
        thirdday.setMonth(curr.getMonth()+1)
    }

    const fourthday = new Date(curr);
    fourthday.setDate(fourthday.getDate() +3)
    if(curr_date - 7 > fourthday.getDate()){
        fourthday.setMonth(curr.getMonth()+1)
    }

    const fifthday = new Date(curr);
    fifthday.setDate(fifthday.getDate() +4)
    if(curr_date - 7 > fifthday.getDate()){
        fifthday.setMonth(curr.getMonth()+1)
    }

    const sixthday = new Date(curr);
    sixthday.setDate(sixthday.getDate() +5)
    if(curr_date - 7 > sixthday.getDate()){
        sixthday.setMonth(curr.getMonth()+1)
    }

    const seventhday = new Date(curr);
    seventhday.setDate(seventhday.getDate() +6)
    if(curr_date - 7 > seventhday.getDate()){
        
        seventhday.setMonth(curr.getMonth()+1)
        
    }

    var calendar_firstday_month = firstday.getMonth()+1
    if( calendar_firstday_month < 10){
        calendar_firstday_month = "0" + calendar_firstday_month
    }
    var calendar_firstday = firstday.getDate()
    if( calendar_firstday < 10){
        calendar_firstday = "0" + calendar_firstday
    }
    var calendar_seventhday_month = seventhday.getMonth()+1
    if( calendar_seventhday_month < 10){
        calendar_seventhday_month = "0" + calendar_seventhday_month
    }
    var calendar_seventhday = seventhday.getDate()
    if( calendar_seventhday < 10){
        calendar_seventhday = "0" + calendar_seventhday
    }
    // var week_array = Array.from({length: 7}, (_, i) => i + firstday)
    // const day_name = ["??","??","??","??","??","??","??"]
    // const [chosenDate, setchosenDate] = useState(curr_date);
    // useEffect(() => {
    //     // const chosenDate = JSON.parse(localStorage.getItem('chosenDate'));
    //     console.log("I'm setting the chosen date from calendar")
    //     console.log(chosenDate)
    //     localStorage.setItem('chosenDate', JSON.stringify(chosenDate));
        
    //   }, []);
    const redirect = (day) =>{
        console.log("redirected")
        console.log(day)
        setMobileDate(day)
        localStorage.setItem('chosenDate', JSON.stringify(day));
        // setchosenDate(day)
    }
    //   useEffect(() => {
    //     console.log("Use effect 45 in Calendar")
    //     console.log(chosenDate)
    //     // localStorage.setItem('chosenDate', JSON.stringify(chosenDate));
    //   }, [chosenDate]);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleAPIReqDay = (date) => {
        setFetching(true);
        const fetch_data = async(e) => {
            try { 
           
                const response = await axios.get(API_URL, 
                    {params:{
                      "date":date
                    }},
                    {
                      headers: { 'Content-type': 'application/json'},
                      withCredentials:true
                    }).then(res => {
                        setSlideJson(res.data);
                        var my_array = res.data
                         my_array.sort(
                            (a,b) => {
                                var a_date = new Date(a.class_date);
                                a_date.setHours(a.class_start_hour.split(":")[0])
                                a_date.setMinutes(a.class_start_hour.split(":")[1])

                                var b_date = new Date(b.class_date);
                                b_date.setHours(b.class_start_hour.split(":")[0])
                                b_date.setMinutes(b.class_start_hour.split(":")[1])

                                return a_date - b_date   
                            }
                        )
                        
                        console.log("ARRAY DATE")
                        var slide_date = my_array[0].class_date.split("-")[2]
                        
                        const new_hour = my_array[0].class_start_hour.split(":")[0]
                        
                        console.log(slide_date)
                        if(parseInt(slide_date) < 10){
                            console.log("TOMORROW")
                            var tomorrow = my_array[0].class_date.split("-")[0] + "-" + my_array[0].class_date.split("-")[1] + "-0" + (parseInt(slide_date)+1)
                            console.log(tomorrow)
                        }else{
                            var tomorrow = my_array[0].class_date.split("-")[0] + "-" + my_array[0].class_date.split("-")[1] + "-" + (parseInt(slide_date)+1)
                        
                        }
                        
                        var dayNow = new Date;
                        var hourNow = dayNow.getHours()
                        var dateNow = dayNow.getDate()
                        console.log("SORTED DATA")
                        if(parseInt(slide_date) === dateNow ){

                            var mobileHour = parseInt(new_hour)
                            console.log("Setting slide to first available schedule for current day")
                            my_array.every(schedule=>{
                                const classStartHour_raw = schedule.class_start_hour
                                var classStartHour = classStartHour_raw.split(":");
                                
                                const hours = classStartHour[0];
                                
                                console.log("CLASS HOUR" + hours)
                
                                console.log("CURR HOUR" + curr_hour)
                                if(parseInt(hours) >= hourNow){
                                    
                                    mobileHour = parseInt(hours)
                                    return false;
                                }else{
                                    
                                    if(firstRequest && !(dayNow.getDay() === 6)){
                                  
                                        //SPECIAL CASE IF THERE'S NO CLASS AVAILABLE TODAY RENDER TOMORROW 
                                        //BUT TODAY MUST NOT BE SATURDAY
                                        //FIRST REQUEST ON THE API UPON LOGIN
                                        console.log("I AM CALLED AGAIN")
                                        setMobileDate(parseInt(slide_date)+1)
                                        setTimeout(handleAPIReqDay(tomorrow),3000)
                                        setFirstRequest(false)
                                        return false;
                                    }
                                    return true;
                                }
                            })
                            console.log("SETTING MOBILE HOUR")
                            console.log(0)
                            setMobileHour(mobileHour)
                            setFetching(false)
                        }else{
                            console.log("Setting slide to first available hour for the day")
                            setMobileHour(parseInt(new_hour))
                            setFetching(false)
                        }


                        // console.log("Setting slide to first available hour for the day")
                        // setMobileHour(parseInt(new_hour))
                        
            
                        // console.log("HERE SORTED")
                        // console.log(new_array)
                        setFirstRequest(false)
                        setFetching(false)
                    });
                  
                  
              } catch (err) {
                await delay(15000)
                handleAPIReqDay(date)
                setFetching(true)
                console.log("Still Requesting")
                // setSlideJson([])
                // console.log("Empty Slide Json")
            }
        }
        fetch_data(date);
        
    }
    useEffect(() => {
        var date_now = new Date
        console.log(date_now)
       
        var first_time_api_date = mobileDate
        if (first_time_api_date < 10){
            first_time_api_date = "0"+first_time_api_date
        }
        var first_time_api_month = date_now.getMonth()+1
        if (first_time_api_month < 10){
            first_time_api_month = "0"+first_time_api_month
        }
            
        console.log("USE EFFECT CALENDAR")
        console.log(date_now.getFullYear()+"-"+first_time_api_month+"-"+first_time_api_date)
        handleAPIReqDay(date_now.getFullYear()+"-"+first_time_api_month+"-"+first_time_api_date);
      }, []);

    
    var week_object = [
        {"name":"??", "date":firstday.getDate(),"month":firstday.getMonth(),},
        {"name":"??", "date":secondday.getDate(),"month":secondday.getMonth(),},
        {"name":"??", "date":thirdday.getDate(),"month":thirdday.getMonth(),},
        {"name":"??", "date":fourthday.getDate(),"month":fourthday.getMonth(),},
        {"name":"??", "date":fifthday.getDate(),"month":fifthday.getMonth(),},
        {"name":"??", "date":sixthday.getDate(),"month":sixthday.getMonth(),},
        {"name":"??", "date":seventhday.getDate(),"month":seventhday.getMonth(),},
        
    ]
    
    return (
        <>
        <div className='text-center h-1/6 pt-[25px] text-[18px] font-bold font-inter'>
            
        {calendar_seventhday}/{calendar_seventhday_month}-{calendar_firstday}/{calendar_firstday_month}
        </div>
        <div className='grid grid-cols-7 gap-2 2/4 font-bold font-inter text-center pt-[20px] mx-[10px] text-white font-inter'>
            
            {
                week_object.map((day,index)  => {
                    return(
                        <CalendarDate   day={day} 
                                        isActive={mobileDate === day.date? true : false }
                                        onShow={(date) => redirect(date)}
                                        clickFunction={handleAPIReqDay}
                                        key={index}/>
                    );
                })
            }
            
            
        </div>
        <div className='text-right pt-[15px] h-1/7 bg-lavander  font-bold text-[24px] pr-[25px] font-heebo'>
        ?????????????? ????????:
        </div>
        </>
    );
}

export default Calendar;