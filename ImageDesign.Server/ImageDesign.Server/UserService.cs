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
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;


        public UserService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var user = await _repositoryManager.UserM.GetAllUsersAsync();
            return _mapper.Map<IEnumerable<UserDto>>(user);
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _repositoryManager.UserM.GetUserByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> AddUserAsync(UserDto user)
        {
            var addeUser = _mapper.Map<User>(user);
            var createUser = await _repositoryManager.UserM.AddUserAsync(addeUser);
            await _repositoryManager.saveAsync();
            return _mapper.Map<UserDto>(createUser);
        }

        public async Task<UserDto> UpdateUserAsync(int id, UserDto user)
        {
            if (id < 0 || user == null)
                return null;
            var updateUser = _mapper.Map<User>(user);
            var result = await _repositoryManager.UserM.UpdateUserAsync(id, updateUser);
            Console.WriteLine("נקודת עצירה");
            await _repositoryManager.saveAsync();

            return _mapper.Map<UserDto>(result);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            await _repositoryManager.saveAsync();
            return await _repositoryManager.UserM.DeleteUserAsync(id);
        }
    }
}
