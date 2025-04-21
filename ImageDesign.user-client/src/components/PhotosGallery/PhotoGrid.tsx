import React from 'react';
import { Box, Paper, Tooltip, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import photoUploadStore from "../../stores/photoUploaderStore";

interface Photo {
    id: number;
    photoName: string;
    photoPath: string;
}

interface PhotoGridProps {
    photos: Photo[];
    onPhotoClick: (index: number) => void;
    onCopyMoveClick: (photoId: number, isCopy: boolean) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick, onCopyMoveClick }) => {
    const handleDownload = async (photo: { photoName: string, photoPath: string }) => {
        try {
            const downloadUrl = await photoUploadStore.getDownloadUrl(photo.photoName);
            if (downloadUrl) {
                const response = await fetch(downloadUrl);
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = photo.photoName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            }
        } catch (error) {
            console.error('שגיאה בהורדת התמונה:', error);
            alert('שגיאה בהורדת התמונה');
        }
    };

    const handleDelete = async (photoId: number) => {
        try {
            photoUploadStore.photos = photoUploadStore.photos.filter(photo => photo.id !== photoId);
            await photoUploadStore.deletePhoto(photoId);
        } catch (error) {
            console.error('שגיאה במחיקת התמונה:', error);
            alert('שגיאה במחיקת התמונה');
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 3,
                justifyContent: "center",
            }}
        >
            {photos.map((photo, index) => (
                <Paper
                    key={photo.id}
                    sx={{
                        padding: 2,
                        textAlign: "center",
                        position: 'relative',
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <img
                        src={photo.photoPath}
                        alt={photo.photoName}
                        onClick={() => onPhotoClick(index)}
                        style={{
                            maxHeight: 200,
                            maxWidth: "100%",
                            objectFit: "cover",
                            borderRadius: 12,
                            cursor: 'pointer'
                        }}
                    />
                    <Box sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        right: 10,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                        <Tooltip title="העתק תמונה">
                            <IconButton onClick={() => onCopyMoveClick(photo.id, true)}>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="העבר תמונה">
                            <IconButton onClick={() => onCopyMoveClick(photo.id, false)}>
                                <DriveFileMoveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="הורדת תמונה">
                            <IconButton onClick={() => handleDownload(photo)}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק תמונה">
                            <IconButton onClick={() => handleDelete(photo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default PhotoGrid;