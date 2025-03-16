using ImageDesign.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.IServices
{
    public interface IAlbumService
    {
        Task<IEnumerable<AlbumsDto>> GetAllAlbumsAsync();
        Task<AlbumsDto> GetAlbumByIdAsync(int id);
        Task<AlbumsDto> AddAlbumAsync(AlbumsDto album);
        Task<AlbumsDto> UpdateAlbumAsync(int id, AlbumsDto album);
        Task<bool> DeleteAlbumAsync(int id);
    }
}
