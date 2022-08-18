import React from 'react'
import { Container } from '@mui/material'
import { useAppSelector } from '../../../hooks/hooks'

const BookPage = () => {
  const words = useAppSelector((state) => state.book.words)
  return (
    <Container maxWidth={'xl'}>
      {words.map((word) => <div key={word.id}>{word.transcription}</div>)}
    </Container>
  )
}

export default BookPage