import React, { useState, useEffect } from "react";
import useStyles from "./Styles.js";
import {
  Avatar,
  Grid,
  Button,
  Paper,
  Typography,
  Container,
  TextField,
  Input,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAuth from "./InputAuth.js";

import { GoogleLogin } from "react-google-login";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth.js";

const Client_Id =
  "684702137747-fghqvcms9ano9khgjbms1jrkjfpgpjmc.apps.googleusercontent.com";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((e) => !e);
  };

  const SwitchUser = () => {
    setIsSignup((e) => !e);
  };

  const googleSuccess = async (res) => {
    console.log(res);

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Login unsuccessful");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography varaint="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {isSignup ? (
              <>
                <InputAuth
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />
                <InputAuth
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            ) : null}

            <InputAuth
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
              fullWidth
            />
            <InputAuth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              fullWidth
            />

            {isSignup ? (
              <InputAuth
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                fullWidth
              />
            ) : null}
          </Grid>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId={Client_Id}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                color="primary"
                fullWidth
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />

          <Grid conatiner justify="flex-end">
            <Grid item>
              <Button onClick={SwitchUser} color="secondary" fullWidth>
                {isSignup
                  ? "Already Have an Account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
