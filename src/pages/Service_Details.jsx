import { useParams, Link } from "react-router-dom";
import { service_data } from "../data/service_Data";
import {
  Box,
  Container,
  Typography, Card,
  CardContent,
  Button, Paper, Stack
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';

// React Icons imports
import { FaArrowLeft } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { home_page } from "../data/home_page_Data";
import {
  cardPop,
  containerStagger,
  fadeInUp,
  fadeUp,
  imgAnimation,
  ltr,
  rtl
} from "../data/motionAnimation";
import { motion } from "framer-motion";

function Service_Details() {
  const { id } = useParams();
  const service = service_data[id];
  const pdfUrl = service?.broachure;

  const MotionBox = motion.create(Box);
  if (!service) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 8, height: "68dvh", textAlign: "center" }}>
        <Typography
          variant="h4"
          color="error"
          gutterBottom
          className="typewriter">
          Service Comming soon...
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<FaArrowLeft />}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const itemsProtected = service.whatItProtects || service.whyAudit;
  const keyTechOrComponents = service.keyComponents || service.usedTech;

  return (
    <Box sx={{ bgcolor: "#eef1f4", minHeight: "100vh", pb: 10 }}>
      {/* Header / Hero Section */}
      <Box
        sx={{
          mb: 6,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>

        <MotionBox
          component="img"
          variants={imgAnimation}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          src={service?.banner}
          loading="eager"
          fetchPriority="high"
        />

        <MotionBox
          component="div"
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
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
              <Typography
                sx={{
                  fontSize: "clamp(1.35rem, 1.5vw + 1rem, 2.25rem)",
                  fontWeight: 600,
                  bgcolor: "#3DCED4",
                  px: { xs: 2.5, sm: 4 },
                  py: 0.5,
                  borderRadius: "50px",

                }}
              >
                {service.heading}
              </Typography>
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  maxWidth: "900px",
                  fontSize: "clamp(1.4rem, 1.2vw + 1rem, 1.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  px: 6,
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
                  maxWidth: "900px",
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  px: 6,
                }}
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: service.summery }}
              />
            </MotionBox>
          </Container>
        </MotionBox>
      </Box>

      <Container maxWidth="lg">

        {/* Key Objectives */}
        {service.keys?.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={3}>
              Key Objectives
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: 3,
              }}
            >
              {service.keys.map((key, index) => {
                const [title, desc] = key?.text?.split("–").map(v => v.trim()) || [];

                return (
                  <MotionBox
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardPop}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "flex-start",
                      ...(service.keys.length % 2 !== 0 &&
                        index === service.keys.length - 1 && {
                        gridColumn: "1 / -1",
                        width: "100%",
                        justifySelf: "center",
                        
                      }),
                    }}
                  >
                    <MotionBox variants={ltr} sx={{ flexShrink: 0, mt: 0.5 }}>
                      <Box
                        component="img"
                        src={key?.icon}
                        alt={title || "icon"}
                        sx={{
                          width: { xs: 40, sm: 50 },
                          height: { xs: 40, sm: 50 },
                          objectFit: "contain",
                        }}
                      />
                    </MotionBox>

                    <MotionBox variants={rtl} sx={{ minWidth: 0 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {title}
                      </Typography>

                      {desc && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, lineHeight: 1.7 }}
                        >
                          {desc}
                        </Typography>
                      )}
                    </MotionBox>
                  </MotionBox>
                );
              })}
            </Box>
          </Paper>
        )}

        {/* Process / Approach Section */}
        {service.approach && service.approach.length > 0 && (
          <Box sx={{ mb: 4, width: '100%' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
              Our Approach
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 3,
                width: '100%',
              }}
            >
              {service.approach.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #3DCED4",
                      borderRadius: 3,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 10px 20px rgba(61, 206, 212, 0.3)",
                      },
                    }}>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "primary.main",
                          fontWeight: 800,
                          fontSize: "1rem",
                        }}>
                        0{index + 1}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, my: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}>
                        {step.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>
        )}

        {/* Protection / Benefits & Technologies Section */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: "column", gap: 4, alignItems: 'stretch' }}>

          {/* What We Help Protect & Identify */}

          {itemsProtected && itemsProtected.length > 0 && (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundImage: `url(${service?.whatweprotectImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(120deg, rgba(5,20,35,0.92), rgba(5,30,45,0.78))",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    py: { xs: 4, md: 6 },
                    px: { xs: 2.5, sm: 4, md: 6 },
                  }}
                >
                  {/* Section Heading */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      sx={{
                        color: "#3DCED4",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        mb: 1.5,
                      }}
                    >
                      Our Protection Focus
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: {
                          xs: "1.65rem",
                          sm: "2rem",
                          md: "2.5rem",
                        },
                        lineHeight: 1.2,
                        maxWidth: "750px",
                      }}
                    >
                      What We Help Protect & Identify
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        width: 75,
                        height: 4,
                        borderRadius: 5,
                        bgcolor: "#3DCED4",
                      }}
                    />
                  </Box>

                  {/* Protection Items */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                      gap: 2.5, "& > :last-child:nth-child(odd)": {
                        gridColumn: "1 / -1",
                      },
                    }}
                  >
                    {itemsProtected.map((item, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: { xs: 2, sm: 2.5 },
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.18)",
                          background: "rgba(255,255,255,0.08)",
                          backdropFilter: "blur(8px)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(61,206,212,0.14)",
                            borderColor: "#3DCED4",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              minWidth: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: "rgba(61,206,212,0.18)",
                              color: "#3DCED4",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: "0.9rem",
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </Box>

                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: {
                                  xs: "1.05rem",
                                  md: "1.2rem",
                                },
                                mb: 1,
                              }}
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              sx={{
                                color: "rgba(255,255,255,0.82)",
                                lineHeight: 1.8,
                                fontSize: {
                                  xs: "0.9rem",
                                  md: "1rem",
                                },
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}


          {/* Key Components & Technology */}
          {keyTechOrComponents && keyTechOrComponents.length > 0 && (
            <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Key Components & Technology
              </Typography>

              <Timeline
                position="right"
                sx={{
                  p: 0,
                  m: 0,
                  '& .MuiTimelineItem-root:before': { flex: 0, p: 0 }
                }}
              >
                {keyTechOrComponents.map((tech, idx) => (
                  <TimelineItem key={idx} sx={{
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: "#1976D2",
                      transform: "translateX(12px) scale(1.02)",
                    }
                  }}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined" sx={{ width: 12, height: 12, borderWidth: 3 }} />
                      {idx < keyTechOrComponents.length - 1 && <TimelineConnector sx={{ bgcolor: 'divider' }} />}
                    </TimelineSeparator>

                    <TimelineContent sx={{ py: '12px', px: 2, pt: 0 }}>
                      <Box sx={{ mb: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, }}>
                          {tech.title}
                        </Typography>
                        <Typography variant="inherit" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {tech.label}
                        </Typography>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          )}
        </Box>

        {/* Service Summary Callout */}
        {
          service.whyService && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                mb: 4,
                borderRadius: 3,
                bgcolor: "#eff6ff",
                border: "1px solid grey",
              }}>
              <Typography
                variant="h5"
                color="primary.dark"
                sx={{ fontWeight: 700, mb: 2 }}>
                {service.whyService.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                {service.whyService.description}
              </Typography>
            </Paper>
          )
        }

        {/* CTA Banner */}
        {
          service.cta && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                textAlign: "center",
              }}>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  mb: 1,
                }}>
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
                sx={{ px: 4, py: 1.5, fontWeight: "bold", borderRadius: 2 }}>
                <a href={`tel:+${home_page.contact}`}>Contact Us Now</a>
              </Button>
            </Paper>
          )
        }
      </Container >

      {pdfUrl && (
        <>
          <Box
            component="iframe"
            src={`${pdfUrl}#toolbar=1`}
            title={id}
            loading="lazy"
            sx={{
              my: 5,
              mx: "auto",
              width: { xs: '100%', sm: '80%', md: '500px' },
              height: { xs: '400px', sm: '500px' },
              maxWidth: '100%',
              border: 0,
              display: 'block',
            }}
          />
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              component="a"
              href={pdfUrl}
              download={`${id}_broachure.pdf`}
            >
              Download PDF
            </Button>
          </Box>
        </>
      )
      }
    </Box >
  );
}

export default Service_Details;
