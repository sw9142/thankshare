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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

inputProps :{
    fontSize: "15px",
    width: "62vw",
    paddingTop: "0.3rem",
    paddingLeft: "0.3rem"
},
inputLabelProps:{
    fontSize: "9",
    
},
}));





function Feed({ msg, getList, isOwner, feedUserId }) {

  const classes = useStyles();

  const [Editing, setEditing] = useState(false);
  const [NewMsg, setNewMsg] = useState(msg.msg);
  const [FeedProfilePic, setFeedProfilePic] = useState(null)

  const onDeleteHandler = () => {
    Axios.post("api/msg/delete", { id: msg._id }).then((res) => {
      console.log("msg", msg);
      if (res.data.success) {    
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
                className="feed-img"
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
          inputProps={{className: classes.inputProps}} 
          InputLabelProps={{className: classes.inputLabelProps}}
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
              <div className="btngroup" >
              <ButtonGroup variant="text" size="small" orientation="vertical" >
                  <Button name="cancel"  onClick={onEditHandler}  className="btn">
                   <ReplayIcon/>
                  </Button>
                  <Button name="update"  
                    onClick={onEditHandler}  className="btn">
                   <CheckIcon/>
                  </Button>
                </ButtonGroup>
              </div>
              </>
            ) : (
              <>
                {isOwner && (
                  <ButtonGroup variant="text" size="small" >
                  
                    <Button onClick={onDeleteHandler}  ><CloseIcon  className="icons"/></Button>
                    <Button name="edit" onClick={onEditHandler} >
                      <EditIcon  className="icons" />
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
