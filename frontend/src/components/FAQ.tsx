import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    margin: '20px', 
    maxWidth: '1200px', 
    backgroundColor: '#f0f0f0',
    borderRadius: theme.spacing(1),
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
        margin: '10px', 
    },
}));

const FAQHeading = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: theme.spacing(1),
    textTransform: 'uppercase',
}));

const AccordionWrapper = styled(Accordion)(({ theme }) => ({
    width: '100%',
    maxWidth: 800,
    marginBottom: theme.spacing(2),
    '&:before': {
        display: 'none',
    },
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
}));

const AccordionSummaryWrapper = styled(AccordionSummary)(({ theme }) => ({
    alignItems: 'center',
    '& .MuiTypography-root': {
        flexGrow: 1,
        fontSize: '1.2rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#3498db',
    },
}));

const FAQ: React.FC = () => {
    return (
        <FAQContainer>
            <FAQHeading variant="h4" gutterBottom>
                Frequently Asked Questions

            </FAQHeading>
            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1">How do I submit a support ticket?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        Navigate to the homepage and locate the "Create Ticket" button. Click on it to proceed to the ticket creation page, where you can enter all the necessary details regarding your inquiry or issue. After completing the form, submit your ticket for further processing and assistance.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="body1">What information should I include in my ticket?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        In the ticket creation process, please provide the following details: requester's name, subject of the ticket, description of the issue, priority level of the issue, and type of issue. Ensure all fields are accurately filled out to facilitate prompt and effective resolution of your request.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="body1">How can I check the status of my ticket?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        To check the status of your ticket, navigate to the ticketing section where you can view the current status. This allows you to easily monitor the progress and ensure timely resolution of your support ticket.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography variant="body1">What are the response time expectations for support tickets?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        Response time expectations for support tickets typically vary based on the severity of the issue:
                        <ol>
                            <li>Critical Issues: Response time within 15 minutes.</li>
                            <li>High Priority: Response time within 30 minutes.</li>
                            <li>Medium Priority: Response time within 45 minutes.</li>
                            <li>Low Priority: Response time within one day.</li>
                        </ol>
                        These times can vary depending on the service level agreements (SLAs) negotiated with the customer or client.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography variant="body1">What should I do if I need urgent assistance outside of regular support hours?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        If you encounter any issues, go to the help section and select "Contact Support." You will find the necessary details, such as email and phone number, for regular support assistance.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6a-content"
                    id="panel6a-header"
                >
                    <Typography variant="body1">Can I provide feedback on my support experience?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        To provide feedback, navigate to the Home Page where you will find the feedback option. Please ensure that customers can provide valuable feedback to help enhance support services and overall customer experience.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>

            <AccordionWrapper>
                <AccordionSummaryWrapper
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel7a-content"
                    id="panel7a-header"
                >
                    <Typography variant="body1">How can I reset my password for the help desk application?</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails>
                    <Typography>
                        First, go to the Profile page where you will find instructions on how to reset passwords or recover access credentials necessary for using the help desk application. Please ensure a secure and straightforward process for resetting your password and regaining access to the help desk application.
                    </Typography>
                </AccordionDetails>
            </AccordionWrapper>
        </FAQContainer>
    );
};

export default FAQ;
