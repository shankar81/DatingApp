using API.DTOs;
using API.Entities;

namespace API;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetUsersAsync();
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<User> GetUserByUsernameAsync(string username);
    Task<MemberDto> GetMemberByUsernameAsync(string username);
    Task<bool> SaveAllAsync();
    void Update(User user);
}
