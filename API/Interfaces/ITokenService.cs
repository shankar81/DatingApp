using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    String CreateToken(User user);
}
