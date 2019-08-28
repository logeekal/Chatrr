const { Sequelize, Model, DataTypes , BuildOptions, Op } = require('sequelize');
const config = require('../secret-config.json');

// const connection_string = `postgres://SAFE_CHAT_ADMIN:S@f3 Ch@t Adm1n@127.0.0.1/SAFE_CHAT`
// const connection_string = `${config.db.type}://${ config.db.user }:${ config.db.pass }`

// const seqConn = new Sequelize(connection_string)

const seqConn  = new Sequelize(
    config.db.db,
    config.db.user,
    config.db.pass,{
        dialect: config.db.type,
        host: config.db.host,
        typeValidation: true,
    }
);

module.exports = {
    seqConn
}

