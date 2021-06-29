import React, { useState, useEffect} from "react";
import Axios from "axios";
import "./Feed.css"
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';

function Feed({ msg, getList, isOwner, feedUserId }) {
  const [Editing, setEditing] = useState(false);
  const [NewMsg, setNewMsg] = useState(msg.msg);
  const [FeedProfilePic, setFeedProfilePic] = useState(null)



console.log("isOwner?", isOwner, "feedUserId? ", feedUserId)
  const onDeleteHandler = () => {
    Axios.post("api/msg/delete", { id: msg._id }).then((res) => {
      console.log("msg", msg);
      if (res.data.success) {
        console.log("delete!");
        getList();
      }
    });
  };

  const onUpdatingMessage = (e) => {
    setNewMsg(e.target.value);
  };

  const onEditHandler = (e) => {
    const { name } = e.currentTarget;
    console.log(name);
    if (name === "edit") {
      setEditing(true);
    } else if (name === "cancel") {
      setEditing(false);
    } else if (name === "update") {
      Axios.post("api/msg/update", { newMsg: NewMsg, id: msg._id }).then(
        (res) => {
          if (res.data.success) {
            console.log("update success");
            getList();
          } else {
            alert("err!");
          }
        }
      );
      setEditing(false);
    }
  };

useEffect(() => {
 Axios.post("api/profile/getThumbnail", ({id:feedUserId})).then((res)=>{
   if(res.data.success){
        setFeedProfilePic(res.data.pic)
   }else{
     console.log("err getting profile pic for feed from db", res.data.err)
   }
 })
}, [feedUserId])

  return (
 
      <div className="container"> 
        <div className="container_profileImage">
          { FeedProfilePic ? (
              <img
                src={FeedProfilePic}
                style={{
                          borderRadius: "25px",
                          width: "35px",
                          height: "35px",
                        }}
                alt="thumbnail"
              />
            ): <AccountCircleIcon/>}
         </div>
{
  Editing ? <div className="container_editing">
           <TextField 
          id="outlined-basic" 
          label="How would you like to edit?" 
          variant="standard"
          margin="small"
          color="primary"
          inputProps={{style: {fontSize: 10, width: "68vw"}}} // font size of input text
          InputLabelProps={{style: {fontSize: 12}}} // font size of input label
          onChange={onUpdatingMessage} 
          value={NewMsg}
          multiline 
          rows={3}
          size="small" />
         </div> :

         <div className="container_msg">
         <p className="msg">{msg.msg}</p>
         </div>

}

          <div className="container_buttons" >
            {Editing ? (
              <>
              <div style={{margin: "1rem"}}>
              <ButtonGroup variant="text" size="small" orientation="vertical" >
                  <Button name="cancel"  onClick={onEditHandler}     style={{
                  fontSize: "0.6rem",
                }}>
                   <ReplayIcon/>
                  </Button>
                  <Button name="update"  
                    onClick={onEditHandler}    style={{
                  fontSize: "0.6rem",
                }}>
                   <CheckIcon/>
                  </Button>
                </ButtonGroup>
              </div>
              </>
            ) : (
              <>
                {isOwner && (
                  <ButtonGroup variant="text" size="small" >
                  
                    <Button onClick={onDeleteHandler}  ><CloseIcon  style={{fontSize: "0.9rem"}}/></Button>
                    <Button name="edit" onClick={onEditHandler} >
                      <EditIcon style={{fontSize: "0.9rem"}} />
                    </Button>
                  </ButtonGroup>
                
                )}
              </>
            )}
            </div>
          </div>
  
  );
}

export default Feed;
