import React, { useState, useEffect } from "react";
import Axios from "axios";
import Feed from "./Feed";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Divider from "@material-ui/core/Divider";
import  "./Message.css"


function Message({ LoginUser, ProfileDB }) {


  const [Msg, setMsg] = useState("");
  const [MsgList, setMsgList] = useState([]);

  const getList = () => {
    Axios.get("api/msg/getlist").then((res) => {
      if (res.data.success) {
        const sortedList = res.data.list.sort(function(a,b) {return a.createdAt - b.createdAt});
        console.log("sortedlist: ", sortedList);
        setMsgList(sortedList);
      } else {
        console.log("failed getting the list");
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const onMsgInput = (e) => {
    setMsg(e.target.value);
  };

  const onSubmitInput = (e) => {
  
    e.preventDefault();
    const data = {
      msg: Msg,
      date: Date.now(),
      userId: LoginUser._id,
    };

    setMsgList((pre) => [data, ...pre]);

    Axios.post("api/msg/upload", data).then((res) => {
      if (res.data.success) {
        console.log("success!");
      }
    });

    setMsg("");
  };

 
  return (
    <>
    <form  noValidate autoComplete="off" onSubmit={onSubmitInput} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
     <div  className="textfield" >
          <TextField 
          id="outlined-basic" 
          label="Our God always speaks to us..." 
          variant="outlined"
          color="primary"
          inputProps={{style: {fontSize: 10, width: "74vw"}}} // font size of input text
          InputLabelProps={{style: {fontSize: 12}}} // font size of input label
          onChange={onMsgInput} 
          value={Msg}
          multiline 
          rows={3}
          size="small" />

      </div>
        <div className="button_container">
            <Button  
            variant="contained"
            color="primary" 
            
            onClick={onSubmitInput} 
            endIcon={<SendIcon   style={{
             fontSize: "0.6rem"
           }}/>} 
            size="small" 
           style={{
             fontSize: "0.6rem",
           }}
            > Send </Button> 
       </div>
     
    </form>
 
    <Divider />
    <br/>

      <div>
        {MsgList.map((msg, index) => (
          <>
            <div key={index} className="feed_container">
              <Feed
                msg={msg}
                getList={getList}
                isOwner={msg.userId === LoginUser._id}
                feedUserId={msg.userId}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Message;
