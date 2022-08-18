import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import NotFound from '../Common/NotFound'
import AboutPage from './AboutPage/AboutPage'
import BookPage from './BookPage/BookPage'
import GamePage from './GamePage/GamePage'
import HomePage from './HomePage/HomePage'
import StatPage from './StatPage/StatPage'

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/stat" element={<StatPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </>
    
  )
}

export default Main