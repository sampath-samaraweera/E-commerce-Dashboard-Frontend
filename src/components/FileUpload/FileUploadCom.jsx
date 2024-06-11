import React, { useRef, useState } from 'react';
import './FileUpload.css';
import CustomButton from '../CustomButton';
import { Close, Description, FileUpload } from '@mui/icons-material';

const FileUploadCom = ({ onFileUpload }) => {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));  // Set the preview URL
            onFileUpload(file);  // Pass the selected file to the parent component
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const clearFileInput = () => {
        inputRef.current.value = "";
        setSelectedFile(null);
        onFileUpload(null);  // Clear the file in the parent component
    };

    return (
        <div className='uploadContainer'>
            <div className='img'>
                <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {!selectedFile && (
                    <CustomButton size="medium" color="darkred" onClick={onChooseFile}>
                        <FileUpload />
                        Upload File
                    </CustomButton>
                )}

                {selectedFile && (
                    <div className="file">
                        {previewURL && <img src={previewURL} alt="preview" style={{ borderRadius: '6px', maxWidth: '100%', maxHeight: '100%' }} />}
                    </div>
                )}
            </div>
            {selectedFile && (
                <div className="file-info">
                    <Description />
                    <span>{selectedFile.name}</span>
                    <button style={{ fontSize: '8px', cursor: 'pointer' }} onClick={clearFileInput}>
                        <Close />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploadCom;
