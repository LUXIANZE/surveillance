import { Button, Col, ConfigProvider, Divider, Image, Layout, Modal, Row, Typography, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGeolocation } from 'react-use'
import { ImageUpload } from './components/image-upload';
import { SelectUAUC } from './components/select-uauc';
import { Content, Header } from 'antd/es/layout/layout';
import { SettingOutlined } from '@ant-design/icons';
import { submitReport } from './components/submit-report';
import { GetLocation } from './components/get-address';

const AppWithConfig: React.FC = () => <>
  <ConfigProvider theme={{ token: { colorPrimary: '#639696' } }}>
    <App />
  </ConfigProvider>
</>

const App: React.FC = () => {
  const [url, setUrl] = useState<string>()
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false)
  const [selectedRule, setSelectedRule] = useState<string>()
  const [location, setLocation] = useState<any>() // {office: number, level: number, room: number}
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

    if (!location) {
      throw new Error("Please Scan Address QR Code Nearby you");
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
      // TODO: Implement submit report
      // await submitReport()
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
          <Row>
            <Col span={8}>Address</Col>
            <Col span={16}>{`office: ${location.office}, level: ${location.level}, office: ${location.room}`}</Col>
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

  useEffect(() => {
    if (location) {
      message.info(`You're at office: ${location.office}, level: ${location.level}, office: ${location.room}`)
    }
  }, [location])

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
        <Content style={{ padding: 20 }}>
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
              <div id="qrreader"></div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <GetLocation location={location} setLocation={setLocation} />
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
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  </>
};

export default AppWithConfig;