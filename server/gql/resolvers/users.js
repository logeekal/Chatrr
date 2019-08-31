const { getUpdateResponseBasedOnResult } = require('./helpers');

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


const addUserToRoom = async (_, {userName, roomId}, {dataSources}) => {
    try{
        let updateFields = {
            roomId : roomId
        };

        let filters = {
            where: { 
                userName:  userName
            }
        };

        let result = await dataSources.userAPI.update(updateFields, filters);
        return getUpdateResponseBasedOnResult(
            result, 
            'Error', 
            'Failed add user to User. No Records to Update'
            );
        
    }catch(err) {
        console.log('Error While adding user to the room.');
        return {
            success: false,
            error: JSON.stringify({...err})
        }
    }
}


const userUpdateResolversFactory = (type) => {
    return async(_, {userName}, {dataSources}) =>{
        let result;
        let updateFields;
        let filters  = {
                where:  {   userName:   userName}
            };
        try{
            switch(type){
                case 'logoutUser':
                    console.log('LogOut Resolver triggered');
                    // console.log('Removing user from the room.')

                    // updateFields = {
                    //     roomId : null
                    // };

                    // await dataSources.userAPI.update(updateFields, filters);
                    console.log('Removed user from the room. Now logging user out.')

                    updateFields = {
                        loggedIn: false,
                        roomId : null,
                        userName: userName+'_'+Date.now()
                    };
                    
                    break;
                case  'removeUserFromRoom':
                    console.log('Removing User from Room.');
                    updateFields = {
                        roomId: false
                    };
                    break;
                default:
                    result=""
            }
            result = await dataSources.userAPI.update(updateFields, filters);
            if ( result[0] > 0 ) {
                return {
                    success: true,
                    error: null
                }
            }else{
                console.log('Thorwing Error');
                throw {
                    name:   "NO_RECORD_ERROR",
                    level:  'Errsadsor',
                    message:    `No Record exists with fields ${ JSON.stringify(filters) }`
                }
            }
            
        }catch(err) {
            return {
                success: false,
                error: err.message
            }
        }
    }
}



const getUser = async(_, { userName }, { dataSources } ) => {
    let result = await dataSource.userAPI.find({
        where : {
            userName: userName
        }
    });

    return result;
}


const getConversationsOfUser = async(_, { userName }, { dataSources }) => {
    let result = dataSources.userAPI.getConversations({userName});
}


module.exports = {
    Query: {
        user: getUser,
    },
    Mutation: {
        loginUser: loginUser,
        logoutUser: userUpdateResolversFactory('logoutUser'),
        addUserToRoom: addUserToRoom,
        removeUserFromRoom: userUpdateResolversFactory('logoutUser'),
    }
}