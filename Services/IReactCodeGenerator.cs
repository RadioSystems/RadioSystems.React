using System.Collections.Generic;
using Orchard;

namespace RadioSystems.React.Services {
    public interface IReactCodeGenerator : IDependency {
        void GenerateRootReducerFile(IEnumerable<string> reducerFilePaths);
        void GenerateRouteFile(IEnumerable<string> routeFilePaths);
        void GenerateModalMapping(IEnumerable<string> modalFilePaths);
    }
}