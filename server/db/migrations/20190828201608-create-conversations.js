'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await  queryInterface.createTable('conversations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      from: {
        type: Sequelize.UUID
      },
      to: {
        type: Sequelize.UUID
      },
      toType:{
        type: Sequelize.ENUM,
        values: ['ROOM','USER']
      },
      text:{
        type: Sequelize.STRING(500),
        allowNull: false
      },
      seen: Sequelize.BOOLEAN,
      sent: Sequelize.BOOLEAN,
      delievered: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('conversations',['toType','from']);

    return queryInterface.addIndex('conversations',['toType','to']);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('conversations');
  }
};