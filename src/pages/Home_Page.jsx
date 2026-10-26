import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { home_page } from "../data/home_page_Data";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import FAQs from "../components/FAQs";
import HeroSlider from "../components/home/HeroSlider";

import "swiper/css";


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

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      {/* 1. HERO SLIDER BANNER */}
      <HeroSlider />

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
            component="section"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            sx={{
              width: "100%",
              // maxWidth: 1280,
              mx: "auto",
              px: { xs: 0, sm: 0, md: 0 },
              py: { xs: 5, md: 9 },
            }}
          >
            {/* Section heading */}
            <Box
              sx={{
                textAlign: "center",
                maxWidth: 850,
                mx: "auto",
                mb: { xs: 4, md: 6 },
              }}
            >
              <Typography
                component="p"
                variant="overline"
                sx={{
                  color: "#159DA5",
                  fontWeight: 700,
                  letterSpacing: 2,
                  mb: 1,
                }}
              >
                ABOUT SMARK
              </Typography>

              <Typography
                component="h2"
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#172B3A",
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.3rem",
                    md: "2.8rem",
                  },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Who We Are
              </Typography>

              <Box
                sx={{
                  width: 64,
                  height: 4,
                  bgcolor: "#81D959",
                  borderRadius: 5,
                  mx: "auto",
                }}
              />
            </Box>

            {/* Main content card */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                alignItems: "center",
                gap: { xs: 4, md: 6 },
                p: { xs: 2.5, sm: 4, md: 5 },
                bgcolor: "#FFFFFF",
                border: "1px solid #ad9a9a",
                borderRadius: { xs: 3, md: 4 },
                boxShadow: "0 12px 40px rgba(23, 43, 58, 0.07)",
                overflow: "hidden",
              }}
            >
              {/* Text content */}
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "#159DA5",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    letterSpacing: 0.5,
                    mb: 1.5,
                  }}
                >
                  {home_page.subtitle}
                </Typography>

                <Typography
                  component="h1"
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#172B3A",
                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.2rem",
                      md: "2.5rem",
                    },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  {home_page.mainTitle}
                </Typography>

                {Array.isArray(home_page?.paragraph1) &&
                  home_page.paragraph1.map((paragraph, index) => (
                    <Typography
                      component="p"
                      key={`${index}-${paragraph.slice(0, 20)}`}
                      sx={{
                        color: "#526170",
                        fontSize: {
                          xs: "0.95rem",
                          md: "1.02rem",
                        },
                        lineHeight: 1.9,
                        mb: 2,
                        "&:last-child": {
                          mb: 0,
                        },
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
              </Box>

              {/* Company video */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                  position: "relative",
                  aspectRatio: "16 / 9",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "#172B3A",
                  boxShadow: "0 12px 28px rgba(23, 43, 58, 0.16)",
                }}
              >
                <Box
                  component="video"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="S Mark company introduction video"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source
                    src="https://res.cloudinary.com/djc8opvcg/video/upload/v1786612749/S_mark/smark_video_sound_rqbho8.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </Box>
              </Box>
            </Box>
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

          {/* FAQs  */}
          <FAQs faqs={home_page.FAQ} />
        </Container>
      </Box>


    </Box>
  );
}

export default Home_Page;