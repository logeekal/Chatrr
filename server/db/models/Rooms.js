'use strict'
module.exports = (sequelize, DataTypes) => {
    const uuidv1 = require('uuid/v1');
    
    const rooms = sequelize.define('rooms',{
        id:{
            type:  DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: ()=> {
                return uuidv1();
            }
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                len:[1,50]
            }
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[1,100]
            }
        },
        avatar:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:    {
            type: DataTypes.STRING(1000),
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue:  true
        },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });

    rooms.associate = function(models){
        models.rooms.hasMany(models.users);
        models.rooms.hasMany(models.conversations,{
            as: 'roomConversations',
            foreignKey: 'toRoom',
            scope: {
                toType: 'ROOM'
            }
        })
    }

    return rooms;
   
}