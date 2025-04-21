using ImageDesign.Core.DTOs;
using ImageDesign.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.IServices
{
    public interface IPhotoService
    {
        Task<IEnumerable<PhotoDto>> GetAllPhotosAsync();
        Task<PhotoDto> GetPhotoByIdAsync(int id);
        Task<PhotoDto> AddPhotoAsync(PhotoDto photo);
        Task<PhotoDto> UpdatePhotoAsync(int id, PhotoDto photo);
        Task<bool> DeletePhotoAsync(int id);
        Task<IEnumerable<PhotoDto>> GetPhotosByAlbumIdAsync(int albumId);
        Task<PhotoDto> CopyPhotoToAlbumAsync(int photoId, int targetAlbumId);
        Task<PhotoDto> MovePhotoToAlbumAsync(int photoId, int sourceAlbumId, int targetAlbumId);

    }
}
