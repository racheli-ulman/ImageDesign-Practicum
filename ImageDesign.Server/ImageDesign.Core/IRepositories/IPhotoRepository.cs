﻿using ImageDesign.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.IRepositories
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetAllPhotosAsync();
        Task<Photo> GetPhotoByIdAsync(int id);
        Task<Photo> AddPhotoAsync(Photo photo);
        Task<Photo> UpdatePhotoAsync(int id, Photo photo);
        Task<bool> DeletePhotoAsync(int id);
    }
}
