import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ fileLabel, onFileSelect }) {

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            onFileSelect(file)
        }
    };
    return (
        <Button component="label" variant="contained" startIcon={<i className="fa-solid fa-file-arrow-up"></i>}>
            {fileLabel ? fileLabel.name : 'Upload file'}
            <VisuallyHiddenInput type="file" name="fileInput" onChange={handleFileChange} />
        </Button>
    );
}