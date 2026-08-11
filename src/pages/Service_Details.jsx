import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { service_data } from '../data/service_Data';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Paper,
  Chip,
  Stack,
} from '@mui/material';

// React Icons imports
import { FaArrowLeft, FaRegCircleCheck } from 'react-icons/fa6';
import { IoCall } from 'react-icons/io5';
import { home_page } from '../data/home_page_Data';
import { cardPop, containerStagger, fadeInUp, fadeUp, imgAnimation, stagger } from '../data/motionAnimation';
import { motion } from 'framer-motion';

function Service_Details() {
  const { id } = useParams();
  const service = service_data[id];

  const MotionBox = motion.create(Box)
  if (!service) {
    return (
      <Container maxWidth="md" sx={{ py: 8, height: "68dvh", textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom className='typewriter'>
          Service Comming soon...
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<FaArrowLeft />}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const itemsProtected = service.whatItProtects || service.whyAudit;
  const keyTechOrComponents = service.keyComponents || service.usedTech;

  return (
    <Box sx={{ bgcolor: '#eef1f4', minHeight: '100vh', pb: 10 }}>
      {/* Header / Hero Section */}
      <Box
        sx={{
          mb: 6,
          overflow: "hidden",
          display: "flex", flexDirection: "column", gap: 8
        }}
      >
        {/* Ambient Background Glow Effect */}
        <MotionBox component='img'
          variants={imgAnimation}
          initial="hidden"
          whileInView="visible" src={service?.banner} />

        <MotionBox
          component="div"
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

            <MotionBox
              variants={fadeUp}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 4,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Chip
                label={service.heading}
                color="secondary"
                size="medium"
                sx={{
                  fontWeight: 700,
                  px: 1.5,
                  py: 0.5,
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  backdropFilter: "blur(4px)",
                }}
              />
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  maxWidth: "900px",
                  fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.5rem" },
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </Typography>
            </MotionBox>

            <MotionBox variants={fadeInUp}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  opacity: 0.9,
                  fontWeight: 300,
                  maxWidth: "850px",
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                }}
                dangerouslySetInnerHTML={{ __html: service.summery }}
              />
            </MotionBox>

          </Container>
        </MotionBox>
      </Box>

      <Container maxWidth="lg">
        {/* Key Objectives */}
        {service.keys && service.keys.length > 0 && (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 3, border: '1px solid #e2e8f0' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Key Objectives
            </Typography>
            <Grid container spacing={2}>
              {service.keys.map((key, index) => {
                const parts = key.split('–');
                const title = parts[0]?.trim();
                const desc = parts[1]?.trim();

                return (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      variants={cardPop}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Box sx={{ color: 'primary.main', mt: 0.5, display: 'flex' }}>
                          <FaRegCircleCheck size={20} />
                        </Box>

                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            {title}
                          </Typography>

                          {desc && (
                            <Typography
                              variant="body2"
                              sx={{ ml: 1 }}
                              color="text.secondary"
                            >
                              {desc}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}

        {/* Process / Approach Section */}
        {service.approach && service.approach.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
              Our Approach
            </Typography>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <Grid container spacing={3}>
                {service.approach.map((step, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div variants={cardPop} style={{ height: '100%' }}>
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
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 800,
                              fontSize: '1rem',
                            }}
                          >
                            0{index + 1}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, my: 1 }}>
                            {step.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {step.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        )}

        {/* Protection / Benefits & Technologies Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {itemsProtected && itemsProtected.length > 0 && (
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  What We Help Protect & Identify
                </Typography>
                <Stack spacing={2.5}>
                  {itemsProtected.map((item, idx) => (
                    <Box key={idx}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          )}

          {keyTechOrComponents && keyTechOrComponents.length > 0 && (
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  Key Components & Technology
                </Typography>
                <Stack spacing={2.5} divider={<Divider flexItem />}>
                  {keyTechOrComponents.map((tech, idx) => (
                    <Box key={idx}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {tech.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tech.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Service Summary Callout */}
        {service.whyService && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              mb: 8,
              borderRadius: 3,
              bgcolor: '#eff6ff',
              border: '1px solid #bfdbfe',
            }}
          >
            <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 700, mb: 2 }}>
              {service.whyService.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              {service.whyService.description}
            </Typography>
          </Paper>
        )}

        {/* CTA Banner */}
        {service.cta && (
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
            <Typography variant="h6" sx={{ opacity: 0.9, letterSpacing: 1, textTransform: 'uppercase', mb: 1 }}>
              {service.cta.tagline}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              {service.cta.headline}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<IoCall />}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              <a href={`tel:+${home_page.contact}`}>
                Contact Us Now
              </a>
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default Service_Details;