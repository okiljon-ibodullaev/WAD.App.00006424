using AutoMapper;
using TaskTrackerAPI_00006424.DTOs;
using TaskTrackerAPI_00006424.Models;

namespace TaskTrackerAPI_00006424.MappingProfiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Map Dto to Model and Model to Dto
            CreateMap<TaskDto, TaskModel>().ReverseMap();
            CreateMap<UserDto, UserModel>().ReverseMap();
        }
    }
}
