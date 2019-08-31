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
    },{
        indexes: [
            {
                unique: true,
                name: 'idx_username',
                fields: [sequelize.fn('lower', sequelize.col('userName'))]
            }
        ]
    });

    users.associate = function(models){
        users.hasMany(models.conversations,{
            as: 'sentConversations',
            foreignKey: 'from',
            scope:  {
                toType: 'USER'
            }
        });
        users.hasMany(models.conversations,{
            as: 'sentRoomConversations',
            foreignKey: 'from',
            scope:  {
                toType: 'ROOM'
            }
        });
        users.hasMany(models.conversations,{
            as: 'recievedConversations',
            foreignKey: 'toUser',
            scope:{
                toType: 'USER' 
            }
        });
        
        users.belongsTo(models.rooms,);
    };

    return users;
};