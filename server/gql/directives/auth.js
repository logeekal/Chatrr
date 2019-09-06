const { ApolloServer, SchemaDirectiveVisitor, gql } = require('apollo-server');


class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        console.log('In visit object');
        console.log(type);

        this.ensureFieldsWrapped(type);
        this._requiredAuthRole = this.args.requires;
    }

    visitFieldDefinition(field, details) {
        console.log('In visitFieldDefinition');
        console.log(field);
        console.log(details);
        this.ensureFieldsWrapped(details.ObjectType);
        field._requiredAuthRole = this.args.requires;
    }

    ensureFieldsWrapped(objectType) {
        if(objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field =  fields[fieldName];
            const {resolve = defaultFieldResolver} = field;

            field.resolve = async (...args){
                const requiredRole = field._requiredAuthRole || ObjectType._requiredAuthRole;

                if(!requiredRole){
                    return resolve.apply(this.args);
                }
            }

            const context = args[2];
            const user = "USER"
            if (! user.role == 'USER')
        })
    }
}