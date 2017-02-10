using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Orchard;
using RadioSystems.React.Services;
using RadioSystems.React.ViewModels;
using Orchard.Themes;

namespace RadioSystems.React.Controllers {
    [Themed, Authorize]
    public class ReactController : Controller {
        private readonly IOrchardServices _orchardServices;
        private readonly IReactUserService _reactUserService;

        public ReactController(IOrchardServices orchardServices, IReactUserService reactUserService) {
            _orchardServices = orchardServices;
            _reactUserService = reactUserService;
        }

        public ActionResult Index() {
            //Get the logged in user model and convert to json(camelCased) to pass to React for initial rendering
            var userModel = _reactUserService.GetReactUserModel(_orchardServices.WorkContext.CurrentUser.Id);
            var camelCaseFormatter = new JsonSerializerSettings {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var userJson = JsonConvert.SerializeObject(userModel, camelCaseFormatter).ToString();
            var viewModel = new ReactViewModel {
                UserJson = userJson
            };
            return View(viewModel);
        }
    }
}