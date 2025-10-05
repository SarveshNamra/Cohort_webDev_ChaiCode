var x;
x = null;
x = 44;
console.log(x);
function createUser(user) {
    var _a;
    // 1st approach
    var trimmedLastName = (_a = user.lastname) === null || _a === void 0 ? void 0 : _a.trim();
    // 2nd approach
    if (user.lastname) {
        var trimmed = user.lastname.trim();
    }
    // 3rd approach
    if (!user.lastname)
        return;
    var trimmedName = user.lastname.trim();
    // 4th approach
    var trimmedLast = user.lastname.trim() || '';
}
createUser({
    firstname: "San"
});
