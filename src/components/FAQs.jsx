import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosArrowDown } from "react-icons/io";

export default function FAQs({ faqs }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!faqs || !Array.isArray(faqs)) return null;

  return (
    <Box sx={{ py: 6, maxWidth: '100%' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
        SMARK — Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => {
        const panelId = `panel-${index}`;

        return (
          <Accordion
            key={faq.id || index}
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
            disableGutters
            elevation={0}
            sx={{
              mb: 1.5,
              border: '1px solid #83a4cf',
              borderRadius: '8px !important',
              overflow: 'hidden',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<IoIosArrowDown sx={{ color: 'text.secondary' }} className='text-2xl font-bold' />}
              sx={{
                // bgcolor: expanded === panelId ? 'rgba(74, 183, 187, 0.87)' : '#33a71c71',
                bgcolor: '#33a71c71',
                px: 2.5,
                py: 1,
                '& .MuiAccordionSummary-content': { my: 1 },
              }}
            >
              <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2.5, py: 2, bgcolor: '#93edf09c', borderLeft: '5px solid #3DCED4' }}>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}