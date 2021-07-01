import React, { useState, useRef } from "react";
import "./Profile.css"
import Axios from "axios";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import Button from '@material-ui/core/Button';

function Profile({ LoginUser, ProfileDB, getProfile, IsReady }) {


  const [Name, setName] = useState(""); //ProfileDB.name
  const [ProfileImage, setProfileImage] = useState("");
  const [Thumbnail, setThumbnail] = useState(""); //rofileDB.thumbnail
  
  const fileInput = useRef();
  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onSubmitingProfile = (e) => {
    e.preventDefault();

    if (ProfileImage) {
      let formData = new FormData();
      formData.append("file", ProfileImage);

      const config = {
        header: { "content-type": "multipart/form-data" },
      };

      ProfileImage &&
        Axios.post("api/profile/savingImage", formData, config).then((res) => {
          if (res.data.success) {
          } else {
            alert("err!");
          }
        });
    }
    
      Axios.post("api/profile/uploadProfile", {
        name: Name,
        userId: LoginUser._id,
        thumbnail: Thumbnail,
      }).then((res) => {
        if (res.data.updatesuccess) {
          getProfile();
        } else if(res.data.createsuccess){
          getProfile();
        } else {
          console.log("res.data.err: ", res.data.err);
        }
      });
    
  };

  const onChangeProfilePic = (e) => {
    setProfileImage(e.target.files[0]);

    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = (finishedEvent) => {
      setThumbnail(finishedEvent.currentTarget.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onClickClear = () => {
    fileInput.current.value = "";
    setProfileImage("");
    setThumbnail("");
  };

  return (
    <> 
    <div className="container_profile">
    <FormControl onSubmit={onSubmitingProfile} >
      <div className="input-profilepic"> 
        <InputLabel className="inputlabel" htmlFor="input-with-icon-adornment">Update Your Profile</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
                            <InputAdornment position="start">
                               {Thumbnail ? ( <>
                                                <img src={Thumbnail} className="thumbnail"  alt="profile" />
                                                <ClearRoundedIcon   onClick={onClickClear} fontSize="medium" className="clearroundicon"/> 
                                              </> ) :    <AccountCircle fontSize="large" /> }
                             </InputAdornment> }
          value={Name}
          placeholder="Your name?"
          onChange={onNameHandler}
          className="input_profile"
        />

        <div  className="container_button_profilepicupload">
          <Button
            color="primary"
            className="button_profilepicupload"
            size="small"
            component="label"
         
          >
       
        <PhotoLibraryRoundedIcon  /> 
            <input
              type="file"
              hidden
              name="profileImage"
              accept="image/png, image/jpeg"
              onChange={onChangeProfilePic}
              ref={fileInput}
            />
          </Button>

        </div>
      </div> 
      <div className="container_button_update">
          <Button 
            variant="contained"
            color="primary"
            type="submit" 
            value="Submit"
            className="button_update" 
            size="small"
            onClick={onSubmitingProfile} >Update</Button>
      </div>
    </FormControl>
 </div> 
 </>
  );
}

export default Profile;


