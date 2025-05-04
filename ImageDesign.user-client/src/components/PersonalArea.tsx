import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import UserPhotosDialog from "./Collage/UserPhotos"; // יבוא של הקומפוננטה החדשה

const PersonalArea: React.FC = () => {
    const [openCollageDialog, setOpenCollageDialog] = useState<boolean>(false); // מצב חדש לדיאלוג הקולאז'

    const navigate = useNavigate(); // שימוש ב-hook של React Router לניווט

    return (
        <div style={{ display: 'flex', padding: '16px' }}>
            <div style={{ 
                width: '250px', 
                position: 'sticky', // או 'fixed'
                top: '16px', 
                height: '100vh', 
                overflowY: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', // מרכז את הכפתורים
                justifyContent: 'flex-start' // מתחיל מהחלק העליון
            }}>
                <Button
                    variant="contained"
                    startIcon={<UploadFileIcon />}
                    onClick={() => navigate(`/personal-area/add-photo`)}
                    sx={{ width: "90%", marginBottom: 2 }} // רוחב 90% עם margin אוטומטי
                >
                    העלאת תמונה לאלבום שלי
                </Button>

                <Button
                    variant="contained"
                    startIcon={<PhotoLibraryIcon />}
                    onClick={() => setOpenCollageDialog(true)} // פתיחת הדיאלוג במקום ניווט
                    sx={{ width: "90%", marginBottom: 2 }} // רוחב 90% עם margin אוטומטי
                >
                    צור קולאז מתמונות האלבומים שלך
                </Button>

                <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />} // אייקון סל המחזור
                    onClick={() => navigate(`/personal-area/tin-photo`)}
                    sx={{ width: "90%",marginBottom:2 }} // רוחב 90% עם margin אוטומטי
                >
                    סל המחזור        
                </Button> 
                <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />} // אייקון סל המחזור
                    onClick={() => navigate(`/personal-area/userAlbums`)}
                    sx={{ width: "90%",marginBottom:2 }} // רוחב 90% עם margin אוטומטי
                >
האלבומים שלי           
     </Button> 
                <UserPhotosDialog
                    open={openCollageDialog}
                    onClose={() => setOpenCollageDialog(false)}
                />
            </div>

            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}

export default PersonalArea;
