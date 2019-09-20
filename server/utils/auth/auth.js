const cookieSession = require("cookie-session");
const { SECRET } = require("../../configs/secrets");
const logger = require("../logging").log(module);

const login = (context, user) => {
    const { req } = context;
    logger.debug("Setting Session Now");
    req.session.user = user;
    req.session.save();
};

const isAuthenticated = context => {
    logger.debug('Authenticating')
    // console.log(context)
    if ("currentUser" in context) {
        return context.currentUser;
    } else if (context.req) {
        return context.req.session.user;
    } else {
        throw Error("Not Authorized.");
    }
};

const logout = context => {
    const { req } = context;
    req.session = null;
};

module.exports = {
    login,
    logout,
    isAuthenticated
};
