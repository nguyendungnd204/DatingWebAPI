using DatingApp.Data;
using DatingApp.Helpers;
using DatingApp.Interfaces;
using DatingApp.Middleware;
using DatingApp.Models;
using DatingApp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
    AddJwtBearer(options=>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]))
        };
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//string jsonFilePath = "Data/UserSeedData.json";
//string jsonData = File.ReadAllText(jsonFilePath);
//using var scope = builder.Services.BuildServiceProvider().CreateScope();
//var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

//List<AppUser> users = JsonConvert.DeserializeObject<List<AppUser>>(jsonData);

/////add nguoi dung vao database
//dbContext.Users.AddRange(users);
//dbContext.SaveChanges();

builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

// nguoi dung phai xac thuc truoc khi uy quyen, kiem ra xem nguoi dung da dang nhap hay chua 
app.UseRouting();
app.UseAuthorization();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin() );
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
