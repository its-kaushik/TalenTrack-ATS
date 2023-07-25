import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);

  const [emailFormValid, setEmailFormValid] = useState();
  const [sendCodeSuccessMessage, setSendCodeSuccessMessage] = useState();
  const [sendCodeSuccess, setSendCodeSuccess] = useState(false);

  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);

  const [resetCode, setResetCode] = useState();
  const [resetCodeError, setResetCodeError] = useState(false);

  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState();
  const [passwordChangeFormValid, setPasswordChangeFormValid] = useState();

  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleResetCode = () => {
    if (!resetCode || isNaN(resetCode)) {
      setResetCodeError(true);
      return;
    }

    setResetCodeError(false);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();

    setSendCodeSuccessMessage(null);

    if (emailError || !email) {
      setEmailFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    setEmailFormValid(null);

    try {
      const response = await axios.post(`${baseUrl}/auth/forgot-password`, {
        email: email,
      });

      setSendCodeSuccessMessage("Reset Code Sent Successfully!");

      await timeout(1500);

      setSendCodeSuccessMessage(null);

      setSendCodeSuccess(true);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        setEmailFormValid(err.response.data.message);
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
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setPasswordChangeSuccess(null);

    if (passwordError || !password) {
      setPasswordChangeFormValid("Password is Invalid. Please Re-Enter");
      return;
    }

    if (resetCodeError || !resetCode) {
      setPasswordChangeFormValid("Reset Code is Invalid. Please Re-Enter");
      return;
    }

    setPasswordChangeFormValid(null);

    try {
      const response = await axios.post(`${baseUrl}/auth/reset-password`, {
        email: email,
        newPassword: password,
        securityCode: resetCode,
      });

      setPasswordChangeSuccess(
        "Password Changed Successfull ! Redirecting to Login Page.."
      );

      await timeout(1500);

      navigate("/");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        setPasswordChangeFormValid(err.response.data.message);
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
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {!sendCodeSuccess && (
          <Box
            component="form"
            onSubmit={handleSendLink}
            noValidate
            sx={{ mt: 1 }}
          >
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
              value={email}
              onBlur={handleEmail}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Link
            </Button>

            {/* Show Form Error if any */}
            {emailFormValid && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error" size="small">
                  {emailFormValid}
                </Alert>
              </Stack>
            )}

            {/* Show Success if no issues */}
            {sendCodeSuccessMessage && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success" size="small">
                  {sendCodeSuccessMessage}
                </Alert>
              </Stack>
            )}
          </Box>
        )}
        {sendCodeSuccess && (
          <>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
              }}
            >
              Set new password for {email}
            </Typography>
            <Box
              component="form"
              onSubmit={handleResetPassword}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                autoFocus
                error={passwordError}
                value={password}
                onBlur={handlePassword}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              /> */}
              <FormControl variant="outlined" fullWidth required>
                <InputLabel error={passwordError} htmlFor="password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  margin="normal"
                  error={passwordError}
                  onBlur={handlePassword}
                  name="password"
                  label="New password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="resetCode"
                label="Reset Code"
                name="resetCode"
                autoComplete="resetCode"
                autoFocus
                error={resetCodeError}
                value={resetCode}
                onBlur={handleResetCode}
                onChange={(event) => {
                  setResetCode(event.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>

              {/* Show Form Error if any */}
              {passwordChangeFormValid && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                  <Alert severity="error" size="small">
                    {passwordChangeFormValid}
                  </Alert>
                </Stack>
              )}

              {/* Show Success if no issues */}
              {passwordChangeSuccess && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                  <Alert severity="success" size="small">
                    {passwordChangeSuccess}
                  </Alert>
                </Stack>
              )}
            </Box>
          </>
        )}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default ForgotPassword;
