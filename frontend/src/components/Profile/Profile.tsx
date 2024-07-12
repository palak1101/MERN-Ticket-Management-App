import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  IconButton,
  Grid,
  Button,
  Box,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AvatarComponent from "./AvatarComponent";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const ProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile No is required"),
  company: Yup.string().required("Company is required"),
  role: Yup.string().required("Role is required"),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .test("passwords-match", "Passwords must match", function (value) {
      return value === this.parent.newPassword;
    })
    .required("Confirm Password is required"),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userFromLocalStorage = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        if (userFromLocalStorage && userFromLocalStorage.id) {
          setUserId(userFromLocalStorage.id);
          const response = await axios.get(
            `http://localhost:5000/api/users/${userFromLocalStorage.id}`
          );
          console.log(userFromLocalStorage);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleProfileSubmit = async (values: any) => {
    console.log(userId)
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      setUser(updatedUser);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handlePasswordSubmit = async (values: any, { resetForm } : any) => {
    const { currentPassword, newPassword } = values;
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/changePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: currentPassword, newPassword }),
        }
      );

      if (!response.ok) {
        alert("Invalid credentials.")
        throw new Error("Failed to change password");
      }

      const result = await response.json();
      console.log("Password changed successfully:", result);
      alert("Password updated successfully");
      resetForm();
    } catch (error) {
      console.error("Password change error:", error);
      alert("Failed to change password");
    }


  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const textFieldSx = {
    "& .MuiInputBase-root.Mui-disabled": {
      opacity: 1,
      color: "black",
      "& .MuiInputLabel-root": {
        color: "black",
      },
      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "black",
      },
    },
  };

  const StyledIconButton = styled(IconButton)({
    borderRadius: "50%",
    padding: "12px",
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  });

  return (
    <Container maxWidth="sm" className="ProfileContainer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        {user ? (
          <>
            <AvatarComponent name={user.fullName} />
            <Formik
              initialValues={{
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobileNumber,
                company: user.company,
                role: user.role,
              }}
              validationSchema={ProfileSchema}
              onSubmit={handleProfileSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {["fullName", "email", "mobile", "company", "role"].map(
                      (field) => (
                        <Grid item xs={12} key={field}>
                          <Field
                            as={TextField}
                            label={field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            name={field}
                            fullWidth
                            error={
                              touched[field as keyof typeof touched] &&
                              !!errors[field as keyof typeof errors]
                            }
                            helperText={
                              touched[field as keyof typeof touched] &&
                              errors[field as keyof typeof errors]
                            }
                            disabled={!isEditing}
                            sx={textFieldSx}
                          />
                        </Grid>
                      )
                    )}
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      {isEditing ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                      ) : (
                        <StyledIconButton onClick={handleEditClick}>
                          <EditIcon sx={{ color: "white" }} />
                        </StyledIconButton>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            <Box sx={{ mt: 4, width: "100%" }}>
              <Typography variant="h6">Change Password</Typography>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={PasswordSchema}
                onSubmit={handlePasswordSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {[
                        "currentPassword",
                        "newPassword",
                        "confirmPassword",
                      ].map((field) => (
                        <Grid item xs={12} key={field}>
                          <Field
                            as={TextField}
                            label={field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            name={field}
                            type="password"
                            fullWidth
                            error={
                              touched[field as keyof typeof touched] &&
                              !!errors[field as keyof typeof errors]
                            }
                            helperText={
                              touched[field as keyof typeof touched] &&
                              errors[field as keyof typeof errors]
                            }
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Change Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;



