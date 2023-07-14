import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { ImageUpload } from './components/image-upload';
import { SelectUAUC } from './components/select-uauc';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>()

  return <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <div className="App">
      <ImageUpload setUrl={setUrl} />
      <SelectUAUC url={url} />
    </div>
  </ConfigProvider>
};

export default App;