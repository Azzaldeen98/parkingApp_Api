
import admin  from "firebase-admin";
import  credentials from '../serviceAccountKey.json' assert { type: 'json' };




admin.initializeApp({
    credential:admin.credential.cert(credentials),
    databaseURL: 'https://parkingapp-b8c80-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const db=admin.database();

 
 export default {
        admin,
        Spots:db.ref("Spots"),
        Bookings:db.ref("Bookings"),
        ParkingGroups:db.ref("ParkingGroups"),
        Users:db.ref("Users"),
        BookingTemp:db.ref("BookingTemp"),
        Notifictions:db.ref("Notifictions"),
    
}
// export default  {sd:admin,db}