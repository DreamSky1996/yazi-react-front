import React, { useState, useEffect } from "react";
import "./chat.css";
import ReceivedMessage from "./receivedMessage";
import SentMessage from "./sentMessage";
import { IoMdArrowBack as Back } from "react-icons/io";
import initSocket from "socket.io-client";
import {
  getChatRoom,
  sendMessage,
  getConversation,
} from "../../../actions/chat_actions";
import user from "../../../util/images/user.svg";
import loading from "../../../util/images/loading.gif";
let socket;
function Chat(props) {
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newMsg !== "") setConversation([...conversation, newMsg]);
  }, [newMsg]);

  useEffect(() => {
    socket = initSocket("http://127.0.0.1:9090");

    socket.on("new message", (message) => {
      setNewMsg(message);
    });
    // get room id using seller id and buyer id . api call
    getChatRoom(props.buyerId, props.sellerId).then((chatRoom) => {
      console.log(chatRoom);
      socket.emit("identity", {
        userId: props.buyerId,
        room: chatRoom._id,
        username: props.username,
      });
      setRoom(chatRoom._id);

      // emit identity using with room id and userid

      // create event for listing to messages then show message in the ui
    });
    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (room !== "" && !mounted)
      getConversation(room).then((conversation) => {
        setConversation(conversation);
        setMounted(true);
      });
  }, [room]);

  const sendMsg = async (e) => {
    if (msg !== "") {
      setLoading(true);
      const message = await sendMessage(room, msg);
      setConversation([...conversation, message]);

      setMsg("");
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="head" style={{ display: "flex" }}>
        <Back
          onClick={() => props.closeModal()}
          size="28px"
          style={{ cursor: "pointer" }}
        />
        <h4>Live Chat</h4>
        <div className="chat-user">
          <img src={user} align="" alt="" />
        </div>
      </div>
      <div className="chat-list">
        {conversation.map((message) => {
          if (message.postedByUser.email === props.useremail) {
            return <SentMessage message={message} key={message._id} />;
          } else {
            return <ReceivedMessage message={message} key={message._id} />;
          }
        })}
      </div>

      <div className="chat-type">
        <div className="txt-area">
          <textarea
            onChange={(e) => setMsg(e.target.value)}
            className="form-control"
            value={msg}
            placeholder="Write a Message"
          ></textarea>
        </div>
        <ul className="button-list">
          <li>
            <span>
              <i className="fas fa-image"></i>
            </span>
          </li>
          <li>
            <span>
              <i className="fas fa-thumbtack"></i>
            </span>
          </li>
          <li onClick={sendMsg}>
            <button className="btn btn-primary" style={{width:"120px"}}>
              Send Now
              <img
                style={{ display: loading ? "inline" : "none" }}
                className="loading"
                src="./images/loading.gif"
                alt=""
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Chat;
