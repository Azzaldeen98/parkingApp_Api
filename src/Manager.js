


// module.exports= class ParkingGroupControll {


//     constructor() {
   
//       }


      



//         getAllUsers()
//       {
//           const listAllUsers = (nextPageToken) => {
//               // List batch of users, 1000 at a time.
//               admin.auth()
//                 .listUsers(1000, nextPageToken)
//                 .then((listUsersResult) => {
//                   listUsersResult.users.forEach((userRecord) => {
//                     console.log('user', userRecord.toJSON());
//                   });
//                   if (listUsersResult.pageToken) {
//                     // List next batch of users.
//                     listAllUsers(listUsersResult.pageToken);
//                   }
//                 })
//                 .catch((error) => {
//                   console.log('Error listing users:', error);
//                 });
//             };
//             // Start listing users from the beginning, 1000 at a time.
//             listAllUsers();
//       }

//     //  addNewParkingGroup(db,name,address,latitude,longitude)
//     // {

   
//     //     const ref = db.ref('ParkingGroups');
//     //     // const newRecordRef = ref.push(); // Generate a new unique ID for the record
//     //     // const newRecord = newRecordRef.key; //
        
//     //         ref.push({
//     //             name: name,
//     //             address: address,
//     //             coordinates: {
        
//     //                 latitude:latitude,
//     //                 longitude:longitude,
//     //             }
//     //         }).then(() => {
//     //             console.log('Data added successfully.');
//     //           })
//     //           .catch((error) => {
//     //             console.error('Error adding data:', error);
//     //           });
//     //     }
        
        
//     //  addNewSpot(db,name,group_id,latitude,longitude,status=ParkingStatus.Available) 
//     // {
    
    
//     //     // db.ref('Spots').push().key();
//     //     const ref = db.ref('Spots');
//     //     ref.once('value')
//     //     .then((snapshot) => {
    
//     //         const count = snapshot.numChildren();
//     //         ref.child(count).set({
                
//     //             name: name,
//     //             groupId: group_id,
//     //             coordinates: 
//     //             {
//     //                 latitude:latitude,
//     //                 longitude:longitude,
//     //             },
//     //             startTimeBookingTemp:"",
//     //             status:status,
                
//     //         }).then(() => {
//     //             console.log('Data added successfully.');
//     //         })
//     //         .catch((error) => {
//     //             console.error('Error adding data:', error);
//     //         });
    
//     //     console.log('Number of items in "Spots":', count);
//     //     })
//     //     .catch((error) => {
//     //     console.error('Error retrieving data:', error);
//     //     });
    
//     //     }

//     }



    
        
