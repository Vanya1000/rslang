import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const NoData = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item sx={{ width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            The difficult words section is still empty
              <SentimentSatisfiedIcon
                fontSize="large"
                sx={{ mb: '-8px' }}
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NoData