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
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;

        public PhotoController(IPhotoService photoService, IMapper mapper)
        {
            _photoService = photoService;
            _mapper = mapper;
        }

        // GET: api/<PhotoController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> Get()
        {
            var photos = await _photoService.GetAllPhotosAsync();
            var photoDto = _mapper.Map<IEnumerable<PhotoDto>>(photos);
            return Ok(photoDto);
        }

        // GET api/<PhotoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoDto>> Get(int id)
        {
            var photo = await _photoService.GetPhotoByIdAsync(id);
            var photodto = _mapper.Map<PhotoDto>(photo);
            return Ok(photodto);
        }

        // POST api/<PhotoController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PhotoPostModel photo)
        {
            if (photo == null) return null;
            var photodto = _mapper.Map<PhotoDto>(photo);
            var result = await _photoService.AddPhotoAsync(photodto);
            if (result == null)
                return null;
            return Ok(result);
        }

        // PUT api/<PhotoController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PhotoPostModel photo)
        {
            if (id < 0 || photo == null) return null;
            var success = await _photoService.UpdatePhotoAsync(id, _mapper.Map<PhotoDto>(photo));
            if (success == null) return null;
            return Ok(success.Id);
        }

        // DELETE api/<PhotoController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _photoService.DeletePhotoAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }
    }
}
