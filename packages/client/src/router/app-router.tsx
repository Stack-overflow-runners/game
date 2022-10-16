import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main';
import SignInPage from '../pages/signIn';
import SignUpPage from '../pages/signUp';
import ProfilePage from '../pages/profile';
import LeaderBoardPage from '../pages/leaderBoard';
import ForumPage from '../pages/forum';
import GamePage from '../pages/game';
import ErrorBoundary from '../components/error-boundary';
import ErrorPage from '../pages/error';

function AppRouter() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leader-board" element={<LeaderBoardPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
