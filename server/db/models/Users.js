const {DataTypes } = require('sequelize');

'use strict'
module.exports = (sequelize, DataTypes) => {
    const uuidv1 = require('uuid/v1');
    const users = sequelize.define('users',{
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: 'UUID For the User',
            primaryKey: true,
            defaultValue: function(){
                return uuidv1();
            }
        },
        userName: { 
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        loggedIn: { 
            type: DataTypes.BOOLEAN, 
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'avatar'
        },
        gender: {
            type: DataTypes.ENUM,
            defaultValue: 'U',
            values: ['M','F','U']
        },
        ip: {
            type: DataTypes.STRING,
            defaultValue:'TEST IP'
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: 'Delhi'
        },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });

    users.associate = function(models){

    };

    return users;
};