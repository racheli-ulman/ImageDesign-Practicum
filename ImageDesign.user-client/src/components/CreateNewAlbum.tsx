import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import albumStore from "../stores/albumStore";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";

interface CreateAlbumProps {
  onClose: () => void;
}

const CreateNewAlbum: React.FC<CreateAlbumProps> = ({ onClose }) => {
  const [albumName, setAlbumName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userData = sessionStorage.getItem("user"); // טען מה-sessionStorage
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user.user.id : null;
    console.log("User ID from sessionStorage: ", userId);
  
    if (!userId) {
      albumStore.setError("לא נמצא משתמש מחובר");
      return;
    }
  
    await albumStore.createAlbum(albumName, description, userId);
  
    if (!albumStore.error) {
      setAlbumName("");
      setDescription("");
      onClose();
    }
  };
  

  return (
    <Dialog open onClose={onClose}>
      <Paper
        sx={{
          maxWidth: 400, // הקטנת הרוחב המקסימלי של המודאל
          padding: 2, // הקטנת המרווחים הפנימיים
          borderRadius: 2,
          boxShadow: 3,
          animation: "fadeIn 0.3s ease",
          textAlign: "right", // טקסט משמאל לימין
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" flexDirection="column">
              <FolderIcon sx={{ fontSize: 50, color: "#f8d775", mb: 1 }} /> {/* הקטנת האייקון */}
              <Typography variant="h6" color="textPrimary"> {/* הקטנת הגופן */}
                יצירת תיקייה חדשה
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {albumStore.error && (
            <Box
              sx={{
                backgroundColor: "#ffe8e8",
                color: "#d9534f",
                padding: 1,
                borderRadius: 1,
                mb: 2,
                textAlign: "center",
              }}
            >
              {albumStore.error}
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <Typography sx={{ mb: 1, fontWeight: 500, color: "#555" }}>
                שם התיקיה
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="הזן שם לתיקיה החדשה"
                required
                InputProps={{
                  sx: { height: 40 }, // הקטנת גובה השדה
                }}
              />
            </Box>
            <Box mb={2}>
              <Typography sx={{ mb: 1, fontWeight: 500, color: "#555" }}>
                תיאור (אופציונלי)
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="הוסף תיאור קצר לתיקיה"
                rows={3}
                InputProps={{
                  sx: { height: 60 }, // הקטנת גובה השדה
                }}
              />
            </Box>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  flex: 1,
                  margin: 1,
                  padding: 1,
                  fontSize: 14, // הקטנת הגופן של הכפתורים
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  "&:hover": { backgroundColor: "#e5e5f5" },
                }}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 1,
                  margin: 1,
                  padding: 1,
                  fontSize: 14, // הקטנת הגופן של הכפתורים
                  backgroundColor: "#556b9b",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#455a8a",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                יצירת תיקיה
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default observer(CreateNewAlbum);