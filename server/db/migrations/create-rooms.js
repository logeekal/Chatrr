'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('rooms',{
            id:{
                type:  Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: ()=> {
                    return uuidv1();
                }
            },
            name:{
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate:{
                    len:[1,50]
                }
            },
            title:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:{
                    len:[1,100]
                }
            },
            avatar:{
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('rooms');
    }
}