using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI_00006424.Models;

namespace TaskTrackerAPI_00006424.Data
{
    public class AppDbContext: DbContext 
    {
        /// Initializes a new instance of the GeneralDbContext class
        public AppDbContext(DbContextOptions<AppDbContext> o) : base(o) { }


        /// Gets or sets the DbSet for managing User entities.
        public DbSet<UserModel> UserDbSet { get; set; }


        /// Gets or sets the DbSet for managing Task entities.
        public DbSet<TaskModel> TaskDbSet { get; set; }
    }
}
