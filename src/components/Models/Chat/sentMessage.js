import React from "react";

function SentMessage({ message }) {

  const created_date = new Date(message.createdAt.toString());
  const t = created_date.toLocaleTimeString();
  const d =created_date.toDateString();
  let time=t.split(":")
  time = time[0] +":" +time[1]+" "+time[2].split(" ")[1]

  return (
    <div className="chat-item media">
      <img src="images/user.svg" alt="" />
      <div className="media-body">
        <p>{message.message}</p>
        <small>{d +" "+ time}</small>
      </div>
    </div>
  );
}

export default SentMessage;
