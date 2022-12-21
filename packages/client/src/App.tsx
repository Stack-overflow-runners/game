import 'antd/dist/antd.variable.css';
import './styles/index.css';
import './App.css';

import { ConfigProvider } from 'antd';
import AppRouter from './router/app-router';
import { AuthProvider } from './hooks/auth';

function App() {
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
