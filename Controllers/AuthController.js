import  model   from "../models/Booking.js";
import  firebaseResources   from "../index.js";

export default class AuthController{
    
    
    constructor() 
    {
      this.admin = firebaseResources.admin;
    }


    async setCustomRole(uid, role)  
    {
      
      try
       {

        await this.admin.auth().setCustomUserClaims(uid, { role });
        console.log('Custom role set successfully');

      } catch (error) {
        console.error('Error setting custom role:', error);
      }
    };

    async getUsersWithRole  (role) 
    {
        try 
        {
          const userList = await this.admin.auth().listUsers();
          const usersWithRole = userList.users.filter(user => user.customClaims && user.customClaims.role === role);
          const userIds = usersWithRole.map(user => user.uid);
          console.log('Users with the admin role:', userIds);
          return userIds;
        } 
        catch (error) 
        {
          console.error('Error retrieving users:', error);
        }
        return null;
    };
    


}
