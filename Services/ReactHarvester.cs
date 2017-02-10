using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Orchard.Caching;
using Orchard.Environment.Descriptor.Models;
using Orchard.Environment.Extensions;
using Orchard.Environment.Extensions.Models;
using Orchard.FileSystems.VirtualPath;
using Orchard.Logging;
using RadioSystems.React.Constants;

namespace RadioSystems.React.Services {
    public class ReactHarvester : IReactHarvester {
        private readonly ShellDescriptor _shellDescriptor;
        private readonly IExtensionManager _extensionManager;
        private readonly IParallelCacheContext _parallelCacheContext;
        private readonly IVirtualPathProvider _virtualPathProvider;

        public ILogger Logger { get; set; }
        public bool DisableMonitoring { get; set; }

        public ReactHarvester(IExtensionManager extensionManager, IParallelCacheContext parallelCacheContext, 
            IVirtualPathProvider virtualPathProvider, ShellDescriptor shellDescriptor) {
            _extensionManager = extensionManager;
            _parallelCacheContext = parallelCacheContext;
            _virtualPathProvider = virtualPathProvider;
            _shellDescriptor = shellDescriptor;

            Logger = NullLogger.Instance;
        }

        public IEnumerable<string> ReactFolderPaths() {
            return new[] { "React", "ReactUI"};
        }

        public IEnumerable<string> HarvestReactEnabledModules() {
            var availableFeatures = _extensionManager.AvailableFeatures();
            var activeFeatures = availableFeatures.Where(FeatureIsEnabled);
            var activeExtensions = Once(activeFeatures).ToList();
            var modulesWithReactCode = _parallelCacheContext.RunInParallel(activeExtensions, extensionDescriptor => {
                var containsReact = ReactFolderPaths().Select(folderPath => {
                    var basePath = Path.Combine(extensionDescriptor.Location, extensionDescriptor.Id).Replace(Path.DirectorySeparatorChar, '/');
                    var virtualPath = Path.Combine(basePath, folderPath).Replace(Path.DirectorySeparatorChar, '/');
                    return _virtualPathProvider.DirectoryExists(virtualPath) ? virtualPath : null;
                }).Where(x => x != null).ToList();
                return containsReact.Count > 0 ? containsReact.FirstOrDefault() : null;
            }).Where(x => x != null).ToList();
            return modulesWithReactCode;
        }

        public IEnumerable<string> HarvestReducers(string path) {
            var reducerPath = Path.Combine(path, ReactFilePaths.Reducers).Replace(Path.DirectorySeparatorChar, '/');
            return _virtualPathProvider.DirectoryExists(reducerPath) ? _virtualPathProvider.ListFiles(reducerPath).ToList() : new List<string>();
        }

        public IEnumerable<string> HarvestRoutes(string path) {
            var reducerPath = Path.Combine(path, ReactFilePaths.Routes).Replace(Path.DirectorySeparatorChar, '/');
            return _virtualPathProvider.DirectoryExists(reducerPath) ? _virtualPathProvider.ListFiles(reducerPath).ToList() : new List<string>();
        }

        public IEnumerable<string> HarvestModals(string path) {
            var modalPath = Path.Combine(path, ReactFilePaths.ModalTypes).Replace(Path.DirectorySeparatorChar, '/');
            return _virtualPathProvider.DirectoryExists(modalPath) ? _virtualPathProvider.ListFiles(modalPath).ToList() : new List<string>();
        }

        private bool FeatureIsEnabled(FeatureDescriptor fd) {
            return (DefaultExtensionTypes.IsTheme(fd.Extension.ExtensionType) && (fd.Id == "TheAdmin" || fd.Id == "SafeMode")) ||
                _shellDescriptor.Features.Any(sf => sf.Name == fd.Id);
        }

        private static IEnumerable<ExtensionDescriptor> Once(IEnumerable<FeatureDescriptor> featureDescriptors) {
            var once = new ConcurrentDictionary<string, object>();
            return featureDescriptors.Select(fd => fd.Extension).Where(ed => once.TryAdd(ed.Id, null)).ToList();
        }
    }
}