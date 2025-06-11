namespace TaskTrackerAPI_00006424.DTOs
{
    // Data Transfer Object (DTO) representing a task in the system.
    public class TaskDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public int UserId { get; set; }

        public UserDto? User { get; set; }
    }
}
