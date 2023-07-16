import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload as AntUpload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { Uploader } from "uploader";
import { Upload } from 'upload-js'

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const getBinaryString = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ImageUpload: React.FC<{ setUrl: (url: string) => void }> = (props) => {
    const { setUrl } = props
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);
    const uploader = Uploader({ apiKey: "public_kW15bWw6nYmW19eM6J5GW7VRwmAk" }); // Your real API key.

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setUrl(newFileList[0]?.response?.url)
        setFileList(newFileList);
    }

    const upload = Upload({
        apiKey: "public_kW15bWw6nYmW19eM6J5GW7VRwmAk" // Your real API key.
    });

    const onFileSelected = async (req: any) => {
        const file = req.file as RcFile;

        try {
            const uploadedFile = await upload.uploadFile(
                // Required.
                file,

                // Optional.
                {
                    onBegin: ({ cancel }) => {
                        // Call 'cancel()' to stop the upload.
                    },
                    onProgress: ({ bytesSent, bytesTotal }) => {
                        // Use this to display progress.
                    },
                    metadata: {
                        // Up to 2KB of arbitrary JSON.
                        productId: 60891
                    },
                    tags: [
                        // Up to 25 tags per file.
                        "example_tag"
                    ],
                    path: {
                        // See path variables: https://upload.io/dashboard/docs/path-variables
                        folderPath: "/uploads/{UTC_YEAR}/{UTC_MONTH}/{UTC_DAY}",
                        fileName: "{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}"
                    }
                }
            );

            // --------------------------------------------
            // File successfully uploaded!
            // --------------------------------------------
            // The 'filePath' uniquely identifies the file,
            // and is what you should save to your API.
            // --------------------------------------------
            return uploadedFile

        } catch (e) {
            message.error(`Upload failed: ${(e as any).message}`);
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <div>
                <>
                    <AntUpload
                        action={'https://wmiagzc77tdg4q3isyxeiqsuuq0aapwn.lambda-url.ap-southeast-1.on.aws/'}
                        customRequest={(req) => {
                            (async () => {
                                const uploadedFile = await onFileSelected(req)
                                if (req.onSuccess) {
                                    req.onSuccess({
                                        status: 'done',
                                        name: uploadedFile?.originalFileName,
                                        url: uploadedFile?.fileUrl
                                    })
                                }
                            })()
                        }
                        }
                        // action={'https://70mage2swh.execute-api.ap-southeast-1.amazonaws.com/Stage/uploadimage/'}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        capture="environment"
                        accept='.jpg,.png,video/*'
                    >
                        {fileList.length > 0 ? null : uploadButton}
                    </AntUpload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </>
            </div>
        </>
    );
};