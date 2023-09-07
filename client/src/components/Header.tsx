import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import jemsLogo from "../JEMS.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { geoJsonConvert } from "../utils/geojson-convert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #BDE3FF",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

interface HeaderProps {
  onFileUpload: (file: string, content: string) => void;
}
const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
  const [openFileModal, setOpenFileModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleOpenFileModal = () => {
    setOpenFileModal(true);
  };

  const handleCloseFileModal = () => {
    setOpenFileModal(false);
  };

  function readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      // read the file as text
      reader.readAsText(file);

      reader.onload = (event) => {
        if (event.target) {
          const fileContent = event.target.result as string;
          // indicates that the asynch file reading is completed & provides fileContent as Promise result
          resolve(fileContent);
        }
      };
      
      // sets up handler when error while reading
      reader.onerror = (event) => {
        // reject Promise with error
        reject(new Error('Error reading file: ' + event.target?.error));
      };
      
    });
  }

  // Gets file uploaded by user with the Fetch API
  const handleUpload = async () => {
    setOpenFileModal(false);
    if (file) {
      console.log("Uploading file...");

      try {
        // contains characters after the '.' in a filename
        let fileSuffix = file.name.split('.').slice(-1)[0]; 

        if(fileSuffix === "kml"){
          // kml file
          console.log("KML TIME");
          console.log(file)
          let kmlText = await readFileContent(file);
          console.log(kmlText);
          onFileUpload("kml", kmlText);
        }else{
          const convertedFileInfo = geoJsonConvert(file);
          console.log(convertedFileInfo.fileType);
          console.log(convertedFileInfo.fileContent);
          onFileUpload(convertedFileInfo.fileType, convertedFileInfo.fileContent);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const renderHeader = () => {
    return (
      <AppBar
        position="static"
        sx={{ backgroundColor: "#BDE3FF", color: "black" }}
      >
        <Toolbar>
          <img
            src={jemsLogo}
            alt="Logo"
            style={{ width: "100px", marginRight: "10px" }}
          />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Discovery
          </Typography>

          {/* Upload button on the top right */}
          <Button
            color="inherit"
            onClick={handleOpenFileModal}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>

          {/* Modal for uploading files */}
          <Modal open={openFileModal} onClose={handleCloseFileModal}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Upload a GIS file!
              </Typography>
              <Typography id="modal-modal-title" variant="subtitle2">
                (We support KML, GeoJSON, and Shapefiles)
              </Typography>
              <form>
                <br />
                <label htmlFor="file"></label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".shp, .txt, .json, .zip, .kml"
                  multiple
                />

                <div>
                  <br />
                  <Button variant="contained" onClick={handleUpload}>
                    Upload
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    );
  };

  return <>{renderHeader()}</>;
};

export default Header;
