const cookieSession = require('cookie-session');
const {SECRET} = require('../../configs/secrets');

const login = (req, user) => {
    console.log('Setting Session Now');
    req.session.user = user;
    req.session.save();
}

const isAuthenticated = (req) => {
    if (req.session.user) {
        return req.session.user
    }else{
        throw Error('Not Authorized.');
    }
}


const logout = (req) => {
    req.session = null;
}


module.exports = {
    login,
    logout,
    isAuthenticated
}