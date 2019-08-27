const { Sequelize, Model, DataTypes , BuildOptions, Op } = require('sequelize');
const config = require('../secret-config.json');


const seqConn  = new Sequelize(
    config.db.db,
    config.db.user,
    config.db.pass,{
        dialect: 'postgres',
    }
);

module.exports = {
    seqConn
}

