const formatApolloError = (err) => {
    if (err.extensions.code.startsWith('Sequelize')){
        return new Error('SOME_DB_ISSUE')
    }else{
        return err
    }
}



module.exports = {
    formatApolloError
}