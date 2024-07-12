import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Modal,
  Grid,
  Container,
  TextField
} from '@mui/material';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { QuestionAnswerRounded } from '@mui/icons-material';
import { CancelRounded, CheckCircleRounded, DoDisturbAltRounded, FolderOpenRounded, HourglassTopRounded, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const doughnutOptions = {
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      position: 'right' as const, 
      labels: {
        padding: 20, 
        usePointStyle: true, 
      },
    },
  },
};



const Home: React.FC = () => {

  const titles = ["Open", "Pending", "Resolved", "Closed"];
  const icons = [FolderOpenRounded, HourglassTopRounded, CheckCircleRounded, DoDisturbAltRounded];
  const backgroundColors = ['#2B84EB', '#DE2567', '#4BA750', '#333338'];
  const indexes = [1, 2, 3, 4];
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [rating, setRating] = useState<number | null>(4); // State to manage rating input
  const [feedbackText, setFeedbackText] = useState(''); // State to manage feedback text input
  


  const [doughnutData, setDoughnutData] = useState({
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [0, 0, 0], // Initial data placeholders
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const [positivePercentage, setPositivePercentage] = useState('0.00');
  const [negativePercentage, setNegativePercentage] = useState('0.00');
  const [neutralPercentage, setNeutralPercentage] = useState('0.00');

  

  
  // Function to handle opening the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle rating change
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue);
  };

  // Function to handle text input change
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFeedbackText(event.target.value);
  };

  // Function to send feedback data to backend
  const sendFeedback = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/feedbacks', {
        rating,
        feedbackDescription: feedbackText,
      });

      if (response.status === 201) {
        // Show success notification
        toast.success('Feedback sent successfully', {
          position: "top-right",
          autoClose: 3000, // Close the notification after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        handleClose(); // Close modal after successful feedback submission
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      // Show error notification
      toast.error('Failed to send feedback', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbacks/counts'); // Adjust URL as per your backend route
        const { negativeFeedbackCount, neutralFeedbackCount, positiveFeedbackCount } = response.data;
        // console.log(negativeFeedbackCount + " "+ neutralFeedbackCount+ " "+ positiveFeedbackCount);
        

        const total = positiveFeedbackCount + negativeFeedbackCount + neutralFeedbackCount;
        const positivePercentage = ((positiveFeedbackCount / total) * 100).toFixed(2);
        const negativePercentage = ((negativeFeedbackCount / total) * 100).toFixed(2);
        const neutralPercentage = ((neutralFeedbackCount / total) * 100).toFixed(2);

        // Update doughnutData with fetched counts
        setDoughnutData({
          labels: ['Positive', 'Negative', 'Neutral'],
          datasets: [
            {
              data: [positiveFeedbackCount, negativeFeedbackCount, neutralFeedbackCount],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        });
        
        //Percentage calculation-
        setPositivePercentage(positivePercentage);
        setNegativePercentage(negativePercentage);
        setNeutralPercentage(neutralPercentage);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'auto', backgroundColor: '#f0f0f0' }}>
      <ToastContainer />
      <Container maxWidth="xl" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <Typography variant="h5" style={{ textAlign: 'start', marginBottom: '20px' }}>Assigned Tickets:</Typography>

        <Grid container spacing={3}>
          {titles.map((title, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                  },
                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: backgroundColors[index],
                      width: 70,
                      height: 70,
                      marginBottom: 2,
                    }}
                  >
                    {React.createElement(icons[index], { style: { fontSize: '38px', color: 'white' } })}
                  </Avatar>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 48, fontWeight: 'bold' }}>
                      {indexes[index]}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={5}>
          <Typography variant="h5" style={{ textAlign: 'start', marginBottom: '20px' }}>Customer Satisfaction:</Typography>

          <Grid container spacing={3}>
            {/* Neutral Section */}
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                  },
                }}
              >
                <SentimentNeutralIcon sx={{ fontSize: 40, margin: 2, color: 'disabled' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ textAlign:'center'}}>Neutral</Typography>
                  <Typography variant="h5" sx={{ textAlign:'center'}}>{neutralPercentage}%</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Positive Section */}
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                  },
                }}
              >
                <SentimentSatisfiedAltIcon sx={{ fontSize: 40, margin: 2, color: 'success.main' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ textAlign:'center'}}>Positive</Typography>
                  <Typography variant="h5"sx={{ textAlign:'center'}}>{positivePercentage}%</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Negative Section */}
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                  },
                }}
              >
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40, margin: 2, color: 'error.main' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ textAlign:'center'}}>Negative</Typography>
                  <Typography variant="h5" sx={{ textAlign:'center'}}>{negativePercentage}%</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5}>
          <Typography variant="h5" style={{ textAlign: 'start', marginBottom: '20px' }}>Customer Feedback Statistics</Typography>

          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
              },
            }}
          >
            <CardContent>
              <Box width="100%" height={200} display="flex" justifyContent="center" alignItems="center">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box mt={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ width: '150px', height: '40px', borderRadius: '20px', bgcolor: '#1876D1', color: '#fff', marginRight: '20px' }}
            onClick={handleOpen}
            endIcon={<QuestionAnswerRounded />}
          >
            Feedback
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#fff',
              color: '#000',
              boxShadow: 24,
              p: 4,
              borderRadius: 4,
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{ margin: '20px 0' }}>
                Leave Feedback
              </Typography>

              <p>Rating:</p>
              <StyledRating
                name="highlight-selected-only"
                defaultValue={4}
                value={rating}
                onChange={handleRatingChange}
                IconContainerComponent={IconContainer}
                getLabelText={(value: number) => customIcons[value].label}
                highlightSelectedOnly
              />

              <TextField
                id="feedback-text"
                label="Describe"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={feedbackText}
                onChange={handleTextChange}
                InputProps={{
                  placeholder: 'Enter your feedback...',
                }}
                InputLabelProps={{
                  sx: { color: '#fff' },
                }}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" endIcon={<Send />} color="success" sx={{ width: '100px', borderRadius: '20px' }}  onClick={sendFeedback} >
                  Send
                </Button>
                <Button onClick={handleClose} endIcon={<CancelRounded />} variant="contained" sx={{ backgroundColor: 'red', color: '#fff', marginLeft: '20px', width: '100px', borderRadius: '20px' }}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
