interface INotification {
    _id : string;
    sender_id : string; 
    receiver_id : string; 
    title : string; 
    body : string; 
    is_read : boolean;
    createdAt : Date; 
    updatedAt : Date;
}

export default INotification;