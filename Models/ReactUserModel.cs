using System.Collections.Generic;

namespace Orchard.React.Models {
    public class ReactUserModel {
        public int Id { get; set; }
        public string Username { get; set; }
        public IList<string> Roles { get; set; }
        public IList<string> Permissions { get; set; }
    }
}