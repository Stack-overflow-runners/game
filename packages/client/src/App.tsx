import AppRouter from './router/app-router';
import { AuthProvider } from './hooks/auth';
import './styles/index.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
