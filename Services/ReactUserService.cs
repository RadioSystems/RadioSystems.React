using System.Collections.Generic;
using System.Linq;
using NHibernate;
using Orchard.Data;
using Orchard.React.Models;
using Orchard.Roles.Models;
using Orchard.Users.Models;

namespace Orchard.React.Services {
    public class ReactUserService : IReactUserService {
        private readonly ISession _session;

        public ReactUserService(ITransactionManager transactionManager) {
            _session = transactionManager.GetSession();
        }

        public ReactUserModel GetReactUserModel(int userId) {
            var userPart = _session.Get<UserPartRecord>(userId);

            if (userPart == null) return new ReactUserModel();

            var userRoles = _session.QueryOver<UserRolesPartRecord>().Where(x => x.UserId == userId).List()
                .Select(x => x.Role).ToList();

            var userPermissions = new List<string>();

            foreach (var role in userRoles) {
                userPermissions.AddRange(role.RolesPermissions.Select(x => x.Permission.Name));
            }
            return  new ReactUserModel {
                Id = userId,
                Username = userPart.UserName,
                Roles = userRoles.Select(x => x.Name).ToList(),
                Permissions = userPermissions
            };
        }
    }
}