

import  BookingStatus from "../enums/BookingStatus.js";
import  ParkingStatus  from "../enums/ParkingStatus.js";
import  NotifictionType  from "../enums/NotifictionType.js";
import  NotifictionController  from "../Controllers/NotifictionController.js";
import  TimeVerificationProcess  from "../enums/TimeVerificationProcess.js";
import  Helper  from "../helpers/helper.js";
import  firebaseResources   from "../server.js";
const helper=new Helper();


export default class Monitor 
{


    constructor(){
      this.notify=new  NotifictionController();
    }
   

    startTimer(interval=5000)
    {
        setInterval(this.listenRealTimeDatabase,interval);
        setInterval(this.checkTemporaryReservationPeriod,interval);
    };
    

    checkTemporaryReservationPeriod() 
    {
        const ref = firebaseResources.BookingTemp;
        ref.once('value')
        .then((snapshot) => 
        {
            snapshot.forEach((childSnapshot) => 
            {
                const childData = childSnapshot.val();
                if(childData !=null ) 
                    if(childData.startTimeBookingTemp!="" && helper.isEndTemporaryTime(childData.startTimeBookingTemp,TimeVerificationProcess.EndTemporaryTime))
                    {   
                        let refSpot=firebaseResources.Spots.child(childSnapshot.key);
                        refSpot.child('status').get().then(snapshot=>{
                            if (snapshot.exists()) 
                            {
                                const status = snapshot.val();
                                if(status==ParkingStatus.TemporarilyReserved)
                                {
                                    refSpot.child("status").set(ParkingStatus.Available).then(async() => 
                                        {
                                            console.log('update Parking  status  successfully.')
                                            const body="!! تم الغاء طلب الحجز بعد قبولك   مباشرة لحجز اقرب موقف تم اقتراحه لك  يرجى اعادة المحاولة وتحديد مدة الحجز  وتاكيده خلال  دقيقة واحدة فقط من قبول اشعار الموقف الاقرب ولا سيتم الغاء العلية وشكرا    !";
                                            await (new  NotifictionController()).sendNotifiyMessage('شــاغر',body,childData.userId,NotifictionType.EndTemporaryVirtualBooking);
                                            firebaseResources.BookingTemp.child(childSnapshot.key).remove().then(() => console.log('delete booking temp is  successfully.')).catch((error) => console.error('Error  :', error));
                                        
                                        }).catch((error) => console.error('Error update  data:', error));
                                }
                                
                                // console.log(status);
                            } 
                            else 
                            {
                              console.log("Status not found for the child");
                            }
                          })
                          .catch(error=>{
                            console.error('Error retrieving status:', error);
                          });
                    }
            });
        },
        (error) =>
        {
            console.error('Error fetching data:', error);

        })

    }

    listenRealTimeDatabase() 
    {
        const ref =  firebaseResources.Bookings;
        ref.once('value')
        .then((snapshot) => 
        {
            snapshot.forEach((childSnapshot) => 
            {
                 

                /**
                 * Notifying the user when end time is reached 
                 */

                const childData = childSnapshot.val();
                // console.log(childData);
                if(childData.status && childData.notifiy<BookingStatus.Finished)
                    if(helper.isReservationExpired(childData.endTime))
                    {
                        console.log("!! Reservation Expired");
       
                        childData.notifiy=BookingStatus.Finished;
                        childData.status=false;

                        ref.child(childSnapshot.key).set(childData).then(() => console.log('update data  successfully.')).catch((error) => console.error('Error update  data:', error));

                            firebaseResources.Spots.child(childData.spotId).child("status").set(ParkingStatus.Available).
                            then(async() =>
                            {
                                console.log('update Spots  data  successfully.',childData.spotId)
                                const body="!! انتهاء وقت  الحجز";
                                await (new  NotifictionController()).sendNotifiyMessage('شــاغر',body, childData.userId,NotifictionType.FinishedBooking );
                          

                            }).catch((error) => console.error('Error update  data:', error));

                    }
                    else if(childData.notifiy==BookingStatus.Natural &&  helper.isHalfHourRemaining(childData.endTime))
                    {   
                        /**
                         * Notifying the user half an hour before the end of the reservation time 
                         */
                            
                        console.log("!! Half Hour Remaining");
                        childData.notifiy=BookingStatus.AlmostFinished;
                        ref.child(childSnapshot.key).set(childData).then(async() => 
                        {
                            console.log('update data  successfully.')
                            const body="!!  لقد شارف وقت الحجز على الانتهاء الرجاء تمديد الحجز او الاستعداد لاخلاء موقف السيارة خلال النصف ساعة المتبقية!!";
                            await (new  NotifictionController()).sendNotifiyMessage('شــاغر',body, childData.userId,NotifictionType.EndBookingTimeApproaching);
                        
                        }).catch((error) => console.error('Error update  data:', error));
                    }
            });
        },
        (error) =>
        {
            console.error('Error fetching data:', error);

        })

    }

}