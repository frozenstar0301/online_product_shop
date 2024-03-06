import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Grid, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; // add this line
import TextInput from "./TextInput";
import PwdInput from "./PwdInput";
import { Link, useNavigate } from "react-router-dom";
import PwdConfirmInput from "./PwdConfirmInput";
import { addUser, resetStatus } from "./UserSlice";
import { AppDispatch } from "../../app/store/configureStore";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

interface RootState {
  user: {
      status: string
  }
}

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [pwdConfirm, setPasswordConfirm] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state: RootState) => state.user.status); 


  useEffect(() => {
    if (status === 'succeeded') {
      toast.success("Congratulations! Registered!");
      navigate("/login");
      dispatch(resetStatus());
    }
  }, [status]);

  const handleUsernameChange = (val: string) => {
    setUsername(val);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
  };

  const handlePasswordConfirmChange = (val: string) => {
    setPasswordConfirm(val);
  };

  const handleRegisterClick = () => {
    if (username && password) {
      dispatch(addUser({ username, password })); // pass the user information.
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid sx={{ width: '50%', textAlign: 'center' }}>
          <Paper sx={{ p: 5 }}>
              <Typography variant='h3'>Register</Typography>
              <Paper sx={{ mt: 5, mb: 2 }}>
                  <TextInput onValueChange={handleUsernameChange} />
              </Paper>
              <Paper sx={{ mb: 2 }}>
                  <PwdInput onValueChange={handlePasswordChange} />
              </Paper>
              <Paper sx={{ mb: 2 }}>
                  <PwdConfirmInput onValueChange={handlePasswordConfirmChange} />
              </Paper>
              <Grid container justifyContent="space-between">
                  <Grid item>
                      <Link to="/login" style={{ textDecoration: 'none', color: 'lightblue' }}>Already have an account?</Link>
                  </Grid>
              </Grid>
              <Button onClick={handleRegisterClick} variant="contained" sx={{width: '100%', marginTop: '50px'}} disabled={username === "" || password === "" || pwdConfirm === "" || password !== pwdConfirm}>Register</Button>
          </Paper>
      </Grid>
      
  </div>
  );
}