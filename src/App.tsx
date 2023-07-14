import { ConfigProvider } from 'antd';
import React from 'react';
import { ImageUpload } from './components/image-upload';

const App: React.FC = () => {

  return <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <div className="App">
      <ImageUpload />
    </div>
  </ConfigProvider>
};

export default App;