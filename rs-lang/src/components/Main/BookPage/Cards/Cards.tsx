import { Box, CircularProgress, Grid, LinearProgress, Skeleton } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../hooks/hooks";
import CardItem from "./CardItem";
import CardSceleton from "./CardSceleton";

type CardsPropsType = {
  isAuth: boolean;
};
{/* <Grid item xs={12} sx={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </Grid> */}
        
const Cards: React.FC<CardsPropsType> = ({ isAuth }) => {
  const words = useAppSelector((state) => state.book.words);
  const isShowTranslate = useAppSelector(
    (state) => state.settings.isShowTranslation
  );
  const currentGroup = useAppSelector((state) => state.book.currentGroup);
  const isFetching = useAppSelector((state) => state.book.isFetching);
  return (
    <Grid
      container
      sx={{ mb: 2 }}
      spacing={{ xs: 2, md: 3 }}
    >
      {isFetching ? (
        Array.from({length: 20}).map((item, index) => (
          <CardSceleton key={index}/>
        ))
      ) : (
        words.map((item, index) => (
          <CardItem
            isShowTranslate={isShowTranslate}
            currentGroup={currentGroup}
            isAuth={isAuth}
            word={item}
            key={item.id}
          />
        ))
      )}
    </Grid>
  );
};

export default Cards;

