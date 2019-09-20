const chai = require('chai');

const assertGraphQLError = (res, expectedErrorObject) => {
    let error =  res.body.errors[0];
    chai.assert.strictEqual(error.message, expectedErrorObject.message, 'Error message does not match.');
    chai.assert.strictEqual(error.extensions.code, expectedErrorObject.name, 'Error code does not match');
}


module.exports = {
    assertGraphQLError
}