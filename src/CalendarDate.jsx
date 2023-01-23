import React from 'react';
import {useState} from 'react';
const CalendarDate = ({day,isActive,onShow}) => {
    // const [isActive, setIsActive] = useState(false);
    
    return(
        <div className={isActive ? 'day bg-black rounded-[100px]':'day rounded-[100px]'} onClick={() => onShow(day.date)}>
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