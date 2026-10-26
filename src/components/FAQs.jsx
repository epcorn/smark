
import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

export default function FAQs({ faqs }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <Box
      component="section"
      aria-labelledby="faq-heading"
      className="w-full"
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "#F7FAFC",
      }}
    >
      <Container maxWidth="md">
        {/* Section heading */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "#159DA5",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1.5,
            }}
          >
            NEED HELP?
          </Typography>

          <Typography
            id="faq-heading"
            component="h2"
            sx={{
              color: "#172B3A",
              fontWeight: 800,
              fontSize: {
                xs: "1.8rem",
                sm: "2.3rem",
                md: "2.7rem",
              },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.8,
              maxWidth: 580,
              mx: "auto",
            }}
          >
            Find answers to common questions about SMark,
            our services, products, and solutions.
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: "#81D959",
              borderRadius: 5,
              mx: "auto",
              mt: 2.5,
            }}
          />
        </Box>

        {/* FAQ list */}
        <Box>
          {faqs.map((faq, index) => {
            const panelId = `faq-panel-${index}`;
            const isOpen = expanded === panelId;

            return (
              <Accordion
                key={faq.id || panelId}
                expanded={isOpen}
                onChange={handleChange(panelId)}
                disableGutters
                elevation={0}
                sx={{
                  mb: 1.5,
                  border: "1px solid",
                  borderColor: isOpen ? "#3DCED4" : "#E2E8F0",
                  borderRadius: "12px !important",
                  overflow: "hidden",
                  bgcolor: "#FFFFFF",
                  transition: "border-color 0.2s ease",
                  "&:before": { display: "none" },
                  "&:hover": {
                    borderColor: "#3DCED4",
                  },
                }}
              >
                <AccordionSummary
                  id={`${panelId}-header`}
                  aria-controls={`${panelId}-content`}
                  expandIcon={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: isOpen ? "#3DCED4" : "#F1F5F9",
                        color: isOpen ? "#FFFFFF" : "#475569",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <IoIosArrowDown
                        size={18}
                        style={{
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: 1,
                    minHeight: 68,
                    "& .MuiAccordionSummary-content": {
                      my: 1.5,
                      mr: 1.5,
                    },
                    "&:hover": {
                      bgcolor: "#F8FCFC",
                    },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: "0.92rem", sm: "1.02rem" },
                      fontWeight: 650,
                      lineHeight: 1.6,
                      color: isOpen ? "#117F86" : "#172B3A",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  id={`${panelId}-content`}
                  sx={{
                    px: { xs: 2, sm: 3 },
                    pt: 0,
                    pb: 3,
                    borderTop: "1px solid #F1F5F9",
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: "#526170",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
