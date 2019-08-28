'use strict';
module.exports = (sequelize, DataTypes) => {
  const testing = sequelize.define('testing', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  testing.associate = function(models) {
    // associations can be defined here
  };
  return testing;
};