import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Lottie from "react-lottie";
import texting from "../../lottieFile/texting.json";
import reading from "../../lottieFile/reading.json";
import flower from "../../lottieFile/flower.json";
import announce from "../../lottieFile/announce.json";
import Link from "@material-ui/core/Link";


 const defaultOptions_texting = {
      loop: true,
      autoplay: true,
      animationData: texting,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const defaultOptions_reading = {
    loop: true,
    autoplay: true,
    animationData: reading,
   layout_height: "500%",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
 const defaultOptions_flower = {
      loop: true,
      autoplay: true,
      animationData: flower,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
 const defaultOptions_announce = {
      loop: true,
      autoplay: true,
      animationData: announce,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding : "1rem",
    marginTop: "2rem",
    height: "100%",
    backgroundColor: "#E1E2E1",
  },
  toolbar: {
  height: "100%",

  },
  paper: {
    backgroundColor: "#F5F5F6",
    padding: "1.5rem",
    borderRadius: "50px"
  },
  menu_title: {
    textAlign : "center",
    padding: "0.7rem",
    fontSize: "1.1rem"
  },
  reading:{
    aspectRatio: "1/1"
  }
}));




function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container  spacing={3} className={classes.toolbar} >
       <Grid item xs={6} >
          <Link href="/sharing">
            <Paper className={classes.paper}> 
              <Lottie options={defaultOptions_texting}  />
              <div className={classes.menu_title} > 묵상나눔 </div>
            </Paper>
          </Link>
       </Grid>

      
       <Grid item xs={6} >
          <Link href="/bible">
            <Paper className={classes.paper}> 
              <Lottie options={defaultOptions_reading}/>
              <div className={classes.menu_title} >    성경읽기 </div>
            </Paper>
          </Link>
       </Grid>

       <Grid item xs={6} >
          <Link href="/bibletoday">
            <Paper className={classes.paper}> 
              <Lottie options={defaultOptions_flower}  />
              <div className={classes.menu_title} >    매일묵상 </div>
            </Paper>
          </Link>
       </Grid>


     <Grid item xs={6} >
          <Link href="/announce">
            <Paper className={classes.paper}> 
              <Lottie options={defaultOptions_announce} />
              <div className={classes.menu_title} >    주보 </div>
            </Paper>
          </Link>
       </Grid>
   
      </Grid>
    </div>
  );
}

export default LandingPage;
