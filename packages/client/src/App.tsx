import 'antd/dist/antd.variable.css';
import './styles/index.css';
import './App.css';

import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import AppRouter from './router/app-router';
import { AuthProvider } from './hooks/auth';
import CONST from './utils/consts';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = CONST.IS_PRODUCTION
        ? `${CONST.PROD_URL}:${__SERVER_PORT__}`
        : `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="App">
      <ConfigProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
