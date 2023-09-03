import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import jemsLogo from '../JEMS.svg'

interface HeaderProps {
    onFileUpload: (fileContent: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
    const handleFileUpload = () => {
        //Handle file upload logic here
        //Call onFileUpload with the file content when needed
        alert('Upload button clicked!');
    }

    const renderHeader = () => {
        return (
            <AppBar position="static" sx={{ backgroundColor: '#BDE3FF', color: 'black' }}>
                <Toolbar>
                    <img src={jemsLogo} alt="Logo" style={{ width: '100px', marginRight: '10px' }} />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Discovery
                    </Typography>

                    {/* Upload button on the top right */}
                    <Button
                        color="inherit"
                        onClick={handleFileUpload}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }

    return (
        <>
            {renderHeader()}
        </>
    );
};

export default Header;
