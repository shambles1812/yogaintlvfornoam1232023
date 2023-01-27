import React from 'react';
import {useState} from 'react';
const CalendarDate = ({day,isActive,onShow,clickFunction}) => {
    // const [isActive, setIsActive] = useState(false);
    const assignActive = (e) =>{
        var curr = new Date;
        var calendar_day = new Date(curr.setDate(day.date))
        onShow(day.date);
        clickFunction((calendar_day.getFullYear()+"-"+calendar_day.getMonth()+1)+"-"+calendar_day.getDate());
    }
    
    return(
        <div className={isActive ? 'day bg-black rounded-[100px] font-extralight text-[20px]':'font-extralight text-[20px] day rounded-[100px]'} onClick={assignActive}>
                        <div className='h-[80px] pt-[5px] '>
                            <div className= {isActive ? '  w-[35px] h-[35px] pt-[2px] bg-white font-normal rounded-full text-black m-auto mt-[5px]': 'w-[30px] h-[30px] rounded-full pt-[2px]  m-auto mt-[5px]'}>
                                {day.date}
                                
                            </div>
                            
                        </div>
                        <div className='font-heebo pb-[5px]'>
                            {day.name}  
                            
                        </div>
                    </div>
    );
}

export default CalendarDate;