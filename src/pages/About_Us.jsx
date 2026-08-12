import React from "react";
import { Box, Card, CardContent, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { about_us_Data } from "../data/about_us_Data";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { FaRegHandshake, FaBullseye, FaRegEye } from "react-icons/fa6";
import { MdBalance } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import {
  cardPop,
  containerStagger,
  fadeInUp,
  imgAnimation,
  slideIn,
} from "../data/motionAnimation";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import FounderMessage from "../components/FounderMessage";

// Array of icons matching core values (with fallback)
const icons = [
  VscLightbulbSparkle,
  GoGoal,
  IoShieldCheckmarkOutline,
  FaRegHandshake,
  MdBalance,
  FaGears,
];

const vmIcons = [FaRegEye, GoGoal];

const MotionBox = motion.create(Box);
const MotionTypo = motion.create(Typography);
const MotionCard = motion.create(Card);

// Parent Container Stagger Variant

function About_Us() {
  const about = about_us_Data;

  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default", pb: 8, overflowX: "hidden" }}>
      {/* Hero Banner Section */}
      <MotionBox
        component="img"
        src={about.banner}
        alt="About Us Banner"
        variants={imgAnimation}
        viewport={{ once: true }}
        initial={"hidden"}
        whileInView="visible"
        sx={{
          height: { xs: 200, sm: 350, md: 450 },
          width: "100%",
          objectFit: "",
          display: "block",
          mb: { xs: 4, md: 6 },
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 } }}>
        {/* Overview Section */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            mb: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
          }}>
          {/* Text Column */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <MotionTypo
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              }}>
              Company Overview
            </MotionTypo>

            <MotionTypo
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.975rem", sm: "1.05rem" },
                lineHeight: 1.75,
              }}>
              {about.overview}
            </MotionTypo>
          </Box>

          {/* Circular Image Container */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 380px" },
              width: { xs: "280px", sm: "340px", md: "380px" },
              height: { xs: "280px", sm: "340px", md: "380px" },
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
            }}>
            <Box
              component="img"
              src={about.overviewImg}
              alt="Company Overview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </MotionBox>

        {/* founder message */}
        <FounderMessage about={about} />

        {/* Vision & Mission Section */}
        <MotionBox
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 3, md: 4 },
            mb: { xs: 6, md: 8 },
          }}>
          {[about.our_vision, about.our_mission].map((item, index) => {
            const IconComp = vmIcons[index];

            return (
              <MotionCard
                key={index}
                elevation={0}
                variants={slideIn}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(22, 215, 221,0.4)",
                }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: "1px solid #009da3",
                  bgcolor: "background.paper",
                }}>
                <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1 }}>
                  <Box
                    sx={{
                      fontSize: "2.25rem",
                      mb: 1.5,
                      color: index % 2 === 0 ? "#06b6d4" : "#81d959",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    {IconComp && <IconComp />}
                  </Box>

                  <MotionTypo
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: index % 2 === 0 ? "#0891b2" : "#81d959",
                    }}>
                    {item.title}
                  </MotionTypo>

                  <MotionTypo
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </MotionTypo>
                </CardContent>
              </MotionCard>
            );
          })}
        </MotionBox>

        {/* Our Journey Section */}
        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: "action.hover",
            mb: { xs: 6, md: 8 },
          }}>
          <MotionTypo
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}>
            Our Journey
          </MotionTypo>
          <MotionTypo
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            {about.our_journey}
          </MotionTypo>
        </MotionBox>

        {/* Core Values Section */}
        <Box sx={{ mb: 4 }}>
          <MotionTypo
            variant="h4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{
              fontWeight: 700,
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}>
            What Defines SMark
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
                sm: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}>
            {about?.core_value?.map((c, i) => {
              // Safe fallback so component never throws an error if array length mismatch
              const IconComponent =
                icons[i % icons.length] || VscLightbulbSparkle;

              return (
                <MotionCard
                  key={c.title || i}
                  elevation={1}
                  variants={cardPop}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    height: "100%",
                    borderRadius: 2.5,
                    border: "1px solid #009da3",
                    boxShadow: "0px 2px 10px rgba(22, 215, 221, 0.15)",
                    transition:
                      "background-color 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(129, 217, 89, 0.3)",
                      boxShadow: "0px 2px 10px rgba(22, 215, 221, 0.2)",
                    },
                  }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: "#22d3ee", fontSize: "3rem", mb: 1.5 }}>
                      <IconComponent />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {c.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}>
                      {c.desc}
                    </Typography>
                  </CardContent>
                </MotionCard>
              );
            })}
          </MotionBox>
        </Box>

        {/* Commitments Section */}
        <Box sx={{ mb: { xs: 6, md: 8 }, py: 5 }}>
          <MotionTypo
            variant="h4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.75rem", sm: "2.25rem" },
            }}>
            Our Commitments
          </MotionTypo>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
            }}>
            <Box
              sx={{
                borderLeft: "4px solid",
                borderColor: "#22d3ee",
                pl: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              <MotionTypo
                variant="body1"
                sx={{ color: "text.primary", lineHeight: 1.7 }}>
                {about?.commits?.p1}
              </MotionTypo>
              <MotionTypo
                variant="body1"
                sx={{ color: "text.primary", lineHeight: 1.7 }}>
                {about?.commits?.p2}
              </MotionTypo>
              <MotionTypo
                variant="body1"
                sx={{ color: "text.primary", lineHeight: 1.7 }}>
                {about?.commits?.p3}
              </MotionTypo>
            </Box>

            <Box
              component="img"
              src={about?.commitImg}
              alt="Our Commitments"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: "250px", sm: "350px", md: "400px" },
                objectFit: "cover",
                borderRadius: 5,
                boxShadow: "0px 10px 30px rgba(61, 206, 212, 0.4)",
              }}
            />
          </Box>
        </Box>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          navigation={true}
          spaceBetween={10}
          slidesPerView={3}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}>
          {about.certificates.map((cert) => (
            <SwiperSlide key={cert.title}>
              <img src={cert.link} alt={cert.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default About_Us;
