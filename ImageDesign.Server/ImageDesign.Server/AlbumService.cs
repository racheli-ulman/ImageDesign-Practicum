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
    public class AlbumService : IAlbumService
    {
        //private readonly IAlbumRepository _repositoryManager.AlbumM;
        private readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;


        public AlbumService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AlbumsDto>> GetAllAlbumsAsync()
        {
            var albums = _repositoryManager.AlbumM.GetAllAlbumsAsync();
            return _mapper.Map<IEnumerable<AlbumsDto>>(albums);
        }

        public async Task<AlbumsDto> GetAlbumByIdAsync(int id)
        {
            var album = _repositoryManager.AlbumM.GetAlbumByIdAsync(id);
            return _mapper.Map<AlbumsDto>(album);
        }

        public async Task<AlbumsDto> AddAlbumAsync(AlbumsDto album)
        {

            var addAlbum = _mapper.Map<Album>(album);
            //if (_repositoryManager.AlbumM.GetAlbumByIdAsync(album.Id) == null)
            //{
                var createAlbum = await _repositoryManager.AlbumM.AddAlbumAsync(addAlbum);
            await _repositoryManager.saveAsync();

            return _mapper.Map<AlbumsDto>(createAlbum);
            //}
            return null;
        }


        public async Task<AlbumsDto> UpdateAlbumAsync(int id, AlbumsDto album)
        {
            if (id < 0 || album == null)
                return null;
            var updateAlbum = _mapper.Map<Album>(album);
            var result =await _repositoryManager.AlbumM.UpdateAlbumAsync(id, updateAlbum);
            await _repositoryManager.saveAsync();

            return _mapper.Map<AlbumsDto>(result);
        }

        public async Task<bool> DeleteAlbumAsync(int id)
        {
            await _repositoryManager.saveAsync();
            return await _repositoryManager.AlbumM.DeleteAlbumAsync(id);
        }

    }
}
