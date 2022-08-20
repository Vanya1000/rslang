import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import image from '../../../assets/learning.png';
import DeleteIcon from '@mui/icons-material/Delete';

const HomePage = () => {

  const boxStyle = {
    width: 400,
    height: 300,
    backgroundColor: '#5a5a5a',
    color: '#fff',
    borderRadius: 5,
    padding: 2,
    margin: '0 auto'
  }

  return (
    <Container>
      <Container sx={{ 
        display: 'flex',
        flexDirection: { md: 'row', xs: 'column'},
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: 400,
          backgroundColor: '#313131',
          color: '#fff',
          margin: 2,
          padding: 2,
          borderRadius: 5
        }}>
          <Typography variant="h3" component="h2" sx={{ flexGrow: 1, paddingBottom: 2, }}>
            RS LANG
          </Typography>
          <Typography component="p" sx={{ fontSize: 18, fontWeight: 200, color: 'cyan', marginBottom: 2 }}>
            Learning English has never been so easy!
          </Typography>
          <Typography component="p" sx={{ fontSize: 18, fontWeight: 200 }}>
            Play games, listen to pronunciation, improve your knowledge. With our app, learning is a joy.
          </Typography>
        </Box>
        <img src={image} style={{
          width: 400,
          height: 400
        }}/>
      </Container>

      <Box>
        <Typography variant="h4" component="h3" sx={{ flexGrow: 1, paddingBottom: 5, paddingTop: 5, textAlign: 'center' }}>
          ADVANTAGES
        </Typography>
        <Grid container rowGap={3}>

          <Grid xs={6}>
            <Box sx={boxStyle}>
            <svg data-testid="DeleteIcon"></svg>
              <Typography variant="h5" component="h3" sx={{ color: 'cyan', textAlign: 'center', margin: 2 }}>TEXTBOOK</Typography>
              <Typography component="p" sx={{ fontSize: 18, fontWeight: 200 }}>
                  The electronic textbook consists of six sections. Each section has 30 pages of 20 words.
                  The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.
              </Typography>
            </Box>
          </Grid>

          <Grid xs={6}>
            <Box sx={boxStyle}>
              <Typography variant="h5" component="h3" sx={{ color: 'cyan', textAlign: 'center', margin: 2 }}>DICTIONARY</Typography>
              <Typography component="p" sx={{ fontSize: 18, fontWeight: 200 }}>
                  The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties.
                  The dictionary reflects statistics for each section and student progress.
              </Typography>
            </Box>
          </Grid>

          <Grid xs={6}>
            <Box sx={boxStyle}>
              <Typography variant="h5" component="h3" sx={{ color: 'cyan', textAlign: 'center', margin: 2 }}>GAMES</Typography>
              <Typography component="p" sx={{ fontSize: 18, fontWeight: 200 }}>
                For learning words and reinforcing memorization, 
                the application has 2 games: Savannah and Sprint, which will help you to "pump" your vocabulary in a playful way.
              </Typography>
            </Box>
          </Grid>

          <Grid xs={6}>
            <Box sx={boxStyle}>
              <Typography variant="h5" component="h3" sx={{ color: 'cyan', textAlign: 'center', margin: 2 }}>STATISTICS</Typography>
              <Typography component="p" sx={{ fontSize: 18, fontWeight: 200 }}>
                All the progress of training can be viewed in statistics, where data for the current day,
                as well as for the entire training period, are presented.
                The information is presented both in the form of a table and graphs, which is very convenient.
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Box>
      <Box>
      <Typography variant="h4" component="h3" sx={{ flexGrow: 1, paddingBottom: 5, paddingTop: 10 }}>
          All posibilities
        </Typography>
      </Box>

    </Container>
  )
}

export default HomePage;