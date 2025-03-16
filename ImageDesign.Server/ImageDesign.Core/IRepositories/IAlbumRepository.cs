using ImageDesign.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.IRepositories
{
    public interface IAlbumRepository
    {
        Task<IEnumerable<Album>> GetAllAlbumsAsync();
        Task<Album> GetAlbumByIdAsync(int id);
        Task<Album> AddAlbumAsync(Album album);
        Task<Album> UpdateAlbumAsync(int id,Album album);
        Task<bool> DeleteAlbumAsync(int id);
    }
}
