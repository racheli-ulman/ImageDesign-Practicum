using ImageDesign.Core.Entities;
using ImageDesign.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Data.Repositories
{
    public class PhotoRepository:IPhotoRepository
    {
        private readonly DataContext _dataContext;

        public PhotoRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Photo>> GetAllPhotosAsync()
        {
            return await _dataContext.Photos.ToListAsync();
        }

        public async Task<Photo> GetPhotoByIdAsync(int id)
        {
            return await _dataContext.Photos.FindAsync(id);
        }



        public async Task<Photo> AddPhotoAsync(Photo photo)
        {
            await _dataContext.Photos.AddAsync(photo);
            return photo;
        }

        public async Task<Photo> UpdatePhotoAsync(int id, Photo photo)
        {
            var existingFile = await GetPhotoByIdAsync(id);
            if (existingFile == null) return null;
            existingFile.PhotoName = photo.PhotoName;
            existingFile.UserId = photo.UserId;
            existingFile.AlbumId = photo.AlbumId;
            existingFile.PhotoPath = photo.PhotoPath;
            existingFile.PhotoSize = photo.PhotoSize;
            return photo;
        }

        public async Task<bool> DeletePhotoAsync(int id)
        {
            var file = await GetPhotoByIdAsync(id);
            if (file == null) return false;

            _dataContext.Photos.Remove(file);
            return await _dataContext.SaveChangesAsync() > 0;
        }



    }
}
