import React from "react";
import Message from "./Message";
import "./Sharing.css"

function Sharing({ LoginUser, ProfileDB }) {
  console.log("[Sharing.js] profileDB", ProfileDB)
  return (
    <div style={{padding: "1rem" }} >
      <div style={{padding: "0.8rem"}}> 
      Hello <span  style={{color: "blue", textTransform: "uppercase", fontWeight: "bold"}}>{ProfileDB.name}</span>, share your thought! :)
      </div>
      <div  className="message_container">
      <Message LoginUser={LoginUser} ProfileDB={ProfileDB} />
      </div>
    </div>
  );
}

export default Sharing;
