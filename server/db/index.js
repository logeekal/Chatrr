const Sequelize = require('sequelize');
const  Users = require('./models/Users');
console.log(`Users is : ${Users}`)
const { seqConn } = require('./def');
module.exports = {
    db: seqConn,
    store: {
        Users : Users(seqConn, Sequelize.DataTypes)
    }
}

