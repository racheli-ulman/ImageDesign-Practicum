import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import albumStore from "../stores/albumStore";
import CreateNewAlbum from "./CreateNewAlbum";
import { SelectedAlbum } from "../models/Album";
import userStore from "../stores/userStore";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // אייקון סל מחזור
  
// import DeleteIcon from '@mui/icons-material/DeleteIcon'; // או DeleteForeverIcon
import UserPhotosDialog from "./Collage/UserPhotos"; // יבוא של הקומפוננטה החדשה
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Album } from "../models/Album";

const UserAlbums: React.FC = () => {
  const navigate = useNavigate();
  const userId = userStore.user?.user?.id ?? null;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openCollageDialog, setOpenCollageDialog] = useState<boolean>(false); // מצב חדש לדיאלוג הקולאז'
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null);
  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [newAlbumDescription, setnewAlbumDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log("Fetching albums for user ID: ", userId);

      if (userId) {
        try {
          await albumStore.fetchAlbums(userId);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchAlbums();
  }, [userId]);

  const handleAlbumClick = (albumId: number) => {
    navigate(`/get-photos/${albumId}`);
  };

  const handleEditAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;

    try {
      const updatedAlbum = {
        id: selectedAlbum.id,
        albumName: newAlbumName,
        userId: userId,
        description: newAlbumDescription,
      };

      await albumStore.updateAlbum(updatedAlbum);
      setOpenEditModal(false);
      setSelectedAlbum(null);
      setNewAlbumName("");
      setnewAlbumDescription("");
      // setError(null); // Reset error state on successful update
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAlbum = async () => {
    if (!selectedAlbum) return;

    try {
      await albumStore.deleteAlbum(selectedAlbum.id);
      setOpenDeleteModal(false);
      setSelectedAlbum(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openEditAlbumModal = (album: Album) => {
    if (album.id !== undefined) {
      setSelectedAlbum({ id: album.id, name: album.albumName });
    }
    setNewAlbumName(album.albumName);
    setnewAlbumDescription(album.description); // הוספת תיאור חדש
    setOpenEditModal(true);
  };

  const openDeleteAlbumModal = (album: Album) => {
    if (album.id !== undefined) {
      setSelectedAlbum({ id: album.id, name: album.albumName });
    }
    // setSelectedAlbum({ id: album.id, name: album.albumName });
    setNewAlbumName(album.albumName);
    setnewAlbumDescription(album.description); // הוספת תיאור חדש
    setOpenDeleteModal(true);
  };

  const filteredAlbums = albumStore.albums.filter((album) =>
    album.albumName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* סידבר */}
      <Box
        sx={{
          width: "20%",
          padding: 2,
          paddingTop: "25px",
          backgroundColor: "#f0f0f0",
          position: "fixed",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          ניהול תיקיות
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="חפש תיקיה...🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateModal(true)}
          sx={{ width: "100%", marginBottom: 2 }}
        >
          הוספת תיקיה חדשה
        </Button>

        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => navigate(`/add-photo`)}
          sx={{ width: "100%", marginBottom: 2 }}
        >
          העלאת תמונה לאלבום שלי
        </Button>

        <Button
          variant="contained"
          startIcon={<PhotoLibraryIcon />}
          onClick={() => setOpenCollageDialog(true)} // פתיחת הדיאלוג במקום ניווט
          sx={{ width: "100%", marginBottom: 2 }}
        >
          צור קולאז מתמונות האלבומים שלך
        </Button>

        <Button
    variant="contained"
    startIcon={<DeleteForeverIcon />} // אייקון סל המחזור
    onClick={() => navigate(`/tin-photo`)}
    sx={{ width: "100%" }}
>
    סל המחזור        
</Button>

      </Box>

      <Box sx={{ flexGrow: 1, padding: 2, marginLeft: "20%", overflowY: "auto" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
          האלבומים שלי
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {filteredAlbums.map((album) => (
            <Paper
              key={album.id}
              sx={{
                padding: 1,
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative",
                width: 200,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                },
              }}

              onClick={() => {
                if (album.id !== undefined) {
                  handleAlbumClick(album.id);
                } else {
                  console.error("Album ID is undefined");
                }
              }}
            >
              <Box sx={{ fontSize: 80, color: "#f8d775" }}>📁</Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", width: "100%", textAlign: "center" }}>
                {album.albumName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditAlbumModal(album);
                  }}
                >
                  <EditIcon sx={{ color: "#5bc0de" }} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteAlbumModal(album);
                  }}
                >
                  <DeleteIcon sx={{ color: "#d9534f" }} />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* מודלים ודיאלוגים */}
        {openCreateModal && <CreateNewAlbum onClose={() => setOpenCreateModal(false)} />}

        {/* דיאלוג הקולאז' החדש */}
        <UserPhotosDialog
          open={openCollageDialog}
          onClose={() => setOpenCollageDialog(false)}
        />

        {openEditModal && selectedAlbum && (
          <Dialog open onClose={() => setOpenEditModal(false)}>
            <Paper sx={{ padding: 2, width: 400 }}>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">עריכת שם תיקיה</Typography>
                  <IconButton onClick={() => setOpenEditModal(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleEditAlbum}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ marginBottom: 1, fontWeight: 500, color: "#555" }}>
                      שם התיקיה
                    </Typography>
                    <InputBase
                      fullWidth
                      value={newAlbumName}
                      onChange={(e) => setNewAlbumName(e.target.value)}
                      placeholder="הזן שם חדש לתיקיה"
                      required
                      sx={{ padding: 1, border: "1px solid #ddd", borderRadius: 1 }}
                    />
                  </Box>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenEditModal(false)}
                      sx={{
                        flex: 1,
                        margin: 1,
                        padding: 1,
                        fontSize: 14,
                        backgroundColor: "#f5f5f5",
                        color: "#333",
                        "&:hover": { backgroundColor: "#e5e5e5" },
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
                        fontSize: 14,
                        backgroundColor: "#556b9b",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#455a8a",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      עדכון
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Paper>
          </Dialog>
        )}

        {openDeleteModal && selectedAlbum && (
          <Dialog open onClose={() => setOpenDeleteModal(false)}>
            <Paper sx={{ padding: 2, width: 400 }}>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">מחיקת תיקיה</Typography>
                  <IconButton onClick={() => setOpenDeleteModal(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Typography>
                  האם אתה בטוח שברצונך למחוק את התיקיה "{selectedAlbum.name}"? פעולה זו אינה ניתנת לביטול.
                </Typography>
                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenDeleteModal(false)}
                    sx={{
                      flex: 1,
                      margin: 1,
                      padding: 1,
                      fontSize: 14,
                      backgroundColor: "#f5f5f5",
                      color: "#333",
                      "&:hover": { backgroundColor: "#e5e5e5" },
                    }}
                  >
                    ביטול
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleDeleteAlbum}
                    sx={{
                      flex: 1,
                      margin: 1,
                      padding: 1,
                      fontSize: 14,
                      backgroundColor: "#556b9b",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#455a8a",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    אישור מחיקה
                  </Button>
                </DialogActions>
              </DialogContent>
            </Paper>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default observer(UserAlbums);