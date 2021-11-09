import { CHAT_ROOM_SERVER } from "./types";
import axios from "axios";

export async function getChatRoom(buyerId,sellerId) {
  try {
    const res = await axios.get(`${CHAT_ROOM_SERVER}`, {
      params: {
        buyerId: buyerId,
        sellerId:sellerId
      },
    });
    console.log(res.data.room[0])
    return res.data.room[0];
  } catch (error) {
    console.log(error);
  }
}
export async function sendMessage(roomid,msg) {
  try {
    const res = await axios.post(`${CHAT_ROOM_SERVER}/${roomid}/message`,{
      message:msg
    })
    console.log(res)
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
}
export async function getConversation(roomid) {
  try {
    const res = await axios.get(`${CHAT_ROOM_SERVER}/${roomid}`)
    console.log(res)
    return res.data.conversation;
  } catch (error) {
    console.log(error);
  }
}
