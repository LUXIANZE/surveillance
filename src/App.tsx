import { Button, Col, ConfigProvider, Divider, Layout, Row, Typography, message, theme } from 'antd';
import React, { useState } from 'react';
import { useGeolocation } from 'react-use'
import { ImageUpload } from './components/image-upload';
import { SelectUAUC } from './components/select-uauc';
import { Content, Header } from 'antd/es/layout/layout';
import { SettingOutlined } from '@ant-design/icons';

const AppWithConfig: React.FC = () => <>
  <ConfigProvider theme={{ token: { colorPrimary: '#639696' } }}>
    <App />
  </ConfigProvider>
</>

const App: React.FC = () => {
  const [url, setUrl] = useState<string>()
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false)
  const { token } = theme.useToken()
  const locationState = useGeolocation()
  const [messageApi, contextHolder] = message.useMessage()

  const onSubmitClicked = async () => {
    setIsSubmitButtonLoading(true)
    const reportingItem = {
      url: url,
      location: locationState,
      timeStamp: new Date().toUTCString()
    }

    console.table(reportingItem)

    // hardcode loading
    await new Promise(r => setTimeout(r, 1000))
    setIsSubmitButtonLoading(false)

    // toast for 2 seconds then reload
    messageApi.success('Successfully Submitted Report', 2)
    await new Promise(r => setTimeout(r, 2000))
    // window.location.reload()
  }

  return <>
    {contextHolder}
    <div className="App">
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: token.colorPrimary }}>
          <Typography.Title level={3} style={{ color: '#ffffff' }}>
            <SettingOutlined spin />
            {'\tFile an incident'}
          </Typography.Title>
        </Header>
        <Content style={{ minHeight: 700, padding: 20 }}>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <ImageUpload setUrl={setUrl} />
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <SelectUAUC url={url} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Button onClick={onSubmitClicked} type='primary' style={{ width: '100%' }} loading={isSubmitButtonLoading}>
                Submit Report
              </Button>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              <Detection />
            </Col>
          </Row> */}
        </Content>
      </Layout>
    </div>
  </>
};

export default AppWithConfig;