import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Controls from "./Controls/Controls";
import Cards from "./Cards/Cards";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchWordsNoAuthAsync } from "../../../store/bookSlice";

const BookPage = () => {
  const isAuth = useAppSelector((state) => !!state.user.user?.userId);
  const currentGroup = useAppSelector(state => state.book.currentGroup);
  const currentPage = useAppSelector(state => state.book.currentPage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWordsNoAuthAsync({ group: currentGroup, page: currentPage }));
  }, [currentGroup, currentPage, dispatch]);
  
  return (
    <Container maxWidth={"xl"}>
      <Controls currentGroup={currentGroup} currentPage={currentPage} isAuth={isAuth}/>
      <Cards isAuth={isAuth}/>
    </Container>
  );
};

export default BookPage;
