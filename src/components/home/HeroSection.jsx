import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { home_page } from '../../data/home_page_Data';
import { Grid, Paper } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';


function HeroSection() {
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <>
      <Box>
        <Box component={'img'} src='/public/Smark_logos/Smark_logo.png' sx={{ maxHeight: 500, width: "100%", objectFit: "cover" }} />
      </Box>
      <Box sx={{ px: 5, py: 2, bgcolor: "#a7e08d" }}>
        <Typography variant='h5' sx={{ fontWeight: 500, my: 2 }}>
          Highlights
        </Typography>
        <Grid container spacing={2}>
          {home_page.highlights.map((text, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  borderRadius: 2,
                  borderLeft: '4px solid #3DCED4',
                  height: '100%',
                  boxSizing: 'border-box',
                  '&:hover': {
                    boxShadow: 4,
                    borderColor: '#81D959',
                  },
                }}
              >
                <FaCheckCircle style={{ color: '#81D959', fontSize: '1.25rem', flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ px: 5, py: 2, bgcolor: "#d0e0ce" }} >
        <Typography variant='h5' sx={{ fontWeight: 500, my: 2 }}>Our Core Pillars</Typography>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: 2,
          }}
        >
          {home_page?.corePillars?.map((card, index) => (
            <Card key={card.id}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? '' : undefined}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {card.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default HeroSection