using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TaskTrackerAPI_00006424.DTOs;
using TaskTrackerAPI_00006424.Models;
using TaskTrackerAPI_00006424.Repositories;

namespace TaskTrackerAPI_00006424.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserModelsController : ControllerBase
    {
        private readonly IRepository<UserModel> _userRepository;
        private readonly IMapper _mapper;

        public UserModelsController(IRepository<UserModel> userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserDbSet()
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDtos);
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserDto userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }

            var user = _mapper.Map<UserModel>(userDto);
            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserDto userDto)
        {
            var user = _mapper.Map<UserModel>(userDto);
            await _userRepository.CreateAsync(user);
            var createdUserDto = _mapper.Map<UserDto>(user);
            return CreatedAtAction(nameof(GetUserModel), new { id = createdUserDto.Id }, createdUserDto);
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteAsync(id);
            return NoContent();
        }

    }
}
