"use server";


async function create_chat_room(){
    try {
        console.log("doing it....");
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call or delay
        console.log("done");
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default create_chat_room;
