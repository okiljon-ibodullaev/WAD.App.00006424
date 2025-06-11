using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI_00006424.Data;
using TaskTrackerAPI_00006424.Models;

namespace TaskTrackerAPI_00006424.Repositories
{
    public class TaskRepository : IRepository<TaskModel>
    {
        private readonly AppDbContext _context;


        /// Initializes a new instance of the UserRepository class.
        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        // Create Task
        public async Task CreateAsync(TaskModel entity)
        {
            
            await _context.TaskDbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        // Delete Task
        public async Task DeleteAsync(int id)
        {
            var user = await _context.TaskDbSet.FindAsync(id);
            if (user != null)
            {
                _context.TaskDbSet.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        // Get All Tasks
        public async Task<IEnumerable<TaskModel>> GetAllAsync()
        {
            return await _context.TaskDbSet.Include(e => e.User).ToListAsync();
        }

        // Get Task
        public async Task<TaskModel> GetByIdAsync(int id)
        {
            return await _context.TaskDbSet.Include(e => e.User).FirstOrDefaultAsync(e => e.Id == id);
        }

        // Update Task
        public async Task UpdateAsync(TaskModel entity)
        {
            _context.TaskDbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
