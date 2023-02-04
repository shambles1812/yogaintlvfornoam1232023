import React from 'react';
import location_svg from './location 1.svg';
import clock_svg from './clock 1.svg';
import yoga_svg from './yoga 1.svg';
import call_svg from './call.svg';
import world_svg from './world.svg';
const Slide = ({slideJson}) => {
    
    
    if(slideJson.status === "active"){

        return(
            <><div className={  (" w-[100%] translate-y-[-25%] h-[60%] bg-white rounded-[30px] mt-[-10%] shadow-xl")}>
            <div className='mt-[5%] h-[75%] w-[90%] mx-auto'>
                <img src={slideJson.schedule.studio_logo} className="!object-contain"></img>
            
            </div>
            <div className="w-[91%]  h-auto bg-white rounded-[18px]  mx-auto my-[8%] py-[2%] shadow-xl">
            
                
                <div className="font-bold text-[18px] text-right font-heebo pr-[5%] pt-[3%]">
                <p >
                    {" "+slideJson.schedule.class_name}</p>
                </div>
    
                <div className="font-light font-inter text-[16px] text-right pr-[5%] my-[1%] font-inter">
                <img src={clock_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
                </img>
                    {slideJson.schedule.class_end_hour === "null" ?(" "+slideJson.schedule.class_start_hour) :( " "+slideJson.schedule.class_start_hour+ " - " +slideJson.schedule.class_end_hour)}
                    </div>
                <span>
    
                </span>
                
                <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
                <p className='!inline'>
                <img src={yoga_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
                </img>
                {" "+slideJson.schedule.class_teacher}
                </p>
                </div>
    
            <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
                <p className='!inline'>
                <img src={location_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
                </img>
                {" "+slideJson.schedule.studio_address}
                </p>
                </div>
                
    
            </div>
            
            <div className='grid grid-cols-2 mt-[5%] gap-4'>
            <div className='bg-sky-blue pt-[10%] h-[135%] rounded-[30px] font-heebo'  ><a  href={"tel:+"+slideJson.schedule.phone_number}>
            <p>
            {"צלצלי "}
            <img src={call_svg} className="!inline s!object-contain !w-[20%]" >
                </img>
            </p>
            </a></div>
            
            <div className='bg-sky-blue pt-[10%] h-[135%] rounded-[30px] font-heebo'  ><a  href={slideJson.schedule.url}>
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
        )

    }else{

        return(
        <>
      
        <div id="image container"className={  (" w-[100%] translate-y-[-25%] h-[60%] bg-black/[75%] rounded-[30px] mt-[-10%] shadow-xl")}>
          <div className='mt-[5%] h-[75%] w-[90%] mx-auto'>
              <img src={slideJson.schedule.studio_logo} className="!object-contain"></img>
          
          </div>
          <div className="w-[91%]  h-auto bg-white rounded-[18px]  mx-auto my-[8%] py-[2%] shadow-xl">
          
              
              <div className="font-bold text-[18px] text-right font-heebo pr-[5%] pt-[3%]">
              <p >
                  {" לא נמצאו שיעורים"}</p>
              </div>

              

          <div className="text-right  pr-[5%] my-[1%] font-heebo text-[16px]">
              <p className='!inline'>
              <img src={location_svg} className="!inline s!object-contain !w-[10%] translate-y-[-4px]" >
              </img>
              {" "+slideJson.schedule.studio_address}
              </p>
              </div>
              

          </div>
          </div> 
        </>)
    }


}
// revamping
export default Slide;