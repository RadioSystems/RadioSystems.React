using System.Collections.Generic;

namespace Orchard.React.Services {
    public interface IReactCodeGenerator : IDependency {
        void GenerateRootReducerFile(IEnumerable<string> reducerFilePaths);
        void GenerateRouteFile(IEnumerable<string> routeFilePaths);
        void GenerateModalMapping(IEnumerable<string> modalFilePaths);
    }
}