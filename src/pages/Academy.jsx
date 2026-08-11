import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { academyData } from "../data/academy_Data";
import { motion } from "framer-motion";
import {
  fadeInUp,
  imgAnimation,
  slideIn,
  containerStagger,
  fadeUp,
} from "../data/motionAnimation";
import { VscGraphLine } from "react-icons/vsc";
import { PiCertificateDuotone } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { FaBookTanakh } from "react-icons/fa6";
import { GiArchiveResearch } from "react-icons/gi";

const certificationIcons = [VscGraphLine, PiCertificateDuotone, FaRegHandshake, FaBookTanakh, GiArchiveResearch]

// Vintage Theme Palette & Typography Constants
const VINTAGE_BG = "#FBF9F5"; // Soft warm cream / parchment
const VINTAGE_PAPER = "#F5F2EB"; // Subtle muted paper card background
const DEEP_CHARCOAL = "#2B2825"; // Deep warm off-black text
const MUTED_SAGE = "#5A7061"; // Subtle vintage sage green
const TERRACOTTA_ACCENT = "#A6634B"; // Soft earthy terracotta highlight
const WARM_BORDER = "rgba(166, 99, 75, 0.15)"; // Soft warm divider color

function Academy() {
  const data = academyData;
  const MotionBox = motion.create(Box);

  return (
    <Box
      sx={{
        bgcolor: VINTAGE_BG,
        color: DEEP_CHARCOAL,
        pb: 2,
        minHeight: "100vh",
        overflow: "hidden"
      }}>
      <Box className='relative'>
        {/* Banner Image with Vintage Tone */}
        <MotionBox
          variants={imgAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          component="img"
          src={data?.banner}
          loading='lazy'
          sx={{
            maxHeight: "65dvh",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.18) contrast(1.02) brightness(0.95)",
            borderBottom: `1px solid ${WARM_BORDER}`,
          }}
        />

      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Title & Intro */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily:
                '"Playfair Display", "Georgia", "Times New Roman", serif',
              fontWeight: 700,
              mt: 3,
              mb: 1,
              color: DEEP_CHARCOAL,
              letterSpacing: "-0.02em",
            }}>
            {data.title}
          </Typography>

          <Box
            sx={{
              pl: 2.5,
              borderLeft: `3px solid ${TERRACOTTA_ACCENT}`,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}>
            <Typography
              sx={{ lineHeight: 1.7, fontSize: "1.05rem", color: "#4A4642" }}>
              {data.header.para1}
            </Typography>
            <Typography
              sx={{ lineHeight: 1.7, fontSize: "1.05rem", color: "#4A4642" }}>
              {data.header.para2}
            </Typography>
            <Typography
              sx={{ lineHeight: 1.7, fontSize: "1.05rem", color: "#4A4642" }}>
              {data.header.para3}
            </Typography>
          </Box>
        </MotionBox>

        {/* About the Academy Section */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ mb: 7 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 600,
              mb: 3,
              color: DEEP_CHARCOAL,
            }}>
            About the Academy
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              bgcolor: VINTAGE_PAPER,
              borderRadius: "12px",
              border: `1px solid ${WARM_BORDER}`,
              overflow: "hidden",
            }}>
            <MotionBox
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              component="img"
              src={data.about.img}
              sx={{
                float: { sm: "left" },
                width: { xs: "100%", sm: "42%" },
                maxWidth: 380,
                aspectRatio: "16 / 9",
                mr: { sm: 3.5 },
                mb: 2,
                objectFit: "cover",
                borderRadius: "8px",
                filter: "sepia(0.12) contrast(1.05)",
                boxShadow: "0 8px 20px rgba(43, 40, 37, 0.08)",
              }}
            />
            <Typography
              sx={{
                mb: 2,
                lineHeight: 1.7,
                fontSize: "1rem",
                color: "#3A3734",
              }}>
              {data.header.para1}
            </Typography>
            <Typography
              sx={{
                mb: 2,
                lineHeight: 1.7,
                fontSize: "1rem",
                color: "#3A3734",
              }}>
              {data.header.para2}
            </Typography>
            <Typography
              sx={{ lineHeight: 1.7, fontSize: "1rem", color: "#3A3734" }}>
              {data.header.para3}
            </Typography>
          </Paper>
        </MotionBox>

        {/* Our Focus Section */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ mb: 7 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 600,
              mb: 3,
              color: DEEP_CHARCOAL,
            }}>
            Our Focus
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
              gap: 4,
              alignItems: "center",
            }}>
            {/* Staggered List */}
            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              component="ul"
              sx={{ p: 0, m: 0, listStyle: "none" }}>
              {data.ourFocus.map((focusItem, index) => (
                <MotionBox
                  key={index}
                  variants={fadeInUp}
                  component="li"
                  sx={{
                    mb: 1.5,
                    p: 2,
                    bgcolor: VINTAGE_PAPER,
                    borderRadius: "8px",
                    borderLeft: `4px solid ${MUTED_SAGE}`,
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: DEEP_CHARCOAL,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: TERRACOTTA_ACCENT,
                      display: "inline-block",
                    }}
                  />
                  {focusItem}
                </MotionBox>
              ))}
            </MotionBox>

            {/* Focus Image */}
            <MotionBox
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              component="img"
              src={data.focusImg}
              sx={{
                width: "100%",
                maxHeight: 320,
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: "12px",
                filter: "sepia(0.15) contrast(1.02)",
                boxShadow: "0 8px 24px rgba(43, 40, 37, 0.08)",
                border: `1px solid ${WARM_BORDER}`,
              }}
            />
          </Box>
        </MotionBox>

        {/* Training Programs Section */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 600,
              mb: 1.5,
              color: DEEP_CHARCOAL,
            }}>
            Training Programs
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "#4A4642",
              mb: 4,
              lineHeight: 1.7,
              maxWidth: "850px",
            }}>
            {data.trainingPro.overview}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: VINTAGE_PAPER,
              borderRadius: "12px",
              border: `1px solid ${WARM_BORDER}`,
            }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 600,
                color: TERRACOTTA_ACCENT,
                mb: 3,
                pb: 1,
                borderBottom: `1px solid ${WARM_BORDER}`,
              }}>
              Key Training Areas
            </Typography>

            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}>
              {data.trainingPro.keys.map((key, idx) => (
                <MotionBox
                  key={idx}
                  variants={fadeInUp}
                  sx={{
                    p: 2.5,
                    bgcolor: VINTAGE_BG,
                    borderRadius: "8px",
                    border: `1px solid ${WARM_BORDER}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: MUTED_SAGE,
                      transform: "translateY(-2px)",
                    },
                  }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: DEEP_CHARCOAL,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>
                    <Box
                      component="span"
                      sx={{
                        color: MUTED_SAGE,
                        fontSize: "1.2rem",
                        lineHeight: 1,
                      }}>
                      ✦
                    </Box>
                    {key.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#5A5550",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                    }}>
                    {key.desc}
                  </Typography>
                </MotionBox>
              ))}
            </MotionBox>
          </Paper>
        </MotionBox><MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ my: 6 }}
        >
          {/* Course Title & Overview */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              mb: 1.5,
              color: DEEP_CHARCOAL,
              letterSpacing: '-0.01em',
            }}
          >
            {data.certification.course.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1.05rem',
              color: '#4A4642',
              mb: 4,
              lineHeight: 1.7,
              maxWidth: '850px',
            }}
          >
            {data.certification.course.desc}
          </Typography>

          {/* Main Certification Card Container */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4.5 },
              bgcolor: VINTAGE_PAPER,
              borderRadius: '12px',
              border: `1px solid ${WARM_BORDER}`,
              mb: 5,
            }}
          >
            {/* Included Programs Subheading */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 600,
                color: TERRACOTTA_ACCENT,
                mb: 3,
                pb: 1,
                borderBottom: `1px solid ${WARM_BORDER}`,
              }}
            >
              {data.certification.course.incs.title}
            </Typography>

            {/* Included Programs List */}
            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              component="ul"
              sx={{
                p: 0,
                m: 0,
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 5,
              }}
            >
              {data.certification.course.incs.keys.map((key, idx) => (
                <MotionBox
                  key={idx}
                  variants={fadeInUp}
                  component="li"
                  sx={{
                    p: 2,
                    bgcolor: VINTAGE_BG,
                    borderRadius: '8px',
                    border: `1px solid ${WARM_BORDER}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: DEEP_CHARCOAL,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: MUTED_SAGE,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: MUTED_SAGE,
                      fontSize: '1.1rem',
                      lineHeight: 1,
                    }}
                  >
                    ✦
                  </Box>
                  {key}
                </MotionBox>
              ))}
            </MotionBox>

            {/* Certification Benefits Section */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 600,
                color: TERRACOTTA_ACCENT,
                mb: 3,
                pb: 1,
                borderBottom: `1px solid ${WARM_BORDER}`,
              }}
            >
              Certification Benefits
            </Typography>

            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              {data.certification.benefit.map((ben, idx) => {
                const IconComp = certificationIcons[idx]
                return (
                  <MotionBox
                    key={idx}
                    variants={fadeInUp}
                    sx={{
                      p: 2.5,
                      bgcolor: VINTAGE_BG,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${MUTED_SAGE}`,
                      borderTop: `1px solid ${WARM_BORDER}`,
                      borderRight: `1px solid ${WARM_BORDER}`,
                      borderBottom: `1px solid ${WARM_BORDER}`,
                    }}
                  >
                    <Box sx={{ display: 'inline-block', fontSize: "2rem", mx: 2 }}>
                      <IconComp />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "inline",
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: DEEP_CHARCOAL,
                        mb: 1,
                      }}
                    >
                      {ben.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#5A5550', lineHeight: 1.6, fontSize: '0.95rem' }}
                    >
                      {ben.desc}
                    </Typography>
                  </MotionBox>
                )
              })}
            </MotionBox>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default Academy;
