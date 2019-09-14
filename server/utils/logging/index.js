const winston =  require('winston');

const { createLogger, format } =  require('winston');

const util = require('util');

const { combine, timestamp, simple, prettyPrint , colorize, printf , label } = format;


winston.addColors({
    info: 'bold white greenBG',
    error: 'bold white redBG',
    debug: 'bold white blueBG'
})

const wrappedLogger = (_module) => {
    let file = _module.id;

    const customTransports = [
        new winston.transports.Console({
            format: combine(
                timestamp({
                    format: 'DD-MMM-YYYY HH:MM:SS'
                }),
                label({
                    label: file
                }),
                prettyPrint(),
                format.splat(),
                simple(),
                printf( (msg)=> {
                    let message;
                    if(msg.message){
                        message = msg.message && msg.message;
                    }else{
                        message = 'undefined'
                    }
                    

                    return colorize().colorize(msg.level, `${ msg.level } :  ${msg.timestamp} :  ${ msg.label } : \n`) + `${ util.inspect(message,{
                        depth: 2,
                        compact:true,
                        colors: true,
                    } )}`;
                })
            )
        })
    ] 
    
    const loggerOptions = {
        transports : customTransports,
        // exceptionHandlers: [
        //     customTransports
        // ]
    }
    
    
    const logger = createLogger({
        ...loggerOptions,
    });


    if(process.env.NODE_ENV !== 'production'){
        logger.level = 'debug'
    }else {
        logger.level =  'info'
    }
    
    
    return logger;
    
}


module.exports = {
    log: wrappedLogger
};  