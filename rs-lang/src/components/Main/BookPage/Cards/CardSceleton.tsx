import { Box, Card, Grid, Skeleton } from "@mui/material";
import React from "react";

const CardSceleton = () => {
  return (
    <Grid item xs={12} /* sm={6} */>
      <Card sx={{ display: 'flex', p:1}}>
      <Skeleton variant="rectangular" width={300} height={250} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2 }}>
        <Box maxWidth={50}>
          <Skeleton height={50} />
        </Box>
        <Box maxWidth={300}>
          <Skeleton height={40} />
        </Box>
        <Box maxWidth={100}>
          <Skeleton height={20} />
        </Box>
        <Box maxWidth={600}>
          <Skeleton height={20} />
        </Box>
        <Box maxWidth={550}>
          <Skeleton height={20} />
        </Box>
        <Box maxWidth={590}>
          <Skeleton height={20} />
        </Box>
        <Box maxWidth={500}>
          <Skeleton height={20} />
        </Box>
      </Box>
      </Card>
      
    </Grid>
  );
};

export default CardSceleton;
