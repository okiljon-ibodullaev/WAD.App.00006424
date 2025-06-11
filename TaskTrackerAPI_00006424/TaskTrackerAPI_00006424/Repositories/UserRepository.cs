using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI_00006424.Data;
using TaskTrackerAPI_00006424.Models;

namespace TaskTrackerAPI_00006424.Repositories
{
    public class UserRepository : IRepository<UserModel>
    {
        private readonly AppDbContext _context;

        
        /// Initializes a new instance of the UserRepository class.
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        // Create User
        public async Task CreateAsync(UserModel entity)
        {
            await _context.UserDbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        // Delete User
        public async Task DeleteAsync(int id)
        {
            var user = await _context.UserDbSet.FindAsync(id);
            if (user != null)
            {
                _context.UserDbSet.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        // Get All Users
        public async Task<IEnumerable<UserModel>> GetAllAsync()
        {
            return await _context.UserDbSet.ToListAsync();
        }

        // Get User
        public async Task<UserModel> GetByIdAsync(int id)
        {
            return await _context.UserDbSet.FindAsync(id);
        }

        // Update User
        public async Task UpdateAsync(UserModel entity)
        {
            _context.UserDbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
