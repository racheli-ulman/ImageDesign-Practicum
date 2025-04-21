import React from 'react';
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Photo {
    photoPath: string;
}

interface PhotoDetailModalProps {
    open: boolean;
    photo: Photo;
    zoomLevel: number;
    onClose: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
    open,
    photo,
    zoomLevel,
    onClose,
    onZoomIn,
    onZoomOut,
    onNext,
    onPrev
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1000,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                }}>
                    <IconButton
                        onClick={onPrev}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            margin: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>

                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                }}>
                    <IconButton
                        onClick={onNext}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            margin: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                <Box sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    display: 'flex',
                    gap: 2,
                }}>
                    <IconButton
                        onClick={onZoomOut}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }
                        }}
                    >
                        <ZoomOutIcon />
                    </IconButton>
                    <IconButton
                        onClick={onZoomIn}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }
                        }}
                    >
                        <ZoomInIcon />
                    </IconButton>
                </Box>

                <img
                    src={photo.photoPath}
                    alt="Enlarged"
                    style={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        transform: `scale(${zoomLevel})`,
                        transition: 'transform 0.3s ease',
                    }}
                />
            </Box>
        </Modal>
    );
};

export default PhotoDetailModal;