import React, { useState } from "react";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ThankShare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    color: "red",
    fontWeigth: "bolder",
    padding: "0.5rem",
  },
}));

function Auth({ getIsLogin, setLoginUser, getProfile }) {
  const classes = useStyles();

  const history = useHistory();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Msg, setMsg] = useState("");

  const onInputHandler = (e) => {
    const { name } = e.target;

    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //log IN

    Axios.post("/api/users/login", {
      email: Email,
      password: Password,
    }).then((res) => {
      if (res.data.loginSuccess) {
        getProfile();
        history.push("/profile");
        history.go(0);
      } else {
        setMsg(res.data.message);
      }
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome User Login!
          </Typography>
          {Msg && (
            <>
              <Typography
                className={classes.typography}
                component="h5"
                variant="subtitle2"
              >
                {Msg}
              </Typography>
            </>
          )}

          <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={Email}
              onChange={onInputHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={Password}
              onChange={onInputHandler}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmitHandler}
            >
              Log In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    history.push("/register");
                  }}
                  variant="body2"
                >
                  Don't have an account? Sign up!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default Auth;
