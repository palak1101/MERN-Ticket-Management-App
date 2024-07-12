import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, TextField, Divider, IconButton } from '@mui/material';
import { ImportExport, Add, FilterList } from '@mui/icons-material';

const Contacts = () => {
  return (
    <Box display="flex" height="100vh">
      <Box width="300px" borderRight="1px solid #ddd" p={2}>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
        />
        <Button size="small" sx={{ mt: 2 }}>Create</Button>
        <List>
          <Box component="div" sx={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <ListItemText primary="Active Contacts" />
          </Box>
          <Box component="div" sx={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#e0e0ff' }}>
            <ListItemText primary="All Contacts" />
          </Box>
          <Box component="div" sx={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <ListItemText primary="Verified Contacts" />
          </Box>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Unverified Contacts 0" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Blocked Contacts 0" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Deleted Contacts 0" />
          </ListItem>
        </List>
      </Box>
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box display="flex" mb={2}>
          <Button
            variant="contained"
            startIcon={<ImportExport />}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mr: 1 }}
          >
            Add Contact
          </Button>
          <IconButton color="primary">
            <FilterList />
          </IconButton>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">No contacts found</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;

