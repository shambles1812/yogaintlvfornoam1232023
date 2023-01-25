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
        <div className={isActive ? 'day bg-black rounded-[100px]':'day rounded-[100px]'} onClick={assignActive}>
                        <div className='h-[70px]  '>
                            <div className= {isActive ? '  w-[30px] h-[30px] bg-white rounded-full text-black m-auto mt-[5px]': 'w-[30px] h-[30px] rounded-full  m-auto mt-[5px]'}>
                                {day.date}
                                
                            </div>
                            
                        </div>
                        <div>
                            {day.name}  
                            
                        </div>
                    </div>
    );
}

export default CalendarDate;