import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    CircularProgress,
    TextField,
    Checkbox,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import albumStore from '../../stores/albumStore';
import CollageCreator from './CreateCollage'; // ייבוא קומפוננטת הקולאז' החדשה

interface UserPhotosDialogProps {
    open: boolean;
    onClose: () => void;
}

const UserPhotosDialog: React.FC<UserPhotosDialogProps> = observer(({ open, onClose }) => {
    const userData = sessionStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user.user.id : null;

    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [collageDialogOpen, setCollageDialogOpen] = useState<boolean>(false); // מצב לדיאלוג הקולאז'

    useEffect(() => {
        if (open && userId) {
            setLoading(true);
            albumStore.fetchPhotos(userId)
                .finally(() => setLoading(false));
        } else if (!open) {
            setSelectedPhotos([]); // איפוס הבחירה כשסוגרים את הדיאלוג
        }
    }, [open, userId]);

    const handlePhotoSelect = useCallback((photoId: number, isSelected: boolean) => {
        setSelectedPhotos(prevSelected => {
            if (isSelected) {
                return [...prevSelected, photoId];
            } else {
                return prevSelected.filter(id => id !== photoId);
            }
        });
    }, []);

    const filteredPhotos = useMemo(() => {
        return albumStore.photos.filter((photo: any) => // התאם את הטיפוס למה שחוזר מהשרת
            photo.photoName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [albumStore.photos, searchTerm]);

    const handleCreateCollage = () => {
        // במקום להדפיס למסוף, נפתח את דיאלוג הקולאז'
        setCollageDialogOpen(true);
    };

    const handleCollageDialogClose = () => {
        setCollageDialogOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="h2">
                            <PhotoLibraryIcon sx={{ mr: 1 }} /> בחר תמונות לקולאז'
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="חיפוש תמונות"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : filteredPhotos.length === 0 ? (
                        <Typography>לא נמצאו תמונות.</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {filteredPhotos.map((photo: any) => ( // התאם את הטיפוס למה שחוזר מהשרת
                                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                                    <Paper elevation={3} sx={{ position: 'relative' }}>
                                        <Box sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
                                            <Checkbox
                                                checked={selectedPhotos.includes(photo.id)}
                                                onChange={(e) => handlePhotoSelect(photo.id, e.target.checked)}
                                            />
                                        </Box>
                                        <img
                                            src={photo.photoPath} // הנח שיש שדה photoPath
                                            alt={photo.photoName} // הנח שיש שדה photoName
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                        <Typography variant="caption" display="block" align="center">
                                            {photo.photoName}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>ביטול</Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleCreateCollage} 
                        disabled={selectedPhotos.length === 0}
                    >
                        צור קולאז' ({selectedPhotos.length})
                    </Button>
                </DialogActions>
            </Dialog>

            {/* קומפוננטת הקולאז' */}
            <CollageCreator
                open={collageDialogOpen}
                onClose={handleCollageDialogClose}
                selectedPhotoIds={selectedPhotos}
            />
        </>
    );
});

export default UserPhotosDialog;