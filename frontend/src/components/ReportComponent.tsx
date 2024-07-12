import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Padding } from '@mui/icons-material';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);
const ReportComponent: React.FC = () => {
  const doughnutData = {
    labels: ['open', 'pending', 'solved', 'closed'],
    datasets: [
            {
              data: [6, 2, 3, 1],
              backgroundColor: ['#00BCD4', '#FF9800', '#4CAF50', '#3F51B5'],
              hoverBackgroundColor: ['#00ACC1', '#FB8C00', '#43A047', '#3949AB'],
            },
          ],
  };
  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'right' as const, // Ensure position is explicitly typed as 'right'
      },
    },
    aspectRatio: 1.5,
  };
  const legendStyles = {
    paddingInlineStart: '20px', // Add padding to the left side of the legend
  };
  const lineOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#858585',
          font: {
            weight: 'bold' as 'bold',
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tickets',
          color: '#858585',
          font: {
            weight: 'bold' as 'bold',
            size: 16,
          },
        },
      },
    },
  };
  const barOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Priority',
          color: '#858585',
          font: {
            weight: 'bold' as 'bold',
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tickets',
          color: '#858585',
          font: {
            weight: 'bold' as 'bold',
            size: 16,
          },
        },
      },
    },
  };
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
          label: 'Tickets Created',
          data: [30, 20, 25, 30, 25, 15, 0, 0, 0, 0, 0, 0], // Example data, replace with actual values
          borderColor: '#00BCD4',
          backgroundColor: 'rgba(0, 188, 212, 0.2)',
        },
        {
          label: 'Tickets Closed',
          data: [10, 15, 20, 25, 20, 10, 0, 0, 0, 0, 0, 0], // Example data, replace with actual values
          borderColor: '#3F51B5',
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
        },
      ],
  };
  const barData = {
    labels: ['low', 'high', 'urgent', 'medium'],
    datasets: [
      {
        label: 'Violated',
        data: [5, 10, 20, 30],
        backgroundColor: '#86BEF9',
      },
      {
        label: 'Non-Violated',
        data: [10, 20, 15, 25],
        backgroundColor: '#1A79EB',
      },
    ],
  };
  return (
    <Grid container spacing={3} mt={10}>
      <Grid item xs={12} md={6} >
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Tickets Statistics
            </Typography>
            <Box   height={300} width={400} display="flex" justifyContent="center" alignItems="center" >
              <Doughnut data={doughnutData}  options={doughnutOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
              Ticket created vs closed
            </Typography>
            <Box height={300}>
              <Line data={lineData}  options={lineOptions}/>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              SLA Violated/Non-Violated tickets by priority
            </Typography>
            <Box height={300} width={600}>
              <Bar data={barData} options={barOptions}/>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default ReportComponent;