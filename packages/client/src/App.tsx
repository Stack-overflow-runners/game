import { useEffect } from 'react';
import AppRouter from './router/app-router';
import { AuthProvider } from './hooks/auth';
import './styles/index.css';
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
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
