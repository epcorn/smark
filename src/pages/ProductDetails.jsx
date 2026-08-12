import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { products_Data } from "../data/product_Data";
import { fadeUp } from "../data/motionAnimation";

const BRAND_GREEN = "rgba(61, 206, 212)";
const LIGHT_BG = "#F4F9F5";

// Motion Wrappers
const MotionBox = motion.create(Box);
const MotionTypo = motion.create(Typography);

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

function ProductDetails() {
  const { id, category } = useParams();
  const product = products_Data?.[category]?.[id];

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#ffffff",
          color: "text.secondary",
        }}>
        <Typography variant="h5" fontWeight={600}>
          No Information Available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ bgcolor: "#ffffff", color: "#2D3748", minHeight: "100vh", pb: 10 }}>
      <Box
        sx={{
          position: "relative",
          color: "#ffffff",
          overflow: "hidden",
        }}>
        {/* Semi-transparent Banner Background */}
        {product?.banner && (
          <Box
            component="img"
            src={product.banner}
            alt="Hero Banner"
            loading="lazy"
            sx={{
              // position: "absolute",
              inset: 0,
              width: "100%",
              height: { sm: 330, md: 500 },
              maxHeight: 500,
              aspectRatio: 16 / 9,
              objectFit: "cover",
              opacity: 1,
              pointerEvents: "none",
            }}
          />
        )}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <MotionBox initial="hidden" animate="visible" variants={fadeInUp}>
            {/* Main Heading */}
            <MotionTypo initial='hidden' whileInView='visible' variants={fadeUp}
              variant="h2"
              sx={{
                fontWeight: 800,
                pt: { xs: 5, md: 10 },
                fontSize: { xs: "2.2rem", sm: "3.2rem", md: "3.8rem" },
                lineHeight: 1.15,
                color: "#000",
                mb: 2,
              }}>
              {product?.heading}
            </MotionTypo>

            {/* Separated Subtitle / Title */}
            <Box
              sx={{
                pl: 2,
                borderLeft: "4px solid #000",
                maxWidth: "800px",
              }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  lineHeight: 1.5,
                }}>
                {product?.title}
              </Typography>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Left Column: Text */}
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              sx={{ flex: 1 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: BRAND_GREEN, mb: 2.5 }}>
                About the Product
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {[product?.para1, product?.para2, product?.para3].filter(Boolean).map((para, i) => (
                  <Typography key={i} sx={{ color: "#4A5568", lineHeight: 1.8, fontSize: "1rem" }}>
                    {para}
                  </Typography>
                ))}
              </Box>
            </MotionBox>

            {/* Right Column: Image Card */}
            <MotionBox
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                flex: { xs: "1 1 auto", md: "0 0 420px" },
                width: "100%",
                maxWidth: { xs: "70%", md: "420px" },
                p: { xs: 3, md: 4 },
                bgcolor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid rgba(61, 158, 89, 0.2)",
                boxShadow: "0 12px 32px rgba(61, 158, 89, 0.08)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: 320, md: 500 },
                position: "relative",
                overflow: "hidden", // Prevents rotated edge bleed
              }}
            >
              <Box
                component="img"
                src={product?.productImg}
                alt={product?.title || "Product"}
                loading="lazy"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  // border: "1px solid black",
                  transition: "transform 0.4s ease",
                  transform: id === "samarth-stick" || id === "lizard-trap" ? "rotate(-90deg)" : "rotate(0deg)",
                  "&:hover": {
                    transform:
                      id === "samarth-stick" || id === "lizard-trap"
                        ? "rotate(-90deg) scale(1.05)"
                        : "rotate(0deg) scale(1.05)",
                  },
                }}
              />
            </MotionBox>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        {product?.overview && (
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 8,
              borderRadius: "20px",
              bgcolor: LIGHT_BG,
              border: `1px solid rgba(61, 158, 89, 0.2)`,
            }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: BRAND_GREEN,
                mb: 1.5,
              }}>
              Overview
            </Typography>

            <Divider sx={{ mb: 2.5, borderColor: "rgba(61, 158, 89, 0.2)" }} />

            <Typography
              sx={{
                color: "#334155",
                lineHeight: 1.8,
                mb: 2,
                fontSize: "1.05rem",
              }}>
              {product.overview.para1}
            </Typography>
            {product.overview.para2 && (
              <Typography
                sx={{ color: "#64748B", lineHeight: 1.8, fontSize: "1rem" }}>
                {product.overview.para2}
              </Typography>
            )}
          </MotionBox>
        )}

        {/* =====================================================
            3. FEATURES & APPLICATIONS
        ====================================================== */}

        {/* Features Column */}
        {product?.features && (
          <Grid item xs={12} md={6}>
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 0.5, color: "#1E293B" }}>
                Features
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {product.features.map((f, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: "14px",
                      bgcolor: LIGHT_BG,
                      borderLeft: `4px solid ${BRAND_GREEN}`,
                    }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: BRAND_GREEN, mb: 0.5 }}>
                      {f.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#475569", lineHeight: 1.6 }}>
                      {f.desc}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </MotionBox>
          </Grid>
        )}

        {/* Applications Column */}
        {product?.applications && (
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            sx={{ py: 5 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "#1E293B" }}>
              Applications
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                py: 2,
              }}>
              {product.applications.map((app, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: "14px",
                    bgcolor: "#ffffff",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.09)", textAlign: "center",
                  }}>
                  <Box
                    component={"img"}
                    src={app?.img}
                    loading="lazy"
                    sx={{
                      height: "180px",
                      aspectRatio: "2/2",
                      objectFit: "cover",
                      borderRadius: "100%",
                      overflow: "hidden",
                      border: "1px solid grey",
                      mx: "auto",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#1E293B", mb: 0.5 }}>
                    {app.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748B", lineHeight: 1.6 }}>
                    {app.desc}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </MotionBox>
        )}

        {/* =====================================================
            4. BENEFITS SECTION
        ====================================================== */}
        {product?.benefit && (
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, color: "#1E293B" }}>
              Key Benefits
            </Typography>

            <MotionBox
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}>
              {product.benefit.map((b, idx) => (
                <Box key={b.id || idx}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: "16px",
                      bgcolor: LIGHT_BG,
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: BRAND_GREEN,
                          mb: 1,
                        }}>
                        0{idx + 1}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#1E293B",
                          fontSize: "1.05rem",
                        }}>
                        {b.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748B", lineHeight: 1.6 }}>
                        {b.desc}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </MotionBox>
          </Box>
        )}

        <Box>

        </Box>

        {product?.specs && (
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 2.5, color: "#1E293B" }}>
              Specifications
            </Typography>

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: "1px solid #8d9393",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
              <Table>
                <TableBody>
                  {product.specs.map((spec, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(even)": { bgcolor: LIGHT_BG },
                        "&:last-child td": { borderBottom: 0 },
                      }}>
                      <TableCell
                        sx={{
                          color: BRAND_GREEN,
                          fontWeight: 700,
                          width: { xs: "40%", md: "30%" },
                          py: 2,
                          fontSize: "0.9rem",
                        }}>
                        {spec.type}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#334155",
                          py: 2,
                          fontSize: "0.95rem",
                        }}>
                        {spec.detail}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MotionBox>
        )}
      </Container>
      {product?.broachure && (
        <Box
          sx={{
            width: '100%',
            my: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', my: 5 }}>
            Product Guidence
          </Typography>
          {/* Embedded PDF Viewer using Google Docs Viewer wrapper */}
          <Box
            sx={{
              mx: "auto",
              width: '50%',
              height: { xs: 400, md: 550 },
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              bgcolor: '#f8fafc',
            }}
          >
            <Box
              component="iframe"
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                product.broachure
              )}&embedded=true`}
              title={`${product.heading || 'Product'} Brochure`}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                border: 0,
                display: 'block',
              }}
            />
          </Box>

          {/* Fallback Download / Direct View Button in case browser blocks embed */}
          <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              component="a"
              href={product.broachure}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Open PDF in New Tab
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductDetails;
