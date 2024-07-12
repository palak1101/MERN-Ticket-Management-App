
import React, { useContext, useState } from 'react';
import { Avatar, Button, Typography, Grid, Box, Container, Link, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import AdminLogin from './AdminLogin';
import {login} from "../Services/auth.service"
type Props = {};
const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const initialValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Username is required!'),
    password: Yup.string().required('Password is required!'),
  });
  const handleSubmit = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    console.log('Form values ',email,password)
    setLoading(true);
    setMessage('');
    login(email, password).then(
      () => {
        console.log('Inside login')
        navigate("/");
       // window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  return (
    <Container component="main" maxWidth="xl" sx={{ margin: 0, padding: 0 }}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              textAlign: 'center',
              backgroundImage: 'url("images/login-page-1.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              margin: 0,
              padding: 0,
              '@media (max-width: 550px)': {
                display: 'none',
              },
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome Back!
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form noValidate style={{ marginTop: '1em', width: '80%' }}>
                <Field
                  as={TextField}
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!message}
                  helperText={message}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!message}
                  helperText={message}
                />
                <div className="g-recaptcha" data-sitekey="6LfP3QgqAAAAAHGX7L2mfXCfvcHcqTQpli4CMVem"></div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body2">Don't have an account?</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ textAlign: 'left' }}>
                      <Link component={RouterLink} to="/signup" color="primary">
                        {'Sign up here'}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Login;