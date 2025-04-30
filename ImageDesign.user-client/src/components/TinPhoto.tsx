import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import photoUploadStore from '../stores/photoUploaderStore'; // עדכן את הייבוא בהתאם למיקום שלך

import { FaUndo } from 'react-icons/fa'; // ייבוא של אייקון השחזור

const TinPhoto: React.FC = observer(() => {
    const userData = sessionStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user.user.id : null;

    useEffect(() => {
        if (userId) {
            photoUploadStore.fetchRecyclingPhotos(userId); // קריאה למתודה כדי להביא את התמונות שנמחקו
        }
    }, [userId]);

    if (photoUploadStore.error) return <div>שגיאה: {photoUploadStore.error}</div>;

    const deletedPhotos = photoUploadStore.recyclingPhotos; // השתמש במערך של התמונות שנמחקו

    if (deletedPhotos.length === 0) {
        return <div>סל המחזור ריק</div>;
    }

    const handleRestorePhoto = async (photoId: number) => {
        await photoUploadStore.restorePhoto(photoId); // קריאה לשחזור התמונה
    };

    return (
        <div>
            {deletedPhotos.map((photo, index) => (
                <div key={`${photo.id}-${index}`} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                    <img src={photo.photoPath} alt={photo.photoName} style={{ width: '150px', height: 'auto' }} />
                    <button 
                        onClick={() => handleRestorePhoto(photo.id)} 
                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <FaUndo size={20} color="green" title="שחזור תמונה" />
                    </button>
                </div>
            ))}
        </div>
    );
});

export default TinPhoto;
