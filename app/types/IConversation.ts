interface IConversation {
    _id : string;
    members : Array<string>;
    last_message : string;
    createdAt : Date;
    updatedAt : Date;
}

export default IConversation;