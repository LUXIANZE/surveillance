import { Button, Col, ConfigProvider, Divider, Image, Layout, Modal, Row, Typography, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { ImageUpload } from './components/image-upload';
import { SelectUAUC } from './components/select-uauc';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { SettingOutlined } from '@ant-design/icons';
import { GetLocation } from './components/get-address';
import { SubmissionModal } from './components/submission-modal';

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
  const [submissionReady, setSubmissionReady] = useState(false)


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


      // hardcode loading
      await new Promise(r => setTimeout(r, 1000))
      // TODO: Implement submit report
      // await submitReport()
      modal.success({
        title: 'Submission Success',
        content: <>
          <SubmissionModal
            url={url}
            location={location}
            onLocationStateChange={locationState => console.log('Location Changed >>: ', locationState)}
            onSubmissionReady={setSubmissionReady}
          />
        </>,
        afterClose: async () => {
          await new Promise(r => setTimeout(r, 1000))
          window.location.reload()
        }
      })

    } catch (error) {
      messageApi.error((error as Error).message, 3)
    } finally {
      setIsSubmitButtonLoading(false)
    }

  }

  useEffect(() => {
    if (location) {
      message.info(`You're at office: ${location.office}, level: ${location.level}, room: ${location.room}`)
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
        <Content style={{ minHeight: 600, padding: 20 }}>
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
        <Footer>
          <Row>
            <Col span={6}><Image src='https://www.petronas.com/pcg/sites/default/files/lightbox-gallery/cover/gallery-pet-logo-inner-thumb.jpg' /></Col>
            <Col span={1}></Col>
            <Col span={17} ><span>Passionate About Progress</span></Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  </>
};

export default AppWithConfig;