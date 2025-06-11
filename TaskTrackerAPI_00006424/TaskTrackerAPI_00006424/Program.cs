using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI_00006424.Data;
using TaskTrackerAPI_00006424.MappingProfiles;
using TaskTrackerAPI_00006424.Models;
using TaskTrackerAPI_00006424.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Adding Mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding Swagger Docs

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Task Tracker Application API 00006424",
        Version = "v1",
        Description = "WAD 00006424"
    });
});

builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlServer(
    builder.Configuration.GetConnectionString("SqlUrl")));

// Adding Repositories
builder.Services.AddTransient<IRepository<UserModel>, UserRepository>();
builder.Services.AddTransient<IRepository<TaskModel>, TaskRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Allow CORS
app.UseCors(options =>
options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
);

app.MapControllers();

app.Run();
