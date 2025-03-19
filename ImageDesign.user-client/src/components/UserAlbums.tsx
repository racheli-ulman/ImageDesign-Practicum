// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Photo } from "../models/Photo";
// import { Album } from "../models/Album";
// import { useUser } from "../context/userContext";


// const UserAlbums: React.FC = () => {
//     const { user } = useUser(); // קבלת נתוני המשתמש מהקונטקסט
//     const userId = user ? user.id : null; // קבלת ה-ID של המשתמש
//     const [albums, setAlbums] = useState<Album[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchAlbums = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5083/api/Album/user/${userId}`);
//                 setAlbums(response.data);
//                 setLoading(false);
//             } catch (err: any) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchAlbums();
//     }, [userId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     console.log(albums);

//     return (
//         <div>
//             <h2>Albums of User {userId}</h2>
//             <div>
//             {albums.map(album => (
//                 <div key={album.id}> {/* השתמש ב-id כמפתח ייחודי */}
//                     <p>{album.albumName}</p>
//                 </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserAlbums;













import axios from "axios";
import { useEffect, useState } from "react";
import { Album } from "../models/Album";
import { useUser } from "../context/userContext";

const UserAlbums: React.FC = () => {
    const { user } = useUser(); // קבלת נתוני המשתמש מהקונטקסט
    const userId = user ? user.id : null; // קבלת ה-ID של המשתמש
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newAlbumName, setNewAlbumName] = useState<string>("");

    useEffect(() => {

        const fetchAlbums = async () => {
            try {
                const response = await axios.get(`http://localhost:5083/api/Album/user/${userId}`);
                setAlbums(response.data);
                setLoading(false);
                console.log("try");
                
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                console.log("catch");
                
            }
        };

        if (userId) {
            fetchAlbums();
        }
    }, [userId]);

    const handleCreateAlbum = async () => {
        if (!newAlbumName) return; // אם שם האלבום ריק, לא לעשות כלום
        try {
            const response = await axios.post(`http://localhost:5083/api/Album`, {
                albumName: newAlbumName,
                userId: userId,
            });
            setAlbums([...albums, response.data]); // הוספת האלבום החדש לרשימה
            setNewAlbumName(""); // איפוס שם האלבום החדש
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Albums of User {userId}</h2>
            <div>
                {albums.map(album => (
                    <div key={album.id}> {/* השתמש ב-id כמפתח ייחודי */}
                        <p>{album.albumName}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Create New Album</h3>
                <input
                    type="text"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                    placeholder="Album Name"
                />
                <button onClick={handleCreateAlbum}>Create Album</button>
            </div>
        </div>
    );
};

export default UserAlbums;