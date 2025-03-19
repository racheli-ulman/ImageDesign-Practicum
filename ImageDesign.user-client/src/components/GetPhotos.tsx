import { useEffect, useState } from "react";
import { Photo } from "../models/Photo";
import axios from "axios";

interface AlbumImagesProps {
    albumId: number;
  }
  
  const GetPhotos: React.FC<AlbumImagesProps> = ({ albumId }) => {
    const [images, setImages] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`http://localhost:5083/api/Album/${albumId}/images`);
          setImages(response.data);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchImages();
    }, [albumId]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h2>Images in Album {albumId}</h2>
        <div>
          {images.map(image => (
            <div key={image.Id}>
              <img src={image.PhotoPath} alt={image.PhotoName} />
              <p>{image.PhotoName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default GetPhotos;