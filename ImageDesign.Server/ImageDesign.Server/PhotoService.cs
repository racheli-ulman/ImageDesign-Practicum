using AutoMapper;
using ImageDesign.Core.DTOs;
using ImageDesign.Core.Entities;
using ImageDesign.Core.IRepositories;
using ImageDesign.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Service
{
    public class PhotoService:IPhotoService
    {
        private readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;


        public PhotoService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PhotoDto>> GetAllPhotosAsync()
        {
            var photos= await _repositoryManager.PhotoM.GetAllPhotosAsync();
            return _mapper.Map<IEnumerable<PhotoDto>>(photos);
        }

        public async Task<PhotoDto> GetPhotoByIdAsync(int id)
        {
            var photo= await _repositoryManager.PhotoM.GetPhotoByIdAsync(id);
            return _mapper.Map<PhotoDto>(photo);
        }

        public async Task<PhotoDto> AddPhotoAsync(PhotoDto photo)
        {
            var addPhoto = _mapper.Map<Photo>(photo);
            //if (_repositoryManager.AlbumM.GetAlbumByIdAsync(photo.Id) == null)
            //{
                var createAlbum = await _repositoryManager.PhotoM.AddPhotoAsync(addPhoto);
            await _repositoryManager.saveAsync();

            return _mapper.Map<PhotoDto>(addPhoto);
            //}
            return null;
        }

        public async Task<PhotoDto> UpdatePhotoAsync(int id, PhotoDto photo)
        {
            if (id < 0 || photo == null)
                return null;
            var updatePhoto = _mapper.Map<Photo>(photo);
            var result =await _repositoryManager.PhotoM.UpdatePhotoAsync(id, updatePhoto);
            await _repositoryManager.saveAsync();

            return _mapper.Map<PhotoDto>(result);
        }

        public async Task<bool> DeletePhotoAsync(int id)
        {
            await _repositoryManager.saveAsync();
            return await _repositoryManager.PhotoM.DeletePhotoAsync(id);
        }


    }
}
