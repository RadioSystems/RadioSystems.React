using Orchard.React.Models;

namespace Orchard.React.Services {
    public interface IReactUserService : IDependency {
        ReactUserModel GetReactUserModel(int userId);
    }
}