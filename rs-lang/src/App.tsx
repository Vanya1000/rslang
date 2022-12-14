import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NoAuth from './components/Common/NoAuth';
import NotFound from './components/Common/NotFound';
import Layout from './components/Layout';
import AboutPage from './components/Main/AboutPage/AboutPage';
import BookPage from './components/Main/BookPage/BookPage';
import AudioChallenge from './components/Main/GamePage/AudioChallenge/AudioChallenge';
import GamePage from './components/Main/GamePage/GamePage';
import Sprint from './components/Main/GamePage/SprintPage/Sprint';
import HomePage from './components/Main/HomePage/HomePage';
import StatPage from './components/Main/StatPage/StatPage';
import RequireAuth from './hoc/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="game/audio-challenge" element={<AudioChallenge />} />
        <Route path="game/sprint" element={<Sprint />} />
        <Route path="stat" element={
          <RequireAuth>
            <StatPage />
          </RequireAuth>
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path='noauth' element={<NoAuth />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
