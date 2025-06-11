using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TaskTrackerAPI_00006424.DTOs;
using TaskTrackerAPI_00006424.Models;
using TaskTrackerAPI_00006424.Repositories;

namespace TaskTrackerAPI_00006424.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskModelsController : ControllerBase
    {
        private readonly IRepository<TaskModel> _taskRepository;
        private readonly IMapper _mapper;

        public TaskModelsController(IRepository<TaskModel> taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _taskRepository.GetAllAsync();
            var taskDtos = _mapper.Map<IEnumerable<TaskDto>>(tasks);
            return Ok(taskDtos);
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var taskModel = await _taskRepository.GetByIdAsync(id);

            if (taskModel == null)
            {
                return NotFound();
            }

            var taskDto = _mapper.Map<TaskDto>(taskModel);
            return Ok(taskDto);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskDto taskDto)
        {
            if (id != taskDto.Id)
            {
                return BadRequest("Task ID mismatch.");
            }

            var taskModel = _mapper.Map<TaskModel>(taskDto);

            try
            {
                await _taskRepository.UpdateAsync(taskModel);
            }
            catch (Exception ex)
            {
                // Handle potential concurrency issues or other exceptions
                return StatusCode(500, $"Error updating task: {ex.Message}");
            }

            return NoContent();
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
        {
            var taskModel = _mapper.Map<TaskModel>(taskDto);
            await _taskRepository.CreateAsync(taskModel);

            var createdTaskDto = _mapper.Map<TaskDto>(taskModel);
            return CreatedAtAction(nameof(GetTask), new { id = createdTaskDto.Id }, createdTaskDto);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> +++DeleteTask(int id)
        {
            var taskModel = await _taskRepository.GetByIdAsync(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            await _taskRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
