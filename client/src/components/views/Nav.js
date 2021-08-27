import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
    backgroundColor: "#ffd180",
    color: "black",
  },
  root: {
    flexGrow: 1,
  },
  toolbarLink: {
    marginRight: theme.spacing(1.5),
    fontSize: "0.9rem",
  },

  profile: {},
  hello: {
    color: "white",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
    marginLeft: "0.5rem",
  },
}));
function Nav({ toggleLogin, ProfileDB }) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href="/home"
              className={classes.toolbarLink}
            >
              Home
            </Link>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href="/bible"
              className={classes.toolbarLink}
            >
              Bible
            </Link>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href="/bibletoday"
              className={classes.toolbarLink}
            >
              Verse of Today
            </Link>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href="/sharing"
              className={classes.toolbarLink}
            >
              Sharing
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
