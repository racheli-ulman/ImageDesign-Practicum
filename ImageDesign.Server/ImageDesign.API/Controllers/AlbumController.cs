using AutoMapper;
using ImageDesign.API.Models;
using ImageDesign.Core.DTOs;
using ImageDesign.Core.IServices;
using ImageDesign.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ImageDesign.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly IMapper _mapper;

        public AlbumController(IAlbumService albumService, IMapper mapper)
        {
            _albumService = albumService;
            _mapper = mapper;
        }


        // GET: api/<AlbumController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumsDto>>> Get()
        {
            var albums = await _albumService.GetAllAlbumsAsync();
            var albumsDto = _mapper.Map<IEnumerable<AlbumsDto>>(albums);
            return Ok(albumsDto);
        }


        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumsDto>> Get(int id)
        {
            var album = await _albumService.GetAlbumByIdAsync(id);
            var albumDto = _mapper.Map<AlbumsDto>(album);
            return Ok(albumDto);
        }


        // POST api/<AlbumController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AlbumPostModel album)
        {

            if (album == null) return null;
            var albumdto = _mapper.Map<AlbumsDto>(album);
            var result = await _albumService.AddAlbumAsync(albumdto);
            if (result == null)
                return null;
            return Ok(result);
        }


        // PUT api/<AlbumController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] AlbumPostModel album)
        {
            if (id < 0 || album == null) return null;
            var success = await _albumService.UpdateAlbumAsync(id, _mapper.Map<AlbumsDto>(album));
            if (success == null) return null;
            return Ok(success.Id);
        }


        // DELETE api/<AlbumController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _albumService.DeleteAlbumAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }
    }
}
