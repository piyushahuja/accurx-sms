/*
 */
const Mongoose = require('mongoose');


/**
 * create a new MongoDb connection pool
 */
let connect = function(config){
    let userPass = config.USER && config.PASS ? `${config.USER}:${config.PASS}@` : ``;
    let uri = `mongodb://${userPass}${config.HOST}:${config.PORT}/${config.DATABASE}`;
    let options = {
         poolSize        : config.POOL_SIZE,
         useNewUrlParser: true
    };
    if (config.DEBUG) Mongoose.set('debug', true);

    Mongoose.connect(uri, options)
        .then((err)=>{
            console.info('Connection to MongoDB established');
        })
        .catch((err) => {
                console.log('MongoDB Connection error : ', err)
        });
    };

/**
 Close Mongoose connection
 */
let disconnect = function(){
    Mongoose.connection.close();
    console.info('Connection to MongoDB closed');
}


module.exports = {
    connect,
    disconnect
}