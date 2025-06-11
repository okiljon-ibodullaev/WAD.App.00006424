namespace TaskTrackerAPI_00006424.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public ICollection<TaskModel> Tasks { get; set; }
    }
}
