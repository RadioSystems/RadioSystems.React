using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using RadioSystems.React.Constants;

namespace RadioSystems.React.Services {
    public class ReactCodeGenerator : IReactCodeGenerator{
        public void GenerateRootReducerFile(IEnumerable<string> reducerFilePaths) {
            var reducerImportStatements = new StringWriter();
            var reducerRegistrations = new StringWriter();

            var filePaths = reducerFilePaths as string[] ?? reducerFilePaths.ToArray();
            foreach(var reducer in filePaths) {
                var reducerName = reducer.Split('/').Last().Replace(".js", string.Empty);
                reducerImportStatements.Write($"import {reducerName} from \"{reducer.Replace("~/Modules", "../../..")}\"");
                reducerImportStatements.WriteLine();
                if (filePaths.Last() == reducer) {
                    reducerRegistrations.Write($"    {reducerName.Replace("Reducer", string.Empty)}: {reducerName}"); //no comma or new line on last registration
                }
                else {
                    reducerRegistrations.Write($"    {reducerName.Replace("Reducer", string.Empty)}: {reducerName},");
                    reducerRegistrations.WriteLine();
                }
            }

            var rootReducerText = File.ReadAllText(HostingEnvironment.MapPath($"{ReactFilePaths.TemplatesFolder}/RootReducer.txt"));
            rootReducerText = rootReducerText.Replace("$$ReducerImports$$", reducerImportStatements.ToString());
            rootReducerText = rootReducerText.Replace("$$ReducerRegistration$$", reducerRegistrations.ToString());
            File.WriteAllText(HostingEnvironment.MapPath(ReactFilePaths.RootReducerFilePath), rootReducerText);
        }

        public void GenerateRouteFile(IEnumerable<string> routeFilePaths) {
            var routeImportStatements = new StringWriter();
            var routeObjects = new StringWriter();

            var filePaths = routeFilePaths as string[] ?? routeFilePaths.ToArray();
            foreach (var route in filePaths) {
                var routeObjectName = route.Split('/').Last().Replace(".js", string.Empty);
                routeImportStatements.Write($"import {routeObjectName} from \"{route.Replace("~/Modules", "../../..")}\"");
                routeImportStatements.WriteLine();
                //This ensures no comma on last registration
                routeObjects.Write(filePaths.Last() == route ? $"{routeObjectName}" : $"{routeObjectName}, ");
            }

            var rootReducerText = File.ReadAllText(HostingEnvironment.MapPath($"{ReactFilePaths.TemplatesFolder}/Routes.txt"));
            rootReducerText = rootReducerText.Replace("$$RouteImports$$", routeImportStatements.ToString());
            rootReducerText = rootReducerText.Replace("$$RouteObjects$$", routeObjects.ToString());
            File.WriteAllText(HostingEnvironment.MapPath(ReactFilePaths.RouteFilePath), rootReducerText);
        }

        public void GenerateModalMapping(IEnumerable<string> modalFilePaths) {
            var modalImportStatements = new StringWriter();
            var modalObjects = new StringWriter();

            var filePaths = modalFilePaths as string[] ?? modalFilePaths.ToArray();
            foreach (var modalMap in filePaths) {
                var modalMapObjectName = modalMap.Split('/').Last().Replace(".js", string.Empty);
                modalImportStatements.Write($"import {modalMapObjectName} from \"{modalMap.Replace("~/Modules", "../../../..")}\"");
                modalImportStatements.WriteLine();
                modalObjects.Write(filePaths.Last() == modalMap ? $"{modalMapObjectName}" : $"{modalMapObjectName}, ");
            }

            var modalMappingText = File.ReadAllText(HostingEnvironment.MapPath($"{ReactFilePaths.TemplatesFolder}/ModalMap.txt"));
            modalMappingText = modalMappingText.Replace("$$ModalImports$$", modalImportStatements.ToString());
            modalMappingText = modalMappingText.Replace("$$ModalObjects$$", modalObjects.ToString());
            File.WriteAllText(HostingEnvironment.MapPath(ReactFilePaths.ModalMapFilePath), modalMappingText);
        }
    }
}