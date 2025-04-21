import React from 'react';
import { Box, Typography, Modal, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Album {
    id: number;
    albumName: string;
}

interface CopyMoveModalProps {
    open: boolean;
    isCopyOperation: boolean;
    targetAlbumId: number | '';
    albums: Album[] | null;
    onClose: () => void;
    onAlbumChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    onConfirm: () => void;
}

const CopyMoveModal: React.FC<CopyMoveModalProps> = ({
    open,
    isCopyOperation,
    targetAlbumId,
    albums,
    onClose,
    onAlbumChange,
    onConfirm
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Typography variant="h6" component="h2">
                    {isCopyOperation ? 'העתקת תמונה' : 'העברת תמונה'}
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="select-album-label">בחר אלבום יעד</InputLabel>
                    <Select
                        labelId="select-album-label"
                        id="select-album"
                        value={targetAlbumId}
                        label="בחר אלבום יעד"
                        onChange={onAlbumChange}
                    >
                        {albums && albums.map((album) => (
                            <MenuItem key={album.id} value={album.id}>
                                {album.albumName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                    <button onClick={onConfirm}>
                        {isCopyOperation ? 'העתקה' : 'העברה'}
                    </button>
                    <button onClick={onClose}>ביטול</button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CopyMoveModal;