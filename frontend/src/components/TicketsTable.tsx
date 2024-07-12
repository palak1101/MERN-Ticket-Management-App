import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

interface Ticket {
  id: number;
  title: string;
  summary: string;
  priority: string;
  createdDate: string;
  dueDate: string;
  status: string;
}

const sampleTickets: Ticket[] = [
  { id: 1, title: 'Ticket 1', summary: 'Summary 1', priority: 'High', createdDate: '2024-07-01', dueDate: '2024-07-10', status: 'Open' },
  { id: 2, title: 'Ticket 2', summary: 'Summary 2', priority: 'Medium', createdDate: '2024-07-02', dueDate: '2024-07-11', status: 'Pending' },
  { id: 3, title: 'Ticket 3', summary: 'Summary 3', priority: 'Low', createdDate: '2024-07-03', dueDate: '2024-07-12', status: 'Solved' },
  { id: 4, title: 'Ticket 4', summary: 'Summary 4', priority: 'High', createdDate: '2024-07-04', dueDate: '2024-07-13', status: 'Closed' },
];

const TicketsTable: React.FC = () => {
  const [filter, setFilter] = useState('All Tickets');

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  const filteredTickets = sampleTickets.filter(ticket => {
    if (filter === 'All Tickets') return true;
    return ticket.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <Box display="flex" flexDirection="row" p={2} mt={5}>
      <Box flex="0 0 200px" mr={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>All Tickets</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="All Tickets">
            <MenuItem value="All Tickets">All Tickets</MenuItem>
            <MenuItem value="Open">Open Tickets</MenuItem>
            <MenuItem value="Pending">Pending Tickets</MenuItem>
            <MenuItem value="Solved">Solved Tickets</MenuItem>
            <MenuItem value="Closed">Closed Tickets</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box flex="1">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Ticket id</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Title</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Summary</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Priority</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Created date</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Due date</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell >{ticket.id}</TableCell>
                  <TableCell >{ticket.title}</TableCell>
                  <TableCell >{ticket.summary}</TableCell>
                  <TableCell >{ticket.priority}</TableCell>
                  <TableCell >{ticket.createdDate}</TableCell>
                  <TableCell >{ticket.dueDate}</TableCell>
                  <TableCell >{ticket.status}</TableCell>
                </TableRow>
              ))}
              {filteredTickets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1">No tickets found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TicketsTable;
