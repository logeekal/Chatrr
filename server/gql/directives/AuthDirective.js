const { ApolloServer, SchemaDirectiveVisitor, gql } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");
const logger = require('../../utils/logging').log(module);
const  { isAuthenticated } = require('../../utils/auth/auth');


class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    logger.debug("In visit object");
    logger.debug(type);
    logger.debug(this.args)
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;  
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    logger.debug(
      `Objec type _authFieldsWrapped ${objectType._authFieldsWrapped}`
    );
    logger.debug(objectType);
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;
    logger.debug(objectType._requiredAuthRole);

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async (...args) => {
        // logger.debug("In field Resolve");
        // logger.debug(field);
        // logger.debug(field._requiredAuthRole);
        // logger.debug(objectType._requiredAuthRole);
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        // logger.debug(requiredRole);
        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];

        const user = isAuthenticated(context);

        if (!user) {
          logger.debug("user is not auth");

          throw new Error("No Active Session. Not Authorized");

        }
        logger.debug("User issss");
        user.role = "USER";
        logger.debug(`Required role is :  ${requiredRole}`);
        logger.debug(`User is : ${JSON.stringify(user)}`);
        if (!(user.role == requiredRole)) {
          logger.debug("In not authorized");
          throw Error(`NOT Authorized for field : ${field.name}`);
        }

        return resolve.apply(this, args);
      };
      logger.debug(field.resolve);
    });
  }
}

module.exports = {
  AuthDirective
};
