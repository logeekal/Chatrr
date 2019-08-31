'use strict';
module.exports = (sequelize, DataTypes) => {
  const uuidv1 = require('uuid/v1');
  const conversations = sequelize.define('conversations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => {
        return uuidv1();
      }
    },
    from: {
      type: DataTypes.UUID
    },
    toUser: {
      type: DataTypes.UUID
    },
    toRoom: {
      type: DataTypes.UUID
    },
    toType:{
      type: DataTypes.ENUM,
      values: ['ROOM','USER']
    },
    text:{
      type: DataTypes.STRING(500),
      allowNull: false
    },
    seen: DataTypes.BOOLEAN,
    sent: DataTypes.BOOLEAN,
    delievered: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    indexes: [
      {
        unique: false,
        fields: ['toType','toUser']
      },
      {
        unique: false,
        fields: ['toType','toRoom']
      },
      {
        unique: false,
        fields: ['toType', 'from']
      }
    ]
  });
  conversations.associate = function(models) {
    // associations can be defined here
  };
  return conversations;
};