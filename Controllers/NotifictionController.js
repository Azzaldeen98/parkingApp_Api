import  Notifiction   from "../models/Notifiction.js";
import  NotifictionType   from "../enums/NotifictionType.js";
import  NotifictionStatus   from "../enums/NotifictionStatus.js";
import  firebaseResources   from "../index.js";
import Helper from '../helpers/helper.js';

export default class NotifictionController{
    
    
    constructor() 
    {
      this.admin = firebaseResources.admin;
    }

    async  sendNotifiyMessage(_title,_body,_topic,type=NotifictionType.General)
    {
    
        const message = {
    
            notification: 
            {
                title: _title, 
                body: _body 
            },
            topic: _topic 
        };
    
        // Send a message to devices subscribed to the provided topic.
        firebaseResources.admin.messaging().send(message)
        .then((response) => 
        {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => 
        {
            console.log('Error sending message:', error);
        });
    
    }

    async store(notifiction)  
    {
  
        notifiction.date=new Helper().getCurrentDateAsString();
        notifiction.status=NotifictionStatus.NEW;

        console.log(notifiction);
      
        const ref = firebaseResources.Notifictions;
        ref.push(notifiction).then(() => 
        {
            console.log('Data added successfully.');
        })
        .catch((error) =>
         {
          console.error('Error adding data:', error);
        });
    };

    async sendWelcomeMessage(userId)  
    {

        var notify=new Notifiction();
        notify.title="شاغر";
        notify.body="مرحبا بك في تطبيق شاغر";

        if(userId!=null)
           notify.topic=userId;

          notify.date=new Helper().getCurrentDateAsString();
          notify.status=NotifictionStatus.NEW;
          notify.type=NotifictionType.Message;

        console.log(notify);

        await sendNotifiyMessage(notify.title,notify.body,notify.topic,notify.type);
      

    };


}
