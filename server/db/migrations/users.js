'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                comment: 'UUID For the User',
                primaryKey: true,
                
            },
            userName: { 
                type: Sequelize.STRING, 
                allowNull: false, 
                unique: 'idx_user_loggedin' 
            },
            loggedIn: { 
                type: Sequelize.BOOLEAN, 
                unique: 'idx_user_loggedin' 
            },
            avatar: {
                type: Sequelize.STRING,
                defaultValue: 'avatar'
            },
            gender: {
                type: Sequelize.CHAR,
                defaultValue: 'U'
            },
            ip: {
                type: Sequelize.STRING,
                defaultValue:'TEST IP'
            },
            location: {
                type: Sequelize.STRING,
                defaultValue: 'Delhi'
            },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        },{
            uniqueKeys :{
                idx_user_loggedin : {
                    fields: ['loggedIn', 'userName']
                }
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
    } 
}
    