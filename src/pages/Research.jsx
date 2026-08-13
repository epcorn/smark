import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  Button,
  Divider,
} from '@mui/material';

import {
  FaFlask,
  FaLeaf,
  FaLightbulb,
  FaHandshake,
  FaMicroscope,
  FaDiagramProject,
  FaArrowRight,
  FaCircleCheck,
} from 'react-icons/fa6';
import { GiDna1 } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { fadeInUp, imgAnimation } from '../data/motionAnimation';
import { research_data } from '../data/research_Data';

function Research() {
  const {
    banner,
    heading,
    tagline,
    summary,
    philosophy,
    scientificValidation,
    biomimicking,
    greenTechnology,
    researchAreas,
    collaboration,
    patentAndInnovation,
  } = research_data;

  const MotionBox = motion.create(Box);
  const MotionTypo = motion.create(Typography);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, md: 6 },
          pt: { xs: 3, md: 4 },
          pb: { xs: 6, md: 8 },
          overflow: "hidden",
        }}
      >
        {/* Banner Image Wrapper */}
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <MotionBox
            variants={imgAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            component="img"
            src={banner}
            alt="Research Banner"
            sx={{
              width: "100%",
              maxHeight: { xs: "320px", sm: "480px", md: "560px" },
              objectFit: "cover",
              borderRadius: { xs: "16px", md: "24px" },
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
              pointerEvents: "none",
            }}
          />
        </Container>

        {/* Hero Content */}
        <Container maxWidth="lg">
          <MotionTypo
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            {tagline}
          </MotionTypo>
          <MotionTypo
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variant="h6"
            sx={{
              maxWidth: "850px",
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.7,
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#475569",
            }}
          >
            {summary}
          </MotionTypo>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Philosophy Card */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 6,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: '#ffffff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Box sx={{ color: 'primary.main', display: 'flex' }}>
                <FaLightbulb size={28} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {philosophy.title}
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              {philosophy.description}
            </Typography>
          </Paper>
        </MotionBox>

        {/* Scientific Validation & Green Technology */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FaFlask size={24} />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {scientificValidation.title}
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  {scientificValidation.description}
                </Typography>

                {/* Main Content */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 3, sm: 4 },
                    flex: 1,

                    // Mobile
                    '@media (max-width: 600px)': {
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    },
                  }}
                >
                  {/* Left - Process List */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {scientificValidation.process.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              flexShrink: 0,
                              mt: '2px',
                            }}
                          >
                            <FaCircleCheck
                              color="#10b981"
                              size={16}
                            />
                          </Box>

                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Right - Image */}
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 190, md: 180 },
                      flexShrink: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',

                      '@media (max-width: 600px)': {
                        width: '100%',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={scientificValidation.img}
                      alt="Scientific Validation"
                      sx={{
                        width: '100%',
                        maxWidth: { xs: 260, sm: 190, md: 180 },
                        height: { xs: 180, sm: 190, md: 180 },
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 2,
                        scale: 1.2,
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </MotionBox>
          </Grid>

          {/* Green Technology */}
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Box sx={{ color: '#10b981', display: 'flex' }}>
                    <FaLeaf size={24} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {greenTechnology.title}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                  {greenTechnology.subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {greenTechnology.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {greenTechnology.explorationAreas.map((area, idx) => (
                    <Chip
                      key={idx}
                      label={area}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 1.5, borderColor: '#cbd5e1' }}
                    />
                  ))}
                </Box>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>

        {/* Biomimicking Section */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            mb: 8,
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${biomimicking.img}) center/cover no-repeat`,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              py: 5,
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 4, md: 10 },
              }}
            >
              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 5 }}>
                  <GiDna1 color="#4ade80" size={36} />
                  <Typography variant="h3" fontWeight={800} sx={{ color: '#ffffff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    {biomimicking.title}
                  </Typography>
                </Stack>

                <Typography variant="h6" sx={{ color: '#86efac', mb: 2, fontWeight: 600 }}>
                  {biomimicking.subtitle}
                </Typography>

                <Typography sx={{ color: '#f0fdf4', lineHeight: 1.7, fontSize: '1rem' }}>
                  {biomimicking.description}
                </Typography>
              </Box>

              {/* Icon */}
              <Box
                sx={{
                  flexShrink: 0,
                  p: 3,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255, 0.1)',
                  backdropFilter: 'blur(2px)',
                  color: 'lightgreen',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <FaMicroscope size={50} />
              </Box>
            </Box>
          </Paper>
        </MotionBox>

        {/* Research Areas */}
        <Box sx={{ mb: 8 }}>
          <MotionTypo
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variant="h4"
            sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
          >
            Research Areas
          </MotionTypo>
          <Grid container spacing={3}>
            {researchAreas.map((area, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <MotionBox
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  sx={{ height: '100%' }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: 3,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                        {area.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {area.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Patent & Innovation Journey */}
        <PatentInnovation MotionBox={MotionBox} patentAndInnovation={patentAndInnovation} />

        {/* Collaboration CTA Section */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              textAlign: 'center',
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <FaHandshake size={28} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {collaboration.title}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ maxWidth: '750px', mx: 'auto', mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              {collaboration.description}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
              {collaboration.opportunities.map((opp, idx) => (
                <Chip
                  key={idx}
                  label={opp}
                  sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600 }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              {collaboration.cta}
            </Button>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default Research;

function PatentInnovation({ MotionBox, patentAndInnovation }) {
  const [filled, setFilled] = useState({ id: "Research", status: false })
  return (
    <MotionBox
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper elevation={0} sx={{ p: { xs: 4, md: 5 }, mb: 8, borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Box sx={{ color: 'primary.main', display: 'flex' }}>
            <FaDiagramProject size={26} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {patentAndInnovation.title}
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {patentAndInnovation.subtitle} – {patentAndInnovation.description}
        </Typography>

        {/* Workflow Stepper Flow */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Innovation Pathway
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {patentAndInnovation.workflow.map((step, idx) => (
              <React.Fragment key={idx}>
                <Chip
                  label={`${idx + 1}. ${step}`}
                  color="primary"
                  variant={filled.id === step ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 600 }}
                  onClick={() => setFilled({ id: step, status: true })}
                />
                {idx < patentAndInnovation.workflow.length - 1 && (
                  <Box sx={{ color: 'text.disabled', display: 'flex' }}>
                    <FaArrowRight size={12} />
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Showcase Areas
        </Typography>
        <Grid container spacing={1.5}>
          {patentAndInnovation.showcaseItems.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FaCircleCheck color="#0284c7" size={14} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </MotionBox>
  )
}