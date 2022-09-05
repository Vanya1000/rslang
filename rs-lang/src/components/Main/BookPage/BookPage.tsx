import React, { useEffect } from 'react';
import { Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchHardWords, fetchWords } from '../../../store/bookSlice';

import Controls from './Controls/Controls';
import Cards from './Cards/Cards';

const BookPage = () => {
  const isAuth = useAppSelector((state) => !!state.user.user?.userId);
  const currentGroup = useAppSelector(state => state.book.currentGroup);
  const currentPage = useAppSelector(state => state.book.currentPage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentGroup !== 6) {
      dispatch(fetchWords({ group: currentGroup, page: currentPage }));
    } else {
      dispatch(fetchHardWords());
    }
  }, [currentGroup, currentPage, isAuth, dispatch]);
  
  return (
    <Container maxWidth={'xl'}>
      <Controls currentGroup={currentGroup} currentPage={currentPage} isAuth={isAuth}/>
      <Cards isAuth={isAuth}/>
    </Container>
  );
};

export default BookPage;
