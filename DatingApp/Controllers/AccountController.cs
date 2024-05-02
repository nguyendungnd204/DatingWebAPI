using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Interfaces;
using DatingApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
namespace DatingApp.Controllers

{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        private readonly ITokenService _tokenService;
        

        public AccountController(ApplicationDbContext context, ITokenService tokenService )
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExits(registerDto.UserName))
            {
                return BadRequest("Username is taken");
            }

            byte[] passwordSalt;
            using (var rng = RandomNumberGenerator.Create())
            {
                passwordSalt = new byte[128]; // Kích thước khóa 128 bytes
                rng.GetBytes(passwordSalt);
            }

            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var user = new AppUser
                {
                    Username = registerDto.UserName.ToLower(),
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                    PasswordSalt = passwordSalt
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return new UserDto
                {
                    Username = user.Username,
                    Token = _tokenService.CreateToken(user)
                };
            }

        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == loginDto.UserName);

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            using (var hmac = new HMACSHA512(user.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i])
                    {
                        return Unauthorized("Invalid password");
                    }
                }

                return new UserDto
                {
                    Username = user.Username,
                    Token = _tokenService.CreateToken(user)
                };
            }
        }

        private async Task<bool> UserExits(string username)
        {
            return await _context.Users.AnyAsync(x=> x.Username == username.ToLower());
        }

    }
}
