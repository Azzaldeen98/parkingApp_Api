
import  model   from "../models/BookingTemp.js";
import  firebaseResources   from "../server.js";
export default class UserController{
    
    
    constructor(db) {
      this.db = db;
    }


    store(booking)
    {
        const ref =  this.db.ref('Bookings');
        ref.push(booking).then(() => {
            console.log('Data added successfully.');
            })
            .catch((error) => {
            console.error('Error adding data:', error);
            });
    }







}