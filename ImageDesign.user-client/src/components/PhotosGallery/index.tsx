import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import photoUploadStore from "../../stores/photoUploaderStore";
import albumStore from '../../stores/albumStore';
import PhotoGrid from './PhotoGrid';
import PhotoDetailModal from './PhotoDetailModal';
import CopyMoveModal from './CopyMoveModal';

const theme = createTheme();

const PhotoGallery: React.FC = observer(() => {
    const { albumId: currentAlbumId } = useParams<{ albumId: string }>();
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const userData = sessionStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user.user.id : null;
    const [copyMoveTargetAlbumId, setCopyMoveTargetAlbumId] = useState<number | ''>('');
    const [selectedPhotoIdForOperation, setSelectedPhotoIdForOperation] = useState<number | null>(null);
    const [isCopyMoveDialogOpen, setIsCopyMoveDialogOpen] = useState(false);
    const [isCopyOperation, setIsCopyOperation] = useState(false);
    const [albumName, setAlbumName] = useState<string>(''); // הוספת מצב לשם האלבום

    // useEffect(() => {
    //     if (currentAlbumId) {
    //         photoUploadStore.fetchPhotosByAlbumId(Number(currentAlbumId));
    //     }
    //     if (userId) {
    //         albumStore.fetchAlbums(userId);
    //     }
    // }, [currentAlbumId, userId]);
    useEffect(() => {
        if (currentAlbumId) {
            photoUploadStore.fetchPhotosByAlbumId(Number(currentAlbumId));
            const album = albumStore.albums.find((album) => album.id === Number(currentAlbumId));
            setAlbumName(album ? album.albumName : 'אלבום לא נמצא'); // עדכון שם האלבום
        }
        if (userId) {
            albumStore.fetchAlbums(userId);
        }
    }, [currentAlbumId, userId]);

    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndex(index);
        setZoomLevel(1);
    };

    const handleCloseModal = () => {
        setSelectedPhotoIndex(null);
        setZoomLevel(1);
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom * 1.5, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom / 1.5, 1));
    };

    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null) {
            const nextIndex = (selectedPhotoIndex + 1) % photoUploadStore.photos.length;
            setSelectedPhotoIndex(nextIndex);
            setZoomLevel(1);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null) {
            const prevIndex = (selectedPhotoIndex - 1 + photoUploadStore.photos.length) % photoUploadStore.photos.length;
            setSelectedPhotoIndex(prevIndex);
            setZoomLevel(1);
        }
    };

    const openCopyMoveDialog = (photoId: number, isCopy: boolean) => {
        setSelectedPhotoIdForOperation(photoId);
        setIsCopyOperation(isCopy);
        setCopyMoveTargetAlbumId('');
        setIsCopyMoveDialogOpen(true);
    };

    const closeCopyMoveDialog = () => {
        setIsCopyMoveDialogOpen(false);
        setSelectedPhotoIdForOperation(null);
        setIsCopyOperation(false);
        setCopyMoveTargetAlbumId('');
    };

    const handleCopyMoveTargetAlbumChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCopyMoveTargetAlbumId(event.target.value as number);
    };

    const handleCopyMovePhoto = async () => {
        if (!selectedPhotoIdForOperation || !copyMoveTargetAlbumId) {
            alert('נא לבחור אלבום יעד.');
            return;
        }
        try {
            const targetAlbumId = Number(copyMoveTargetAlbumId);
            if (isCopyOperation) {
                await photoUploadStore.copyPhotoToAlbum(selectedPhotoIdForOperation, targetAlbumId);
                alert('התמונה הועתקה בהצלחה.');
            } else {
                if (currentAlbumId === null) {
                    alert('לא ניתן להעביר תמונה מחוץ לאלבום.');
                    return;
                }
                await photoUploadStore.movePhotoToAlbum(selectedPhotoIdForOperation, Number(currentAlbumId), targetAlbumId);
                alert('התמונה הועברה בהצלחה.');
                if (currentAlbumId) {
                    photoUploadStore.fetchPhotosByAlbumId(Number(currentAlbumId));
                }
            }
            closeCopyMoveDialog();
        } catch (error) {
            console.error('שגיאה בפעולת העתקה/העברה:', error);
            alert('שגיאה בפעולת העתקה/העברה.');
        }
    };

    if (photoUploadStore.error) return <div>שגיאה: {photoUploadStore.error}</div>;
    if (!photoUploadStore.photos || photoUploadStore.photos.length === 0) {
        return <div>אין תמונות להצגה בתקיית {albumName}</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                padding: 3,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh'
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: 3,
                        textAlign: "center",
                        fontWeight: 'bold',
                        color: '#333'
                    }}
                >
                    {albumName} {/* שינוי כאן להצגת שם האלבום */}
                    {/* התמונות שלי */}
                </Typography>
                
                <PhotoGrid 
                    photos={photoUploadStore.photos} 
                    onPhotoClick={handlePhotoClick} 
                    onCopyMoveClick={openCopyMoveDialog} 
                />

                <CopyMoveModal 
                    open={isCopyMoveDialogOpen}
                    onClose={closeCopyMoveDialog}
                    isCopyOperation={isCopyOperation}
                    targetAlbumId={copyMoveTargetAlbumId}
                    albums={albumStore.albums}
                    onAlbumChange={handleCopyMoveTargetAlbumChange}
                    onConfirm={handleCopyMovePhoto}
                />

                {selectedPhotoIndex !== null && photoUploadStore.photos[selectedPhotoIndex] && (
                    <PhotoDetailModal
                        open={selectedPhotoIndex !== null}
                        photo={photoUploadStore.photos[selectedPhotoIndex]}
                        zoomLevel={zoomLevel}
                        onClose={handleCloseModal}
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                        onNext={handleNextPhoto}
                        onPrev={handlePrevPhoto}
                    />
                )}
            </Box>
        </ThemeProvider>
    );
});

export default PhotoGallery;         