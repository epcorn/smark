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
    <MotionBox
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      sx={{
        my: 8,
        p: { xs: 3, sm: 5, md: 8 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
        border: '1px solid #bae6fd',
        boxShadow: '0 20px 40px -15px rgba(14, 165, 233, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Decorative Background Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 30,
          color: '#0284c7',
          opacity: 0.08,
          display: { xs: 'none', md: 'block' },
          pointerEvents: 'none',
        }}
      >
        <FaQuoteLeft size={160} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          // gap: { xs: 4, md: 6 },
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Title Header */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            gridColumn: { xs: '1', md: 'span 3' },
            color: '#0f172a',
            mb: 3,
            textAlign: { xs: "center", md: "left" },
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
          }}
        >
          {title}
        </Typography>

        {/* Message Content */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
            order: { xs: 2, md: 1 },
          }}
        >
          <Typography
            component="div"
            sx={{
              color: '#334155',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: { xs: 1.7, md: 1.9 },
              fontWeight: 400,
              '& p': { mb: 2 },
              '& strong': { color: '#0369a1', fontWeight: 700 },
            }}
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </Box>

        {/* Founder Photo & Title Card */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
            width: '100%',
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
              maxWidth: 300,
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
                maxHeight: 340,
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
  );
};

export default FounderMessage;