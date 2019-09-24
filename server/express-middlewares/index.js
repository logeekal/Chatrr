const logger = require('../utils/logging/').log(module);
const jwt = require('jsonwebtoken');
const { SECRET } = require('../configs/secrets');
const { error_codes } = require('../configs/error_codes');

const withAuth = (req, res, next) => {
    logger.info('Authenticating user');
    const token = req.session.token || req.headers['x-access-token'];

    if (!token) {
        logger.debug(`No token found`);
        next();
    } else {
        logger.debug(`Token is found : ${token}`)
        try {
            let decoded = jwt.verify(token, SECRET.AUTH_KEY);
            if (decoded) {
                logger.debug(`got the decoded :  ${JSON.stringify(decoded)}`);
                req.session.user = decoded;
                next();
            }
        } catch (error) {
            logger.error(error);
            logger.error('Error in decoding token');
            next();
            // res.status(401);
            // res.send(error_codes.NOT_AUTHORIZED.message);      
        }

    }

}

module.exports = { withAuth }   