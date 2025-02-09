import IMessage from "./IMessage";

interface IConversation {
    _id : string;
    members : Array<string>;
    last_message : IMessage;
    createdAt : Date;
    updatedAt : Date;
}

export default IConversation;