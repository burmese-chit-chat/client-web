"use server";


async function create_chat_room(){
    try {
        console.log("doing it....");
        console.log("done");
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default create_chat_room;
