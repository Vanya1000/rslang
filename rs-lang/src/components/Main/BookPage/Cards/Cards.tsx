import { Grid } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../hooks/hooks";
import EmptySection from "../../../Common/EmptySection";
import CardItem from "./CardItem";
import CardSceleton from "./CardSceleton";

type CardsPropsType = {
  isAuth: boolean;
};

const Cards: React.FC<CardsPropsType> = ({ isAuth }) => {
  const words = useAppSelector((state) => state.book.words);
  const isShowTranslate = useAppSelector(
    (state) => state.settings.isShowTranslation
  );
  const currentGroup = useAppSelector((state) => state.book.currentGroup);
  const isFetching = useAppSelector((state) => state.book.isFetching);
  const isSend = useAppSelector((state) => state.book.isSend);

  return (
    <>
    {currentGroup === 6 && words.length === 0 && <EmptySection/>}
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
        words.map((item) => (
          <CardItem
            isShowTranslate={isShowTranslate}
            currentGroup={currentGroup}
            isAuth={isAuth}
            word={item}
            key={item.id || item._id}
            isSend={isSend}
          />
        ))
      )}
    </Grid>
    </>
  );
};

export default Cards;

