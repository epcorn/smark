import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { home_page } from "../data/home_page_Data";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const images = [
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338161/S_mark/hero_banner/Hero_Banner_01_miv45f.webp",
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338162/S_mark/hero_banner/Hero_banner_02_xfaymc.webp",
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338170/S_mark/hero_banner/Hero_banner_03_qoz0me.png",
];

const PRIMARY_CYAN = "#3DCED4";
const ACCENT_GREEN = "#81D959";

// Motion wrappers
const MotionBox = motion.create(Box);
const MotionTypo = motion.create(Typography);
const MotionPaper = motion.create(Paper);

// Animation Variants
const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardPop = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Home_Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      {/* 1. HERO SLIDER BANNER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          height: { xs: "35vh", sm: "45vh", md: "500px" },
          minHeight: { xs: 260, sm: 360 },
          maxHeight: 600,
          width: "100%",
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {images.map((img, index) => {
          const isActive = currentIndex === index;

          return (
            <Box
              key={`${img}-${index}`}
              component="img"
              src={img}
              alt={`Smark Logo Hero ${index}`}
              aria-hidden={!isActive}
              loading={index === 0 ? "eager" : "lazy"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: { xs: "contain", md: "cover" },
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                willChange: "opacity",
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          );
        })}
      </Box>

      {/* 2. OVERLAYING CONTENT CONTAINER */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          bgcolor: "#ffffff",
          boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.08)",
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 }, pt: 5 }}>
          {/* Who We Are Section */}
          <MotionBox
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            sx={{
              px: { xs: 3, sm: 5 },
              py: 4,
              bgcolor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(0, 0, 0, 0.5)",
              mb: { xs: 5, md: 7 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
            >
              Who We Are
            </Typography>
            {Array.isArray(home_page?.paragraph1) &&
              home_page.paragraph1.map((paragraph, index) => (
                <Typography
                  key={index}
                  variant={index === 0 ? "subtitle1" : "body1"}
                  sx={{
                    fontWeight: index === 0 ? 600 : 400,
                    color: index === 0 ? "text.primary" : "text.secondary",
                    mb: 1.5,
                    lineHeight: 1.7,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            <iframe
              src="https://res.cloudinary.com/djc8opvcg/video/upload/v1786612749/S_mark/smark_video_sound_rqbho8.mp4"
              width="640"
              height="360"
              style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360', boxShadow: "0 10px 10px rgba(0,0,0,0.4)", borderRadius: 10 }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            />
          </MotionBox>

          {/* Highlights Section */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <MotionTypo
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variant="h4"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Highlights
            </MotionTypo>

            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2.5,
              }}
            >
              {home_page?.highlights?.map((text, idx) => (
                <MotionPaper
                  key={idx}
                  variants={cardPop}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 10px 24px rgba(0,0,0,0.08)",
                  }}
                  elevation={1}
                  sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 2,
                    borderLeft: `5px solid ${PRIMARY_CYAN}`,
                    bgcolor: "#ffffff",
                    height: "100%",
                  }}
                >
                  <FaCheckCircle
                    style={{
                      color: ACCENT_GREEN,
                      fontSize: "1.35rem",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      lineHeight: 1.4,
                    }}
                  >
                    {text}
                  </Typography>
                </MotionPaper>
              ))}
            </MotionBox>
          </Box>

          {/* Core Pillars Section */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <MotionTypo
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variant="h4"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Our Core Pillars
            </MotionTypo>

            <MotionBox
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              {home_page?.corePillars?.map((card, index) => (
                <MotionBox
                  key={card.id || index}
                  variants={cardPop}
                  sx={{
                    perspective: "1000px",
                    height: "220px",
                    "&:hover .flip-card-inner": {
                      transform: "rotateX(180deg)",
                    },
                  }}
                >
                  {/* FLIP INNER CONTAINER */}
                  <Box
                    className="flip-card-inner"
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      transformStyle: "preserve-3d",
                      borderRadius: 3,
                    }}
                  >
                    {/* FRONT SIDE */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: PRIMARY_CYAN,
                        borderRadius: 3,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: "#1E293B" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#334155", lineHeight: 1.6 }}
                      >
                        {card.desc}
                      </Typography>
                    </Box>

                    {/* BACK SIDE */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "#81d959",
                        borderRadius: 3,
                        transform: "rotateX(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon && (
                        <Box
                          component="img"
                          src={card.icon}
                          alt={card.title}
                          sx={{ maxHeight: "140px", objectFit: "contain" }}
                        />
                      )}
                    </Box>
                  </Box>
                </MotionBox>
              ))}
            </MotionBox>
          </Box>

          {/* Our Research Focus Section */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Our Research Focus
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "4fr 8fr" },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              <Box
                component="img"
                src={home_page?.focus?.img}
                alt="Research Focus"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "260px",
                  aspectRatio: "1/1",
                  borderRadius: 3,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  justifyContent: "center",
                }}
              >
                {home_page?.focus?.points?.map((po, index) => (
                  <MotionPaper
                    key={index}
                    variants={cardPop}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    elevation={0}
                    sx={{
                      px: 2, py: 1,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                      border: "1px solid #E2E8F0",
                      bgcolor: "#F8FAFC",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: 500 }}
                    >
                      {po}
                    </Typography>
                  </MotionPaper>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Industries We Serve Carousel Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1.5 }}
            >
              Industries We Serve
            </Typography>

            {home_page?.weServe?.para && (
              <Typography
                component="div"
                color="text.secondary"
                sx={{ lineHeight: 1.7, mb: 4 }}
                dangerouslySetInnerHTML={{ __html: home_page.weServe.para }}
              />
            )}

            <Box sx={{ mt: 2 }}>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={"auto"}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {home_page?.weServe?.points?.map((point, index) => (
                  <SwiperSlide key={index} style={{ width: "260px" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Box
                        component="img"
                        src={point.img}
                        alt={point.label}
                        sx={{
                          width: "100%",
                          height: "320px",
                          objectFit: "cover",
                          borderRadius: 3,
                          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 1.5, fontWeight: 600, color: "text.primary" }}
                      >
                        {point.label}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
        </Container>
      </Box>


    </Box>
  );
}

export default Home_Page;