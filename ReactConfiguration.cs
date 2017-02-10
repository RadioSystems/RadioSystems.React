using System.Collections.Generic;
using Orchard.Environment;
using RadioSystems.React.Services;

namespace RadioSystems.React {
    public class ReactConfiguration : IOrchardShellEvents {
        private readonly IReactHarvester _reactHarvester;
        private readonly IReactCodeGenerator _reactCodeGenerator;

        public ReactConfiguration(IReactHarvester reactHarvester, IReactCodeGenerator reactCodeGenerator) {
            _reactHarvester = reactHarvester;
            _reactCodeGenerator = reactCodeGenerator;
        }

        public void Activated() {
            var modulesWithReact =_reactHarvester.HarvestReactEnabledModules();
            var reactRoutes = new List<string>();
            var reactReducers = new List<string>();
            var reactModals = new List<string>();

            foreach (var module in modulesWithReact) {
                reactRoutes.AddRange(_reactHarvester.HarvestRoutes(module));
                reactReducers.AddRange(_reactHarvester.HarvestReducers(module));
                reactModals.AddRange(_reactHarvester.HarvestModals(module));
            }

            _reactCodeGenerator.GenerateRootReducerFile(reactReducers);
            _reactCodeGenerator.GenerateRouteFile(reactRoutes);
            _reactCodeGenerator.GenerateModalMapping(reactModals);
        }
        public void Terminating() {
            
        }
    }
}