import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Grid, Paper, Button } from "@mui/material";
import PwdInput from "./PwdInput";
import { Link, useNavigate } from "react-router-dom";
import PwdConfirmInput from "./PwdConfirmInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store/configureStore";
import { changePwd, resetStatus } from "./UserSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

interface RootState {
  user: {
    username: string,
    status: string
  }
}


export default function ForgetPassword() {
  const [password, setPassword] = useState<string>("");
  const [pwdConfirm, setPasswordConfirm] = useState<string>("");

  const username = useSelector((state: RootState) => state.user.username);
  const status = useSelector((state: RootState) => state.user.status);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('changePwdStatus') !== 'true') {
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success("Password Changed");
      navigate("/login");
      dispatch(resetStatus());
    }
  }, [status]);

  const handlePasswordChange = (val: string) => {
    setPassword(val);
  };

  const handlePasswordConfirmChange = (val: string) => {
    setPasswordConfirm(val);
  };

  const onBackHandle = (event: React.SyntheticEvent) => {
    localStorage.changePwdStatus = 'false';
  };

  const handleChangeClick = () => {
    dispatch(changePwd({ username, password })); // pass the user information.
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid sx={{ width: '50%', textAlign: 'center' }}>
        <Paper sx={{ p: 5 }}>
          <Typography variant='h3'>New Password</Typography>

          <Paper sx={{ mt: 5, mb: 2 }}>
            <PwdInput onValueChange={handlePasswordChange} />
          </Paper>
          <Paper sx={{ mb: 2 }}>
            <PwdConfirmInput onValueChange={handlePasswordConfirmChange} />
          </Paper>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to="/login" onClick={onBackHandle} style={{ textDecoration: 'none', color: 'lightblue' }}>{"<<"}&nbsp;Go back</Link>
            </Grid>
          </Grid>
          <Button onClick={handleChangeClick} variant="contained" sx={{ width: '100%', marginTop: '50px' }} disabled={password === "" || pwdConfirm === "" || password !== pwdConfirm}>Change Password</Button>
        </Paper>
      </Grid>
    </div>
  );
}