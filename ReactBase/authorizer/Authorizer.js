class Authorizer {
    static authorize(permission, user) {
        if (typeof (user.permissions) !== "undefined") {
            const verifiedPermission = user.permissions.find(x => {
                return x.toUpperCase() === permission.toUpperCase();
            });
            if (typeof(verifiedPermission) !== "undefined") {
                return true;
            };
            const isAdmin = user.roles.find(x => {
                return x.toUpperCase() === "ADMINISTRATOR";
            });
            return !(typeof(isAdmin) === "undefined");
        } else {
            return true;
        }
    }
}

export default Authorizer;