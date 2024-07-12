// import React, { useState } from 'react';
// import { Button, Box, TextField, Typography, Link, Container, Grid } from '@mui/material';
// import { Google as GoogleIcon, Email as EmailIcon } from '@mui/icons-material';
// import {Link as RouterLink} from 'react-router-dom';
// const SignUp: React.FC = () => {
//   const [emailSignup, setEmailSignup] = useState(false);
//   const [formValues, setFormValues] = useState({ fullName: '', email: '', password: '' });
//   const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value
//     });
//     setErrors({
//       ...errors,
//       [name]: ''
//     });
//   };
//   const handleGoogleSignUp = () => {
//     // Redirect to Google sign-up page
//     window.location.href = 'https://accounts.google.com/AccountChooser';
//   };
//   const validateEmail = (email: string) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };
//   const validatePassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     let valid = true;
//     let newErrors = { fullName: '', email: '', password: '' };
//     if (formValues.fullName.trim() === '') {
//       newErrors.fullName = 'Full Name is required.';
//       valid = false;
//     }
//     if (!validateEmail(formValues.email)) {
//       newErrors.email = 'Invalid email address.';
//       valid = false;
//     }
//     if (!validatePassword(formValues.password)) {
//       newErrors.password = 'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
//       valid = false;
//     }
//     if (formValues.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long.';
//       valid = false;
//     }
//     if (!valid) {
//       setErrors(newErrors);
//       return;
//     }
//     console.log('Form submitted', formValues);
//   };
//   return (
//     <Container component="main" maxWidth="xl" sx={{ height: '100vh' }}>
//       <Grid container sx={{ height: '100%' }}>
//         <Grid item xs={12} sm={8}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%',
//               textAlign: 'center',
//               backgroundImage: `url("images/login-page-image.jpg")`,
//               backgroundPosition: 'center',
//               '@media (max-width: 550px)': {
//                 display: 'none',
//               },
//             }}
//           >
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             sx={{ height: '100%' }}
//           >
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               textAlign="center"
//               width="80%"
//               maxWidth="400px"
//             >
//               <Typography variant="h4" align="center" gutterBottom>
//                 Create an Account
//               </Typography>
//               {!emailSignup ? (
//                 <>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     startIcon={<EmailIcon />}
//                     sx={{ mt: 2, mb: 2 }}
//                     onClick={() => setEmailSignup(true)}
//                     aria-label="Sign up with Email"
//                   >
//                     Sign up with Email
//                   </Button>
//                   <Typography variant="subtitle1" gutterBottom>
//                     OR
//                   </Typography>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     startIcon={<GoogleIcon />}
//                     sx={{ mt: 1, mb: 2 }} onClick={handleGoogleSignUp}
//                     aria-label="Sign up with Google"
//                   >
//                     Sign up with Google
//                   </Button>
//                   <Typography variant="body2">
//                     Already have an account? < Link component={RouterLink} to="/login">Login</Link>
//                   </Typography>
//                   <Typography variant="caption" display="block" gutterBottom>
//                     By clicking Sign up with social media, you agree to our <Link href="/terms">Terms of Service</Link>, <Link href="/privacy">Privacy Policy</Link>, and <Link href="/cookie">Cookie Policy</Link>.
//                   </Typography>
//                   <Typography variant="caption" display="block">
//                     Your data will be stored in the <b>US</b>.
//                   </Typography>
//                 </>
//               ) : (
//                 <form style={{ width: '100%' }} onSubmit={handleSubmit}>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     name="fullName"
//                     value={formValues.fullName}
//                     onChange={handleInputChange}
//                     error={!!errors.fullName}
//                     helperText={errors.fullName}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     name="email"
//                     value={formValues.email}
//                     onChange={handleInputChange}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     name="password"
//                     value={formValues.password}
//                     onChange={handleInputChange}
//                     error={!!errors.password}
//                     helperText={errors.password || "Must contain 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number & 1 special character."}
//                   />
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     sx={{ mt: 2, mb: 2 }}
//                   >
//                     Get Started
//                   </Button>
//                   <Typography variant="caption" display="block" gutterBottom>
//                     By clicking "Get Started", you agree to our <Link href="/terms">Terms of Service</Link>, <Link href="/cookie">Cookie Policy</Link>, and <Link href="/privacy">Privacy Policy</Link>.
//                   </Typography>
//                 </form>
//               )}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
//  };
// export default SignUp;


import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Link, Container, Grid } from '@mui/material';
import { Google as GoogleIcon, Email as EmailIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Import AxiosError for type definition

const SignUp: React.FC = () => {
  const [emailSignup, setEmailSignup] = useState(false);
  const [formValues, setFormValues] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { fullName: '', email: '', password: '' };

    if (formValues.fullName.trim() === '') {
      newErrors.fullName = 'Full Name is required.';
      valid = false;
    }
    if (!validateEmail(formValues.email)) {
      newErrors.email = 'Invalid email address.';
      valid = false;
    }

    if (!validatePassword(formValues.password)) {
      newErrors.password = 'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
      valid = false;
    }

    if (formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        fullName: formValues.fullName,
        email: formValues.email,
        password: formValues.password
      });

      console.log('Registration successful:', response.data);
      // Optionally, redirect to login page or handle success message
    } catch (error: any) { // Catch block with any type for now, to access response.data
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data);
        // Handle error responses from server, e.g., display error messages to the user
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  const handleGoogleSignUp = () => {
    // Redirect to Google sign-up page
    window.location.href = 'https://accounts.google.com/AccountChooser';

    console.log('Form submitted', formValues);
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              backgroundImage: 'url("images/login-page-image.jpg")',
              backgroundPosition: 'center',
              '@media (max-width: 550px)': {
                display: 'none',
              },
            }}
          >
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              width="80%"
              maxWidth="400px"
            >
              <Typography variant="h4" align="center" gutterBottom>
                Create an Account
              </Typography>
              {!emailSignup ? (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                    sx={{ mt: 2, mb: 2 }}
                    onClick={() => setEmailSignup(true)}
                    aria-label="Sign up with Email"
                  >
                    Sign up with Email
                  </Button>
                  <Typography variant="subtitle1" gutterBottom>
                    OR
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleGoogleSignUp}
                    aria-label="Sign up with Google"
                  >
                    Sign up with Google
                  </Button>
                  <Typography variant="body2">
                    Already have an account? <Link component={RouterLink} to="/login">Login</Link>
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    By clicking Sign up with social media, you agree to our <Link href="/terms">Terms of Service</Link>, <Link href="/privacy">Privacy Policy</Link>, and <Link href="/cookie">Cookie Policy</Link>.
                  </Typography>
                  <Typography variant="caption" display="block">
                    Your data will be stored in the <b>US</b>.
                  </Typography>
                </>
              ) : (
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    required
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleInputChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    required
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    required
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password || "Must contain 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number & 1 special character."}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Get Started
                  </Button>
                  <Typography variant="caption" display="block" gutterBottom>
                    By clicking "Get Started", you agree to our <Link href="/terms">Terms of Service</Link>, <Link href="/cookie">Cookie Policy</Link>, and <Link href="/privacy">Privacy Policy</Link>.
                  </Typography>
                </form>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;



