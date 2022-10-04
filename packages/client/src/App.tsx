import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LeaderBoardPage from './pages/leaderBoard';
import MainPage from './pages/main';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import ForumPage from './pages/forum';
import ProfilePage from './pages/profile';
import GamePage from './pages/game';
import './App.css';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leader-board" element={<LeaderBoardPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
