import { Button, Image } from "antd"
import { useState } from "react"
import { detectObject } from "../rpc/object-detection"

export const Detection: React.FC = () => {
    const [detected, setDetected] = useState([])

    const onDetectClicked = async () => {
        try {
            const res = await detectObject('https://c8.alamy.com/comp/EG51H5/man-climbing-ladder-EG51H5.jpg')
            if (res && res.status === 200) {
                setDetected(res.data)
            }

        } catch (error) {
            console.error(error)
        }

    }

    return <>
        <Image src={'https://c8.alamy.com/comp/EG51H5/man-climbing-ladder-EG51H5.jpg'}></Image>
        <Button onClick={onDetectClicked}>Detect object for image above</Button>
        <br></br>
        {JSON.stringify(detected)}
    </>
}