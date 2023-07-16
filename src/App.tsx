import { Button, Col, ConfigProvider, Divider, Image, Layout, Modal, Row, Typography, message, theme } from 'antd';
import React, { useState } from 'react';
import { useGeolocation } from 'react-use'
import { ImageUpload } from './components/image-upload';
import { SelectUAUC } from './components/select-uauc';
import { Content, Header } from 'antd/es/layout/layout';
import { SettingOutlined } from '@ant-design/icons';
import { suggestUAUC } from './rpc/suggested-uauc';

const AppWithConfig: React.FC = () => <>
  <ConfigProvider theme={{ token: { colorPrimary: '#639696' } }}>
    <App />
  </ConfigProvider>
</>

const App: React.FC = () => {
  const [url, setUrl] = useState<string>()
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false)
  const [selectedRule, setSelectedRule] = useState<number>()
  const { token } = theme.useToken()
  const [modal, modalContextHolder] = Modal.useModal()
  const locationState = useGeolocation()
  const defaultLongitudeLatitude = {
    latitude: 3.0670848,
    longitude: 101.4267904
  }
  const [messageApi, messageContextHolder] = message.useMessage()

  const validateData = () => {
    if (!url) {
      throw new Error("Image not selected or corrupted, please re-capture image");
    }

    if (!selectedRule) {
      throw new Error("Rule not selected, please select UAUC rule you would like to report");
    }
  }

  const onSubmitClicked = async () => {

    try {
      setIsSubmitButtonLoading(true)
      validateData()
      const reportingItem = {
        url: url,
        location: locationState,
        timeStamp: new Date().toUTCString()
      }

      console.table(reportingItem)

      // hardcode loading
      await new Promise(r => setTimeout(r, 1000))
      modal.success({
        title: 'Submission Success',
        content: <>
          <Row>
            <Col span={8}>Evidence</Col>
            <Col span={16}><Image src={url} style={{ maxHeight: 500 }} /></Col>
          </Row>
          <Divider />
          <Row>
            <Col span={8}>Longitude</Col>
            <Col span={16}>{locationState.longitude || defaultLongitudeLatitude.longitude}</Col>
          </Row>
          <Row>
            <Col span={8}>Latitude</Col>
            <Col span={16}>{locationState.latitude || defaultLongitudeLatitude.latitude}</Col>
          </Row>
          <Divider />
          <Row>
            <Col span={8}>Time of incident</Col>
            <Col span={16}>{new Date().toLocaleString()}</Col>
          </Row>
        </>,
      })
      await new Promise(r => setTimeout(r, 2000))
      // window.location.reload()
    } catch (error) {
      messageApi.error((error as Error).message, 3)
    } finally {
      setIsSubmitButtonLoading(false)
    }

  }

  const onGetSuggestedClicked = async () => {
    const res = await suggestUAUC()
    if (res && res.status === 200) {
      console.log(res.data)
    }
  }

  return <>
    {messageContextHolder}
    {modalContextHolder}
    <div className="App">
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: token.colorPrimary }}>
          <Typography.Title level={3} style={{ color: '#ffffff' }}>
            <SettingOutlined />
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
              <SelectUAUC url={url} setSelectedRule={setSelectedRule} />
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
          <Row>
            <Col span={24}>
              {/* <Detection /> */}
              <Button onClick={onGetSuggestedClicked}>Get suggestion</Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  </>
};

export default AppWithConfig;