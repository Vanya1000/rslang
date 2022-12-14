import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import NotFound from '../Common/NotFound'

import AboutPage from './AboutPage/AboutPage'
import BookPage from './BookPage/BookPage'
import AudioChallenge from './GamePage/AudioChallenge/AudioChallenge'
import GamePage from './GamePage/GamePage'
import HomePage from './HomePage/HomePage'
import StatPage from './StatPage/StatPage'
import Sprint from './GamePage/SprintPage/Sprint';

const Main = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="game/audio-challenge" element={<AudioChallenge />} />
        <Route path="game/sprint" element={<Sprint/> }/>
        <Route path="stat" element={<StatPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />}/>
        <Route path="signup" element={<SignUp />}/>
        <Route path="signin" element={<SignIn />}/>
      </Routes>
  )
}

export default Main