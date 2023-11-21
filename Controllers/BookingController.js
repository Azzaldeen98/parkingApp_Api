import  model   from "../models/Booking.js";
import  firebaseResources   from "../index.js";
import  ParkingStatus  from "../enums/ParkingStatus.js";
import  NotifictionType  from "../enums/NotifictionType.js";
import  NotifictionController  from "../Controllers/NotifictionController.js";

export default class BookingController{
    
    
    constructor(db) {
      this.db = db;
    }


    async store(booking)
    {
        const ref =  firebaseResources.Bookings;
        ref.push(booking).then(() => {
            console.log('Data added successfully.');
            })
            .catch((error) => {
            console.error('Error adding data:', error);
            });
    }

    async delete(user_id)
    {
      
      const ref =  firebaseResources.Bookings;
      ref.orderByChild("userId").equalTo(user_id).once('value')
      .then((snapshot) => 
      {
          snapshot.forEach((childSnapshot) => 
          {
            
            const item = childSnapshot.val();
            if(item.status==true)
            {
              firebaseResources.Spots.child(item.spotId).child("status").set(ParkingStatus.Available).
              then(async() =>
              {
                  console.log('update Spots  data  successfully.',item.spotId)
                  const body="!! تم انهاء الحجز";
                  await (new  NotifictionController()).sendNotifiyMessage('شــاغر',body, item.userId,NotifictionType.FinishedBooking );
            

              }).catch((error) => console.error('Error update  data:', error));

            }
          });

        });
    }

    getBooking(user_id)
    {
      

    
    }







}
