import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";
import { useNavigate } from "react-router";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        TalenTrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState(true);

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  /*   const label = { inputProps: { "aria-label": "Checkbox demo" } };
   */

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: emailInput,
        password: passwordInput,
      });

      console.log(response);

      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      const userID = response.data.data.id;
      localStorage.setItem("userID", userID);

      setSuccess("Logged-In Successfully ! Redirecting to Home");

      await timeout(1500); //for 1 sec delay

      window.location.reload();

      //navigate("/");

      //setFormValid("Issue with login");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        setFormValid(err.response.data.message);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
    }

    //console.log("Email : " + emailInput);
    //console.log("Password : " + passwordInput);
    //console.log("Remember : " + rememberMe);

    //Show Successfull Submittion
    //setSuccess("Form Submitted Successfully");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
            value={emailInput}
            onBlur={handleEmail}
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            onBlur={handlePassword}
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              setPasswordInput(event.target.value);
            }}
            value={passwordInput}
          /> */}

          <FormControl variant="outlined" fullWidth required>
            <InputLabel error={passwordError} htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput
              margin="normal"
              error={passwordError}
              onBlur={handlePassword}
              name="password"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
              value={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(event) => {
                  setRememberMe(event.target.checked);
                }}
              />
            }
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          {/* Show Form Error if any */}
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )}

          {/* Show Success if no issues */}
          {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
