import React from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const CreateTicket: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#ffffff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '90%',
        maxWidth: '500px', // Optional: Limit maximum width
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create Ticket
      </Typography>
      <form noValidate autoComplete="off" style={{ width: '100%' }}>
        <TextField
          required
          fullWidth
          label="Requester"
          margin="dense"
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          required
          fullWidth
          label="Subject"
          margin="dense"
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          required
          fullWidth
          label="Description"
          multiline
          rows={4}
          margin="dense"
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
        <FormControl fullWidth margin="dense" variant="outlined" style={{ marginBottom: '16px' }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select labelId="priority-label" label="Priority" defaultValue="">
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel id="category-label">Category</InputLabel>
          <Select labelId="category-label" label="Category" defaultValue="">
            <MenuItem value="technical">Technical</MenuItem>
            <MenuItem value="general">General Inquiry</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateTicket;
