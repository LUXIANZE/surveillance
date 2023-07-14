import { Button, ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <div className="App">
      <Button type="ghost">Button</Button>
    </div>
  </ConfigProvider>
);

export default App;