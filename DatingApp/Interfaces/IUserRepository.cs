using DatingApp.DTOs;
using DatingApp.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.Interfaces
{
    public interface IUserRepository
    {
        void Upadate(AppUser user);

        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUserAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);
    }
}
