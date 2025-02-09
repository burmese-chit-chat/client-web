interface IMessage {
    _id: string;
    conversation_id : string;
    sender_id : string;
    message : string;
    is_read : boolean;
    createdAt : Date;
    updatedAt : Date;
}


export default IMessage;