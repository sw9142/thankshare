import React from "react";
import Message from "./Message";
import "./Sharing.css"

function Sharing({ LoginUser, ProfileDB }) {

  return (
    <div className="message_container" >
      <div className="message_subcontainer"> 
      Hello <span className="sharing_hello" >{ProfileDB.name}</span>, share your thought! :)
      </div>
      <div  className="message_container">
      <Message LoginUser={LoginUser} ProfileDB={ProfileDB} />
      </div>
    </div>
  );
}

export default Sharing;
