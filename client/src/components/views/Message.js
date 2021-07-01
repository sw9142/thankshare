import React, { useState, useEffect } from "react";
import Axios from "axios";
import Feed from "./Feed";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Divider from "@material-ui/core/Divider";
import  "./Message.css"

const useStyles = makeStyles((theme) => ({

inputProps :{
    fontSize: "10",
    width: "68vw",
},
inputLabelProps:{
    fontSize: "12",
},
}));

function Message({ LoginUser, ProfileDB }) {

 const classes = useStyles();
  const [Msg, setMsg] = useState("");
  const [MsgList, setMsgList] = useState([]);

  const getList = () => {
    var sortingField = "createdAt";
    Axios.get("api/msg/getlist").then((res) => {
      if (res.data.success) {
        const sortedList = res.data.list.sort(function(a,b) {return b[sortingField] - a[sortingField]});
       
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
    <form  noValidate autoComplete="off" onSubmit={onSubmitInput} className="form-container" >
     <div  className="textfield" >
          <TextField 
          id="outlined-basic" 
          label="Our God always speaks to us..." 
          variant="outlined"
          color="primary"
          inputProps={{ className: classes.inputProps}} 
          InputLabelProps={{ className: classes.inputLabelProps }} 
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
            endIcon={<SendIcon  className="endicon"/>} 
            size="small" 
            className="sendbtn"
            > Send </Button> 
       </div>
     
    </form>
 
    <Divider />
    <br/>

      <div>
        {MsgList.map((msg, index) => (
          <>
            <div key={index} >
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
