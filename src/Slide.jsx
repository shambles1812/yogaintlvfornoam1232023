import React from 'react';
import location_svg from './location 1.svg';
import clock_svg from './clock 1.svg';
import yoga_svg from './yoga 1.svg';
import call_svg from './call.svg';
import world_svg from './world.svg';
const Slide = (schedule_json) => {
    
    var curr = new Date();

    const classStartHour_raw = schedule_json.schedule_json.class_start_hour
    var classStartHour = classStartHour_raw.split(":");
    // Use the substring() function to extract hours and minutes
    const hours = classStartHour[0];
    const minutes = classStartHour[1];
    
    // Use the setHours() function to assign hours and minutes
    // to the "today" date object
    
    
    var classDate = new Date(schedule_json.schedule_json.class_date)
    classDate.setHours(hours)
    classDate.setMinutes(minutes)
   

    return (<>
        
                <div className={ curr < classDate ? (" w-[100%] translate-y-[-25%] h-[60%] bg-white rounded-[30px] mt-[-10%] shadow-xl"):(" w-[100%] translate-y-[-25%] h-[60%] bg-slide-black/[60%] rounded-[30px] mt-[-10%] shadow-xl")}>
        <div className='mt-[5%] h-[75%] w-[90%] mx-auto'>
            <img src={schedule_json.schedule_json.studio_logo} className="!object-contain"></img>
        
        </div>
        <div className="w-[91%]  h-auto bg-white rounded-[18px]  mx-auto my-[8%] py-[2%] shadow-xl">
        
            
            <div className="font-bold text-[18px] text-right font-heebo pr-[5%] pt-[3%]">
            <p >
                {" "+schedule_json.schedule_json.class_name}</p>
            </div>

            <div className="font-light font-inter text-[16px] text-right pr-[5%] my-[1%] font-inter">
            <img src={clock_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
            </img>
                {schedule_json.schedule_json.class_end_hour === "null" ?(" "+schedule_json.schedule_json.class_start_hour) :( " "+schedule_json.schedule_json.class_start_hour+ " - " +schedule_json.schedule_json.class_end_hour)}
                </div>
            <span>

            </span>
            
            <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
            <p className='!inline'>
            <img src={yoga_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
            </img>
            {" "+schedule_json.schedule_json.class_teacher}
            </p>
            </div>

        <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
            <p className='!inline'>
            <img src={location_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
            </img>
            {" "+schedule_json.schedule_json.studio_address}
            </p>
            </div>
            

        </div>
        
        <div className='grid grid-cols-2 mt-[5%] gap-4'>
        <div className='bg-sky-blue pt-[10%] h-[135%] rounded-[30px] font-heebo'  ><a  href={"tel:+"+schedule_json.schedule_json.phone_number}>
        <p>
        {"צלצלי "}
        <img src={call_svg} className="!inline s!object-contain !w-[20%]" >
            </img>
        </p>
        </a></div>
        
        <div className='bg-sky-blue pt-[10%] h-[135%] rounded-[30px] font-heebo'  ><a  href={schedule_json.schedule_json.url}>
        <p>
        {"לאתר "}
        <img src={world_svg} className="!inline s!object-contain !w-[20%]" > 
            </img>
        </p>
        </a></div>
       
        </div>
        
        </div> 
             <p></p>
        
        
        
        
        
        </>
        
    );
}
// revamping
export default Slide;