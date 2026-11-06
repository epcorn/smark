import { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import ContactForm from '../components/ContactForm';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { MdCheckCircle } from 'react-icons/md';

const apply = [
  { key: "Students" },
  { key: "Fresher Graduates" },
  { key: "Postgraduates" },
  { key: "Research Scholars" },
  { key: "Experienced Professionals" },
  { key: "Candidates from All Educational Streams" },
];

const joinArr = [
  "Explore Career Opportunities",
  "Gain Practical Industry Experience",
  "Learn & Develop New Skills",
  "Work on Innovative Projects",
  "Grow with Industry Experts",
  "Build a Successful Career",
];

function Careers() {
  const [submitted, setSubmitted] = useState(false);

  const url = 'https://deposits-mysql-conducted-ignored.trycloudflare.com/send-application';

  const sendMail = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    console.log(formData);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      console.log(result);

      // Hide form and show success message card
      setSubmitted(true);

    } catch (error) {
      console.log(error);
      alert("Failed to submit application. Please try again later.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Hero Header Section */}
      <Box sx={{ mb: 6, px: { xs: 2, sm: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
        >
          Build a Safer, Healthier Future With S Mark
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: 'text.secondary', lineHeight: 1.7 }}
        >
          Join a pioneering team driven by scientific innovation, technical excellence, and a commitment to environmental health. Explore career opportunities, research partnerships, and growth paths at S Mark.
        </Typography>
      </Box>

      {/* Timelines Section */}
      <Box className='grid grid-cols-1 md:grid-cols-2 gap-6' sx={{ mb: 6 }}>
        {/* Who Can Apply Timeline */}
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant='h5' sx={{ fontWeight: 700, mb: 2, px: 2, color: '#31b3b7' }}>
            Who Can Apply?
          </Typography>
          <Timeline sx={{ p: 0, '& .MuiTimelineItem-root:before': { flex: 0, p: 0 } }}>
            {apply.map((app, idx) => (
              <TimelineItem key={idx}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: "#3DCED4" }} />
                  {idx < apply.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '10px', px: 2, fontWeight: 500 }}>
                  {app.key}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* Who Can Join Timeline */}
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant='h5' sx={{ fontWeight: 800, mb: 2, px: 2, color: '#64b73e' }}>
            Why Join Us?
          </Typography>
          <Timeline sx={{ p: 0, '& .MuiTimelineItem-root:before': { flex: 0, p: 0 } }}>
            {joinArr.map((item, idx) => (
              <TimelineItem key={idx}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: "#81D959" }} />
                  {idx < joinArr.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '10px', px: 2, fontWeight: 500 }}>
                  {item}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Box>

      {/* Conditional Rendering: Show Success Card or Contact Form */}
      {submitted ? (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 5, 
            textAlign: 'center', 
            borderRadius: 3, 
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            my: 6
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, color: 'success.main' }}>
            <MdCheckCircle size={60} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
            Thank You for Applying!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '500px', mx: 'auto', lineHeight: 1.6 }}>
            Your application has been submitted successfully. Our team will review your details and contact you soon.
          </Typography>
        </Paper>
      ) : (
        <ContactForm sendMail={sendMail} />
      )}
    </Container>
  );
}

export default Careers;