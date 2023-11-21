


export default class Spot{
    
    index;
    groupId;
    name;
    coordinates={latitude:0,
        longitude:0};
    status;


    // constructor(){

    // }

    // constructor(index = 0, name = "", groupId = "", coordinates = { latitude: 0, longitude: 0 }, status = 0) {
    //     this.index = index;
    //     this.name = name;
    //     this.groupId = groupId;
    //     this.coordinates = coordinates;
    //     this.status = status;
    //   }

    constructor(options = {}) {
        const {
          index = 0,
          name = "",
          groupId = "",
          coordinates = { latitude: 0, longitude: 0 },
          status = 0
        } = options;
    
        this.index = index;
        this.name = name;
        this.groupId = groupId;
        this.coordinates = coordinates;
        this.status = status;
      }
}