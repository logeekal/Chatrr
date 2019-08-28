const findOrcreateUser = (_, __, { dataSources }) => {
    console.log('me query triggerd');
    dataSources.userAPI.findOrCreateUser({ userName: 'testUser' })
}

const loginUser = async (_, { userName, gender }, { dataSources }) => {
    try {
        const result = await dataSources.userAPI.create({
            userName, 
            gender
        });

        return {
            success: true,
            error: result
        }
    } catch (err) {
        console.log('Error while logging in ');
        return {
            success: false,
            error: err
        }
    }
}


const logoutUser = async (_, {userName}, {dataSources}) => {
    try{
        console.log('starting to logout.')
        const result = await dataSources.userAPI.update({
            loggedIn: false,
            userName: userName+ Date.now()
        }, {
            where: {userName: userName}
        });
        return {
            success : true,
            error: null
        }
    }catch(err){
        console.error(err);
        return {
            success: false,
            error: err && 'Error'
        }
    }
}


module.exports = {
    Query: {
        me: findOrcreateUser
    },
    Mutation: {
        loginUser: loginUser,
        logoutUser: logoutUser
    }

}