import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/app-router';
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
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
