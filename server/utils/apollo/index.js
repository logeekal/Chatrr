

const formatApolloError = (err) => {
    if (err.extensions.code.startsWith('Sequelize') && (process.env.NODE_ENV !== 'production')){
        return new Error('SOME_DB_ISSUE')
    }else{
        return err
    }
}



module.exports = {
    formatApolloError
}