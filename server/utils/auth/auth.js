const cookieSession = require("cookie-session");
const { SECRET } = require("../../configs/secrets");
const logger = require("../logging").log(module);
const jwt = require("jsonwebtoken");

const login = (context, user) => {
  const { req } = context;
  logger.debug(`Creating JWT token`);
  logger.debug(user);
  const token = jwt.sign(user, SECRET.AUTH_KEY);
  logger.debug("Setting Session Now");
  // req.session.user = user;
  req.session.token = token;
  req.session.save();
  return token;
};

const isAuthenticated = context => {
  logger.debug("Authenticating");
  // console.log(context)
  if ("currentUser" in context) {
    logger.debug(`CurrentUser in context`);
    return context.currentUser;
  } else if (context.req && context.req.session && context.req.session.user) {
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
