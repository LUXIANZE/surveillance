import { Col, Divider, Row, Image } from "antd"
import { useEffect } from "react"
import { useGeolocation } from "react-use"

interface SubmissionModalProps {
    url?: string,
    location?: any,
    onLocationStateChange: (locationState: any) => void
    onSubmissionReady: (submssionReady: boolean) => void
}
const defaultLongitudeLatitude = {
    latitude: 3.0670848,
    longitude: 101.4267904
}

export const SubmissionModal: React.FC<SubmissionModalProps> = (props) => {
    const { url, location, onLocationStateChange, onSubmissionReady } = props
    const locationState = useGeolocation()

    useEffect(() => {
        onLocationStateChange(locationState)
    }, [locationState])

    useEffect(() => {
        const submissionReady = !locationState.loading && !!url && !!location;
        console.log("Check Submission Readiness >>: ", submissionReady)
        if (submissionReady) {
            onSubmissionReady(true)
        }
    }, [locationState, url, location])

    return <>
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
            <Col span={16}>{`office: ${location.office}, level: ${location.level}, room: ${location.room}`}</Col>
        </Row>
        <Divider />
        <Row>
            <Col span={8}>Time of incident</Col>
            <Col span={16}>{new Date().toLocaleString()}</Col>
        </Row>
    </>
}