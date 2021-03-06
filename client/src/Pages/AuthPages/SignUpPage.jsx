import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar  from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { setCurUser, auth_fail, auth_err_comp_close } from '../../store/user/user.action';
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser, selectAuthErrCompOpen, selectAuthError} from '../../store/user/user.selector'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapDispatchToProps = dispatch =>({
  setCurUser : (path,data) => dispatch(setCurUser(path,data)),
  auth_fail : error => dispatch(auth_fail(error)),
  auth_err_comp_close : () => dispatch(auth_err_comp_close())
})

const mapStateToProps = createStructuredSelector({
  current_user:selectCurrentUser,
  auth_error:selectAuthError,
  open_err_comp:selectAuthErrCompOpen
})

export default connect(mapStateToProps,mapDispatchToProps)(function SignUp({auth_error,setCurUser,auth_fail,current_user,open_err_comp,auth_err_comp_close,}) {
  const classes = useStyles();

    const [inputs,setInputs] = useState({userName:'',email:'',password:'',conform_password:''})

  const signUpHandler = (e) =>{
        e.preventDefault()

        try {

          const {password,conform_password} = inputs

          if(password !== conform_password){
            throw new Error('Password\'s Incorrect')
          }

          setCurUser('register',inputs)

          // clearing form
          setInputs({
            userName:'',
            email:'',
            password:'',
            conform_password:''
          })
        } catch (error) {
          auth_fail({message:error.message})
        }
  }

  const inputHandler = ({target:{value,name}}) =>{
      setInputs({
          ...inputs,
          [name]:value
      })
  }

  // Error Snackbar implementation
  const error = auth_error && (
    <Snackbar open={open_err_comp} autoHideDuration={3000} onClose={auth_err_comp_close}>
      <Alert onClose={auth_err_comp_close} severity="warning">
        {auth_error}
      </Alert>
    </Snackbar>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {current_user?<Redirect to='/dashboard'/>:null}
      <div className={classes.paper}>
        {error}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={signUpHandler} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                value={inputs.userName}
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={inputs.email}
                autoComplete="off"
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={inputs.password}
                autoComplete="off"
                type="password"
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="conform_password"
                label="Conform Password"
                name="conform_password"
                value={inputs.conform_password}
                autoComplete="off"
                type="password"
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
})