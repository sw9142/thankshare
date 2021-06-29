import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Footer.css"

const useStyles = makeStyles((theme) => ({


  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: "#caa052"
  },


  accountIcon:{
    fontSize: "2rem",
    marginRight :"0.7rem"
  }
}));




export default function Footer({  LoginUser, ProfileDB, setIsLogin, getProfile}) {

  // console.log("ProfileDB in Footer: ", ProfileDB);

 const classes = useStyles();
 const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    Axios.get("/api/users/logout").then((res) => {
   
      if (res.data.logoutsuccess) {
        console.log("logout succeess!");
        setIsLogin(false);
 
        getProfile();
        history.push("/");
      } else {
        console.log("err");
      }
    });
  };

    return (
    
        <div  >

 
        
          <AppBar position="fixed" className={classes.appBar}>

        <Toolbar>
          <div >
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >   
              {ProfileDB.thumbnail ? (
                <img
                  src={ProfileDB.thumbnail}       
                  alt="thumbnail"
                  style={{
                    borderRadius: "25px",
                    width: "40px",
                    height: "40px",
                  }}
                />
              ) : (
                <AccountCircleIcon  className={classes.accountIcon} />
              )}

              <div style={{paddingLeft: "0.5rem"}} >Hello, {ProfileDB.name}?</div>
         
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="footer"
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/profile");
                }}
                name="profile"
              >
                {ProfileDB.name}'s Profile
              </MenuItem>
              <MenuItem  onClick={() => {handleClose(); onClickLogout();}}>Logout</MenuItem>
            </Menu>
          </div>
            </Toolbar>
      </AppBar>
        </div>
   
    )
}
