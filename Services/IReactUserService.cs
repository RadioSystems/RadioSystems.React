using Orchard;
using RadioSystems.React.Models;

namespace RadioSystems.React.Services {
    public interface IReactUserService : IDependency {
        ReactUserModel GetReactUserModel(int userId);
    }
}