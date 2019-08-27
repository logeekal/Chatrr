const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const { seqConn } = require('../def')

class Users extends Model { }
Users.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'UUID For the User',
        primaryKey: true
    },
    userName: { type: DataTypes.STRING, allowNull: false, unique: 'idx_user_loggedin' },
    loggedIn: { type: DataTypes.BOOLEAN, unique: 'idx_user_loggedin' },
    avatar: DataTypes.STRING,
    gender: DataTypes.CHAR,
    ip: DataTypes.STRING,
    location: DataTypes.STRING,
    createdOn: { type: DataTypes.DATE },
    updatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize: seqConn, modelName: 'users' })

module.exports = {
    Users
}

