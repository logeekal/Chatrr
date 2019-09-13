

const getUpdateResponseBasedOnResult = (result, name, message) => {

    if (result) {
        // console.log(' In Response handler');
        // console.log(result.isArray());

        if (result[0] > 0) {
            return {
                success: true,
                error: null
            }
        } else {
            throw {
                name: name,
                message: message
            }
        }


    } else {
        return {
            success: false,
            err: err.message
        }
    }
}


module.exports = {
    getUpdateResponseBasedOnResult
}