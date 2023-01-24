import React from 'react';

const Slide = (schedule_json) => {
    var curr = new Date();

    const timeString = schedule_json.schedule_json.class_hour
    // Use the substring() function to extract hours and minutes
    const hours = timeString.substring(0,2);
    const minutes = timeString.substring(3,5);

    // Use the setHours() function to assign hours and minutes
    // to the "today" date object
    const classHour = new Date(curr.setHours(timeString))
    const classDate = new Date(schedule_json.schedule_json.class_date)
    console.log(timeString)
    console.log(hours);
    console.log(minutes);
    console.log(classHour);
    console.log(classDate)
           
    return (<>
        {
             classHour >= curr.getHours()+1  ? (
                <div className={curr < classHour || curr > classDate? "brightness-[50%] w-[100%] translate-y-[-20%] h-[60%] bg-white rounded-[30px] mt-[-10%] ":" w-[100%] translate-y-[-20%] h-[60%] bg-white rounded-[30px] mt-[-10%] " }>
        <div className='mt-[5%] h-[75%] w-[90%] mx-auto'>
            <img src={schedule_json.schedule_json.studio_logo} className="object-contain"></img>
        
        </div>
        <div className="w-[95%]  h-[auto] bg-regal-blue rounded-[30px] mx-auto mt-[2%]">
        <br></br>
            <div className='bg-lavander h-[50%] w-[95%] mx-auto '>
            <div className="text-right ">
                det 4
            </div>
            <div className="text-right">
                {schedule_json.schedule_json.class_hour}
                </div>
            <div className="text-right">
                det 2
                </div>
            <div className="text-right">
                det 1
            </div>

            </div>
            <br></br>
        </div>
        <div className='grid grid-cols-2 mt-[5%] gap-2'>
        <div className='bg-sky-blue h-[120%] rounded-[30px]' ><a  href={schedule_json.schedule_json.url}> website</a> </div>
        <div className='bg-sky-blue h-[120%] rounded-[30px]'  ><a  href={"tel:+"+schedule_json.schedule_json.phone_number}> phone </a></div>
        </div>
        
        </div> 
            ): <p></p>
        }
        
        
        
        
        </>
        
    );
}

export default Slide;