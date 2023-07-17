import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from 'antd';
import React from 'react';

export const GetLocation: React.FC<{ location: any, setLocation: (loc: any) => void }> = (props) => {
    const { location, setLocation } = props
    let html5QrcodeScanner: Html5QrcodeScanner
    const startScanning = () => {
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qrreader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    };

    function onScanSuccess(decodedText: any, decodedResult: any) {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        setLocation(JSON.parse(decodedText))
        html5QrcodeScanner.clear()
    }

    function onScanFailure(error: any) {
        console.warn(`Code scan error = ${error}`);
    }

    return (
        <>
            <Button onClick={startScanning} style={{ width: '100%' }}>Scan Nearest Location QR</Button>
        </>
    );
};