

import express from 'express';
import bodyParser from 'body-parser';
import http   from 'http';
const app = express();

//===================================================

import {Server} from 'socket.io';
const server = http.createServer(app);
const io= new Server().listen(server);
//===================================================

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//===================================================
const PORT = 8080 || process.env.PORT;


import admin  from "firebase-admin";
import  credentials from 'serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential:admin.credential.cert(credentials),
    databaseURL: 'https://parkingapp-b8c80-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const db=admin.database();

// import  firebaseResources   from "./config/firebaseConnection.js";
const firebaseResources={ 
        admin,
        Spots:db.ref("Spots"),
        Bookings:db.ref("Bookings"),
        ParkingGroups:db.ref("ParkingGroups"),
        Users:db.ref("Users"),
        BookingTemp:db.ref("BookingTemp"),
        Notifictions:db.ref("Notifictions"),
         }

export default firebaseResources;


//// ===================================================
// import Monitor from "./src/Monitor.js";
// import SpotController from './Controllers/SpotController.js';
// import Spot from './models/Spot.js';
// import ParkingStatus from './enums/ParkingStatus.js';
// import NotifictionType from './enums/NotifictionType.js';
// import Roles from './enums/Roles.js';
// import AuthController from './Controllers/AuthController.js';
// import TrackingUserLocationController from './Controllers/TrackingUserLocationController.js';
// import NotifictionController from './Controllers/NotifictionController.js';
// import BookingController from './Controllers/BookingController.js';
// import Notifiction from './models/Notifiction.js';
// import Helper from './helpers/helper.js';
// import  LocationUserState  from "./enums/LocationUserState.js";

//===================================================


// iU7MOAQpkjWHi6YbGo0eZP2sEFg2

//===================================================

// new Monitor().startTimer();

    // await new SpotController().setCoordinatesForAllSpots();

// new SpotController().releaseAllSpots();

// new AuthController().getUsersWithRole(Roles.User);



//  new NotifictionController().sendNotifiyMessage("Shager","Test Message","general",NotifictionType.General);
// new NotifictionController().sendNotifiyMessage("Shager","Test Message","mn6V5KDVzKah8xZjHv3euo6RoNd2",NotifictionType.General);

// new Helper().getCurrentDateAsString()


// app.get('/', (req, res) => {

//     res.send('Chat Server is running on port 8080')
//     });


//     io.on('connection', (socket) => 
//     {
    

        
//     console.log('user connected')
    
//     socket.on('join', function(userNickname) {
    
//             console.log(userNickname +" : has joined the chat "  );
    
//             socket.broadcast.emit('userjoinedthechat',userNickname +" : has   joined the chat ");
//         })
    
    
//     socket.on('messagedetection', (senderNickname,messageContent) => {
           
//            //log the message in console 
    
//            console.log(senderNickname+" : " +messageContent)
           
//           //create a message object 
          
//           let  message = {"message":messageContent, 
//                           "senderNickname":senderNickname}
            
//     // send the message to all users including the sender  using io.emit  
           
//           io.emit('message', message )
         
//           })
    
//          socket.on('disconnect', function() {
    
//             console.log(userNickname +' has left ')
    
//             socket.broadcast.emit( "userdisconnect" ,' user has left')
    
            
          
    
//         })
    
    
    
    
//     })

// 

// new AuthController().setCustomRole("iU7MOAQpkjWHi6YbGo0eZP2sEFg2",Roles.Admin);

// for(var i=0;i<32;i++) 
// {

    // var i=34;
    // new SpotController().store(new Spot({index:i,name:"spotttttt"+i,groupId:"-NfhL270-1NEFqiYoVN3",coordinates:{latitude:42.454549,
    //      longitude:(32.123458+(i/100))},status:ParkingStatus.Available}));
// }
// 




// 

app.get('/', async (req, res) => {
    
  res.send("Parking App Server connection is successful i am Azzaldeen");
});


// app.get('/',async(req,res)=>{


    
//     res.status(200).json("Parking App Server connection is successfully ");
   
// });


// app.post('/setUserRole',async(req,res)=>{

//     console.log(req.body);
//     try
//     {
//         new AuthController().setCustomRole(req.body.uId,Roles.User);
        
       
//         res.status(200).json("successfully");
    
//     }catch(err)
//     {
//         console.log(err.message);
//         res.json({"error":err.message});
//     }

// });

// app.get('/getUserLocationState/',async(req,res)=>{


//     // console.log(req.query);
//     var userLoc={
//         userId:req.query.userId,
//         location:{
//             x:req.query.latitude,
//             y:req.query.longitude
//         },
//     }

    
//     try
//     {
      
//        let response= await new TrackingUserLocationController().getLocationState(userLoc.location);
//        if(response==LocationUserState.Outside)
//        {

//             await new BookingController().delete(userLoc.userId);
        
//             var user_Id=await new AuthController().getUsersWithRole(Roles.Admin);
//             if(user_Id.length>1)
//             {
//                 for(var i=0;i<user_Id.length;i++)
//                 {
//                     var notify=new Notifiction();
//                     notify.title="مغادرة الجامعة";
//                     notify.body="المستخدم الحالي غادر  الجامعة قبل انتهاء موعد الحجز  !!";
//                     notify.topic=user_Id[i];
//                     notify.type=NotifictionType.Admin;
//                     await new NotifictionController().store(notify);
//                 }
//             }
//             console.log(user_Id);
            
//        }

//        res.status(200).json(response);
    
//     }catch(err)
//     {
//         console.log(err.message);
//         res.json({"error":err.message});
//     }

// });


// app.post('/signUp',async(req,res)=>{


 

//     console.log(req.body);
//     try 
//     {

//         new AuthController().setCustomRole(req.body.userId,req.body.role);
//         res.status(200).json('userResponse');
    
//     }catch(err)
//     {
//         console.log(err.message);
//         res.json({"error":err.message});
//     }

   
// });





// console.log("Azzaldeen");




// app.post('/login',async(req,res)=>{

//     console.log(req.body);
//     try
//     {

//         const user={
//             email:req.body.email,
//             password:req.body.password,
//         }
//         const userResponse=await admin.auth().({
//             email:user.email,
//             password:user.password,
//             emailVerified:false,
//             disabled:false
//          });

//         console.log(userResponse);
//         res.json(userResponse);
    
//     }catch(err)
//     {

//         console.log(err.message);
//         res.json({"error":err.message});
//     }

   
// })



//================================================================


app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
  })


