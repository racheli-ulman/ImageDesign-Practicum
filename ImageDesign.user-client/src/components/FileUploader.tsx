import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react-lite';
import { 
    Box, 
    Button, 
    LinearProgress, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    Avatar, 
    Chip 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import photoUploadStore from '../stores/photoUploaderStore';
import userStore from '../stores/userStore';
import albumStore from '../stores/albumStore';

const FileUploader = observer(() => {
    const navigate = useNavigate();
    const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        const userId = userStore.user?.user?.id ?? null;
        if (userId) {
            albumStore.fetchAlbums(userId);
        }
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedTagId) {
            Swal.fire({
                icon: 'error',
                title: 'לא נבחרה תגית',
                text: 'אנא בחר תגית לפני העלאת התמונה.',
            });
            return;
        }
    
        if (e.target.files && selectedAlbum) {
            const file = e.target.files[0];
            
            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
    
            photoUploadStore.setFile(file);
    
            await photoUploadStore.uploadFile(file, selectedAlbum, selectedTagId);
            if (photoUploadStore.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה בהעלאה',
                    text: photoUploadStore.error,
                });
            } else {
                const downloadUrl = await photoUploadStore.getDownloadUrl(file.name);
                if (downloadUrl) {
                    photoUploadStore.imageUrl = downloadUrl;
                }
                
                // Show success and navigate to albums
                await Swal.fire({
                    icon: 'success',
                    title: 'הקובץ הועלה בהצלחה!',
                    text: 'מעביר אותך לדף האלבומים...',
                    timer: 1500,
                    showConfirmButton: false,
                    willClose: () => {
                        navigate('/userAlbums');
                    }
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'לא נבחר אלבום',
                text: 'אנא בחר אלבום לפני העלאת התמונה.',
            });
        }
    };
    

    return (
        <Box sx={{ 
            maxWidth: 600, 
            margin: '0 auto', 
            padding: 3, 
            backgroundColor: '#f0f4f8',
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
                <CardContent>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            textAlign: 'center', 
                            marginBottom: 3,
                            color: '#2c3e50',
                            fontWeight: 'bold'
                        }}
                    >
                        העלאת תמונה חדשה
                    </Typography>

                    {/* Album Selection */}
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, color: '#34495e' }}>
                                בחר אלבום יעד
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {albumStore.albums.map((album) => (
                                    <Chip 
                                        key={album.id}
                                        label={album.albumName}
                                        onClick={() => setSelectedAlbum(album.id)}
                                        color={selectedAlbum === album.id ? 'primary' : 'default'}
                                        sx={{ 
                                            fontSize: '0.9rem',
                                            padding: '0 8px'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Tag Selection */}
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, color: '#34495e' }}>
                                בחר תגית
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {photoUploadStore.tag.map((tag) => (
                                    <Chip 
                                        key={tag.id}
                                        label={tag.tagName}
                                        onClick={() => setSelectedTagId(tag.id)}
                                        color={selectedTagId === tag.id ? 'secondary' : 'default'}
                                        sx={{ 
                                            fontSize: '0.9rem',
                                            padding: '0 8px'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>

                    {/* File Upload */}
                    <Box sx={{ 
                        border: '2px dashed #bdc3c7', 
                        borderRadius: 2, 
                        padding: 3, 
                        textAlign: 'center',
                        backgroundColor: 'white',
                        marginBottom: 2
                    }}>
                        <input 
                            accept="image/*" 
                            type="file" 
                            hidden 
                            id="upload-file"
                            onChange={handleFileChange} 
                        />
                        <label htmlFor="upload-file">
                            <Button 
                                variant="outlined" 
                                component="span" 
                                startIcon={<CloudUploadIcon />}
                                sx={{ 
                                    marginBottom: 2,
                                    padding: '10px 20px',
                                    borderColor: '#3498db',
                                    color: '#3498db',
                                    '&:hover': {
                                        backgroundColor: '#f0f4f8',
                                        borderColor: '#2980b9'
                                    }
                                }}
                            >
                                בחר תמונה להעלאה
                            </Button>
                        </label>

                        {previewImage && (
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                marginTop: 2
                            }}>
                                <Avatar 
                                    src={previewImage}
                                    sx={{ 
                                        width: 120, 
                                        height: 120, 
                                        border: '3px solid #3498db' 
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Upload Progress */}
                    {photoUploadStore.progress > 0 && (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            marginBottom: 2 
                        }}>
                            <Box sx={{ width: '100%', marginBottom: 1 }}>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#7f8c8d', 
                                        textAlign: 'center',
                                        marginBottom: 1 
                                    }}
                                >
                                    {`מעלה תמונה: ${photoUploadStore.progress}%`}
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={photoUploadStore.progress} 
                                    sx={{ 
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#3498db'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    )}

                    {/* Uploaded Image Preview */}
                    {/* {photoUploadStore.imageUrl && (
                        <Box sx={{ 
                            textAlign: 'center', 
                            marginTop: 2,
                            padding: 2,
                            backgroundColor: 'white',
                            borderRadius: 2
                        }}>
                            <Typography variant="h6" sx={{ marginBottom: 2, color: '#2c3e50' }}>
                                התמונה שהועלתה
                            </Typography>
                            <img 
                                src={photoUploadStore.imageUrl} 
                                alt="Uploaded" 
                                style={{ 
                                    maxWidth: '100%', 
                                    borderRadius: 8,
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                                }} 
                            />
                        </Box>
                    )} */}
                </CardContent>
            </Card>
        </Box>
    );
});

export default FileUploader;


