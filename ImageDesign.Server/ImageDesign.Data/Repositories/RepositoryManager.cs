using ImageDesign.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {



        private readonly DataContext _dataContext;

        public IAlbumRepository AlbumM { get; }

        public IPhotoRepository PhotoM { get; }

        public IUserRepository UserM { get; }

        public ITagRepository TagM { get; }

        public RepositoryManager(DataContext dataContext, IAlbumRepository album, IPhotoRepository photo, IUserRepository user, ITagRepository tag)
        {
            _dataContext = dataContext;
            AlbumM = album;
            PhotoM = photo;
            UserM = user;
            TagM = tag;
        }


        public async Task saveAsync()
        {
            _dataContext.SaveChanges();
        }
    }
}
