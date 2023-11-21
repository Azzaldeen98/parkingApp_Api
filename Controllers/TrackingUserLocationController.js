


import  LocationUserState  from "../enums/LocationUserState.js";
import  LatLng  from "../models/LatLng.js";
import  NotifictionController  from "./NotifictionController.js";
import  Helper  from "../helpers/helper.js";
import  firebaseResources   from "../index.js";

const helper=new Helper();



export default class TrackingUserLocationController 
{

    polygon = [

        new LatLng(21.584642,39.178085),
        new LatLng(21.586617,39.184930),
        new LatLng(21.586059,39.186432),
        new LatLng(21.583864,39.186926),
        new LatLng(21.582128,39.187162),
        new LatLng(21.579993,39.187634),
        new LatLng(21.577499,39.188149),
        new LatLng(21.576241,39.188406),
        new LatLng(21.575663,39.188556),
        new LatLng(21.575523,39.188428),
        new LatLng(21.575423,39.188192),
        new LatLng(21.575344,39.187805),
        new LatLng(21.575304,39.187484),
        new LatLng(21.575124,39.187012),
        new LatLng(21.575004,39.186475),
        new LatLng(21.574905,39.186132),
        new LatLng(21.574745,39.185681),
        new LatLng(21.573827,39.182269),
        new LatLng(21.573667,39.181475),
        new LatLng(21.573767,39.180681),
        new LatLng(21.583445,39.177592)

    ];

     calculateWindingNumber(polygon, point) {
        let windingNumber = 0;
      
        for (let i = 0; i < polygon.length; i++) {
          let currentLatLng = polygon[i];
          let nextLatLng = polygon[(i + 1) % polygon.length];
      
          if (currentLatLng.y <= point.y) 
          {
            if (nextLatLng.y > point.y && this.isLeftTurn(currentLatLng, nextLatLng, point)) {
              windingNumber++;
            }
          } else {
            if (nextLatLng.y <= point.y && this.isRightTurn(currentLatLng, nextLatLng, point)) {
              windingNumber--;
            }
          }
        }
      
        return windingNumber;
      }
      
       isLeftTurn(a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y) > 0;
      }
      
       isRightTurn(a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y) < 0;
      }

    async  locationIsInSide(location)
    {

      var loc= new LatLng(location.x, location.y);

      //  console.log(new LatLng(21.575553, 39.182498));
       let windingNumber = await this.calculateWindingNumber(this.polygon,location);
       return (windingNumber!=0);

    }

    async getLocationState(location){

        return  (await this.locationIsInSide(location))?LocationUserState.Inside:LocationUserState.Outside;

    }

}
