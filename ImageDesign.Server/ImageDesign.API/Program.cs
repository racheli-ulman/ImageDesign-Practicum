using ImageDesign.API;
using ImageDesign.Core;
using ImageDesign.Core.IRepositories;
using ImageDesign.Core.IServices;
using ImageDesign.Data;
using ImageDesign.Data.Repositories;
using ImageDesign.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();

builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITagService, TagService>();

builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();

builder.Services.AddAutoMapper(typeof(ProfileMapping),typeof(ProfileMappingPostModel));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>();
//builder.Services.AddDbContext<DataContext>(
//    options => options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=ImageDesign"));

//db:
//db:
//builder.Services.AddDbContext<DataContext>();
//builder.Services.AddDbContext<DataContext>(
//    options => options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=lingoflow_db"));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ImageDesign API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();
