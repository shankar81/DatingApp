using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API;

public class UserRepository : IUserRepository
{
    private readonly DataContext context;
    private readonly IMapper mapper;

    public UserRepository(DataContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }


    public async Task<User> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
        return await context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await context.Users.Include(p => p.Photos).ToListAsync();
    }

    public async Task<MemberDto> GetMemberByUsernameAsync(string username)
    {
        return await context.Users
        .Where(x => x.UserName == username)
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await context.Users
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return (await context.SaveChangesAsync()) > 0;
    }

    public void Update(User user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
