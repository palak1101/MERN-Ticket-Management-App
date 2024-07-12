import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import contactImage from '/public/1600w-Ujh84PEPVI4.webp'; // Adjust the path to where the image is located

const ContactUs: React.FC = () => {
  return (
    <Container sx={{ p: 0 }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }} // Column layout on small screens, row layout on medium and larger screens
        alignItems="center"
        bgcolor="#ffffff" // White background color
        color="#2b3a42"
        borderRadius={2}
        boxShadow={3}
        maxWidth={850} // Set maximum width for responsiveness
        mx="auto" // Center align horizontally
        overflow="hidden" // Hide overflow content
        sx={{ py: 4 }} // Adjust padding to control height
      >
        {/* Image Section */}
        <Box display="flex" justifyContent="center" alignItems="center" height={{ xs: 'auto', md: '100%' }} width={{ xs: '100%', md: '50%' }} sx={{ borderRadius: '50px' }}>
          <img
            src="/images/image1.jpg"
            alt="Contact Us"
            style={{ width: '100%', height: 'auto', maxWidth: '100%', borderRadius: '80px' }}
          />
        </Box>

        {/* Contact Information Section */}
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex="1" p={2} sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="h4" gutterBottom  ml={-18}>
            Contact Us
          </Typography>
          <Box display="flex" alignItems="center" mb={1} sx={{ width: '100%' }}>
            <IconButton>
              <PhoneIcon color="primary" />
            </IconButton>
            <Typography ml={3} variant="body1">+1 919.481.1974</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1} sx={{ width: '100%' }}>
            <IconButton>
              <EmailIcon color="primary" />
            </IconButton>
            <Typography ml={3} variant="body1">sales@bolddesk.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <IconButton>
              <LocationOnIcon color="primary" />
            </IconButton>
            <Typography ml={3} variant="body1">
              HQ - Morrisville, USA <br />
              2501 Aerial Center Parkway Suite 111 <br />
              Morrisville, NC 27560, USA
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
