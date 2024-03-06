import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Grid, Paper, Button } from "@mui/material";
import TextInput from "./TextInput";
import PwdInput from "./PwdInput";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store/configureStore";
import { useDispatch, useSelector } from "react-redux"; // add this line
import { loginUser, resetStatus, checkUser } from "./UserSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

interface RootState {
  user: {
      status: string
  }
}


export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const status = useSelector((state: RootState) => state.user.status); 

  const handleUsernameChange = (val: string) => {
    setUsername(val);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
  };

  const handleLoginClick = () => {
    if (username && password) {
      dispatch(loginUser({ username, password })); // pass the user information.
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success("Log in Successfully");
      navigate("/catalog");
      dispatch(resetStatus());
    } else if(status === 'check_succeeded') {
      toast.success("Please Change Password!");
      navigate("/forget-password");
      dispatch(resetStatus());
    }
  }, [status]);

  const onForgetLinkHandle = (event: React.SyntheticEvent) => {
    if (username === "") {
      event.preventDefault(); // Stop the default event
      // Show toast error
      toast.error("Fill the username");
    } else {
      event.preventDefault(); // Stop the default event
      dispatch(checkUser({username}));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid sx={{ width: '50%', textAlign: 'center' }}>
          <Paper sx={{ p: 5 }}>
              <Typography variant='h3'>Login</Typography>
              <Paper sx={{ mt: 5, mb: 2 }}>
                  <TextInput onValueChange={handleUsernameChange} />
              </Paper>
              <Paper sx={{ mb: 2 }}>
                  <PwdInput onValueChange={handlePasswordChange} />
              </Paper>
              
              <Grid container justifyContent="space-between">
                  <Grid item>
                      <Link to="/forget-password" onClick={onForgetLinkHandle}  style={{ textDecoration: 'none', color: 'lightblue' }}>Forget Password?</Link>
                  </Grid>
                  <Grid item>
                      Need an account?&nbsp;
                      <Link to="/register" style={{ textDecoration: 'none', color: 'lightblue' }}>Register</Link>
                  </Grid>
              </Grid>
              <Button onClick={handleLoginClick} variant="contained" sx={{width: '100%', marginTop: '50px'}} disabled={username === "" || password === "" }>Log In</Button>
          </Paper>
      </Grid>
  </div>
  );
}