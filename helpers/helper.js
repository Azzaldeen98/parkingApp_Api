
import fs from 'fs';
import TimeVerificationProcess from '../enums/TimeVerificationProcess.js';
// const TimeVerificationProcess = require('../enums/TimeVerificationProcess.js');

const currentTime = new Date();
const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
const myTime = currentTime.toLocaleString('en-US', timeOptions);

export default class Helper{
    

    constructor() {
   
    }



    readFileJSON(path)
    {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
          
            try 
            {
              // Parse the JSON data
              return JSON.parse(data)??null;
        
            }
             catch (error) {
              console.error('Error parsing JSON:', error);
            }
          });

    }

    getCurrentDateAsString(){

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with leading zero if necessary
        const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with leading zero if necessary

        const hours = String(currentDate.getHours()).padStart(2, '0'); // Pad with leading zero if necessary
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Pad with leading zero if necessary
        const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Pad with leading zero if necessary

        const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        // console.log(dateString);

        return dateString;

    }
    
    getHouresAndMinutes(timeString)
    {
        const [time, meridiem] = timeString.split(' ');
        const [hours, minutes] = time.split(':');
        return [parseInt(hours),  parseInt(minutes),meridiem];
    }

        /**
     * Adds two numbers and returns the result.
     * @param {TimeVerificationProcess} typeOption - The first number.
     * @param {String} reservationTime - The second number.
     * @param {number}  minDiff - The sum of the two numbers.
     */
    checkFromReservationTime(reservationTime,typeOption,minDiff=30) {
        
        // console.log(reservationTime);

        if(reservationTime==undefined || typeOption == undefined )
                         return;
        
        // الحصول على الوقت الحالي
        const currentTime = new Date();
      
    
        // تحويل وقت الحجز إلى كائن Date
        let [time, period] = reservationTime.split(' ');
        let [hours, minutes] = time.split(':');
        let parsedHours = parseInt(hours, 10);
      


        if(period==undefined)
            return;

        // تحويل الساعات إلى نظام 24 ساعة إذا كانت الفترة صباحًا (AM)
        if (period.trim().toLowerCase() === 'am' && parsedHours === 12) {
            hours = '0';
        }
        // تحويل الساعات إلى نظام 24 ساعة إذا كانت الفترة مساءً (PM) وليست الساعة 12
        else if (period.trim().toLowerCase() === 'pm' && parsedHours !== 12) {
          hours = (parsedHours + 12).toString();
        //   console.log(hours+"\n")
        }
    
    
        const endTime = new Date();
        endTime.setHours(hours.trim());
        endTime.setMinutes(minutes.trim());
        endTime.setSeconds(0);
    
    
      
        if(typeOption==TimeVerificationProcess.EndTemporaryTime)
        {
             // حساب الفاصل الزمني بين الوقت الحالي ووقت الحجز  المؤقت بالمللي ثانية
             const timeDiff = currentTime.getTime()-endTime.getTime();
             // التحقق مما إذا كانت الوقت الحلي  اكبر من  الوقت المحدد   بفترة زمنية محدد مللي ثانية)
            return timeDiff > minDiff * 60 * 1000;
        }
        else if(typeOption==TimeVerificationProcess.TimeExpires) // التحقق من انتهاء وقت الحجز
            return currentTime > endTime;

       else if(typeOption==TimeVerificationProcess.EndTimeApproaching)
        {
             // حساب الفاصل الزمني بين الوقت الحالي ووقت الحجز بالمللي ثانية
            const timeDiff = endTime.getTime() - currentTime.getTime();
            // التحقق مما إذا كانت الفترة المتبقية أقل من أو تساوي 30 دقيقة (30 * 60 * 1000 مللي ثانية)

            // halfMint=minDiff * 60 * 1000;
            return timeDiff <= minDiff * 60 * 1000 ;
        }
       
    
          return false;
      
    }
    
    isHalfHourRemaining(endTime) 
    {
    
        return this.checkFromReservationTime(endTime,TimeVerificationProcess.EndTimeApproaching,30);
    
    }

    isEndTemporaryTime(time) 
    {
    
        return this.checkFromReservationTime(time,TimeVerificationProcess.EndTemporaryTime,2);
    
    }
    
    isReservationExpired(endTime) {
    
        return this.checkFromReservationTime(endTime,TimeVerificationProcess.TimeExpires);
    
    }


}