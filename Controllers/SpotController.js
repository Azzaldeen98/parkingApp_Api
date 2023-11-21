
import Spot from "../models/Spot.js";
import ParkingStatus from "../enums/ParkingStatus.js";

import  firebaseResources   from "../index.js";

class LatLng{

      

  constructor(lat,lng) 
  {
    this.lat=lat;
    this.lng=lng;
  }

  lat(){return this.lat;}
  lng(){return this.lng;}


}


export default class SpotController{
    
     _spot;
    constructor() 
    {

    }


      /**
     * Adds two numbers and returns the result.
     * @param {Spot} spot - The first number.
     */
    store(spot)
    {
    
      this._spot=spot;
      let ref=firebaseResources.Spots;
      ref.orderByChild("groupId").equalTo(this._spot.groupId)
      .once('value').then((snapshot) => {

        //   console.log(snapshot);


            //   this._spot.index= snapshot.numChildren()+1;
              ref.push(this._spot).then(() => 
              {
                  console.log('Data added successfully.');
                  
              })
              .catch((error) => {
                  console.error('Error adding data:', error);
              });
      
          console.log('Number of items in "Spots":', count);
          })
          .catch((error) => {
          console.error('Error retrieving data:', error);
          });
    }

   async releaseAllSpots()
    {
      const ref = firebaseResources.Spots;
      ref.once('value')
      .then((snapshot) => 
      {
          snapshot.forEach((childSnapshot) => 
          {
            
            const item = childSnapshot.val();
            if(item.status!=ParkingStatus.Available)
            {
              firebaseResources.Spots.child(childSnapshot.key).child("status").set(ParkingStatus.Available).
              then(async() =>
              {
                  console.log('Spots is release .',item.spotId)
      
              }).catch((error) => console.error('Error update  data:', error));

            }
          });

        });
    }



   async setCoordinatesForAllSpots()
    {

      


       var myCoordinates = [
         [21.582128,39.182191],
         [21.582074,39.182209],
         [21.582019,39.182092],
         [21.582026,39.182222],
         [21.581961,39.182108],
         [21.581967,39.182249],
         [21.582148,39.182253],
         [21.581912,39.182128],
         [21.581922,39.182253],
         [21.581861,39.182142],
         [21.582089,39.182272],
         [21.581870,39.182272],
         [21.581809,39.182162],
         [21.581816,39.182284],
         [21.582038,39.182286],
         [21.581758,39.182175],
         [21.581983,39.182305],
         [21.581936,39.182320],
         [21.581761,39.182308],
         [21.581887,39.182340],
         [21.581700,39.182192],
         [21.581713,39.182327],
         [21.581647,39.182205],
         [21.581592,39.182225],
         [21.581572,39.182293],
         [21.581583,39.182344],
         [21.581832,39.182351],
         [21.581593,39.182400],
         [21.581785,39.182372],
         [21.581617,39.182457],
         [21.581729,39.182388],
         [21.581632,39.182502]
        ];


      const ref = firebaseResources.Spots;
      var i=0;

      ref.once('value')
      .then((snapshot) => 
      {
          snapshot.forEach((childSnapshot) => 
          {
            
            const item = childSnapshot.val();
            item.name="Spot-"+item.index;

            var index = parseInt(item.index); // Example index
            console.log(snapshot.numChildren(),myCoordinates.length)
            if (index >= 0 && index < myCoordinates.length) 
            {
            var latitude = myCoordinates[index][0];
            var longitude = myCoordinates[index][1];

            item.coordinates={
              latitude:latitude,
              longitud:longitude
            }
     
              ref.child(childSnapshot.key).set(item).
              then(async() =>
              {
                  console.log('Spots is update .',item.spotId)
      
              }).catch((error) => console.error('Error update  data:', error));

            }
          });

        });
    }

}
