interface IConversation {
    _id : string;
    members : Array<string>;
    last_message : string;
    is_seen : boolean;
    createdAt : Date;
    updatedAt : Date;
}

export default IConversation;