import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { cardPop, fadeInUp } from '../data/motionAnimation';

const MotionBox = motion.create(Box);

const FounderMessage = ({ about }) => {
  if (!about?.STQ_Message) return null;

  const { msg, img, title, name } = about.STQ_Message;

  return (
    <Box sx={{ position: 'relative', my: 8 }}>
      {/* Quote Icon Placed Outside the Container Top-Left */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          left: { xs: 10, sm: 30 },
          color: '#0284c7',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 10,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <FaQuoteLeft size={100} />
      </Box>

      {/* Main Container */}
      <MotionBox
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        sx={{
          p: { xs: 3, sm: 5, md: 8 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          boxShadow: '0 20px 40px -15px rgba(14, 165, 233, 0.12)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Top Section: Title & Image aligned starting from the top */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 340px' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Left Column: Heading + Message Content */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: { xs: 3, md: 4 },
                color: '#0f172a',
                textAlign: { xs: 'center', md: 'left' },
                letterSpacing: '3.5px',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              }}
            >
              {title}
            </Typography>

            <Typography
              component="div"
              sx={{
                color: '#334155',
                textAlign: 'justify',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: 1.7, md: 1.9 },
                fontWeight: 400,
                '& p': { mb: 2 },
                '& strong': { color: '#0369a1', fontWeight: 700 },
              }}
              dangerouslySetInnerHTML={{ __html: msg }}
            />
          </Box>

          {/* Right Column: Founder Photo & Title Card (Aligned with heading start) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              mt: { md: '6px' }, // Subtle offset to perfectly sync top edge with heading text
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
                width: '100%',
                maxWidth: 320,
                textAlign: 'center',
              }}
            >
              <MotionBox
                variants={cardPop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                component="img"
                src={img}
                alt={name || 'Founder'}
                sx={{
                  width: '100%',
                  maxHeight: 360,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}
              >
                {name}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: '#0284c7',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mt: 0.5,
                  display: 'block',
                }}
              >
                Founder and Director
              </Typography>
            </Paper>
          </Box>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default FounderMessage;