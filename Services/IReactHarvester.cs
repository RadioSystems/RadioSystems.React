using System.Collections.Generic;

namespace Orchard.React.Services {
    public interface IReactHarvester : IDependency {
        IEnumerable<string> ReactFolderPaths();
        IEnumerable<string> HarvestReactEnabledModules();
        IEnumerable<string> HarvestReducers(string path);
        IEnumerable<string> HarvestRoutes(string path);
        IEnumerable<string> HarvestModals(string path);
    }
}