/*
 */
const Mongoose = require('mongoose');
const Bluebird = require('bluebird');

class MongoConnection {

    /**
     * create a new MongoConnection
     * attach Mongoose object to global object
     * @param {Object} config - Instance of Config class.
     */
    constructor(config){
        this._config = config;
        this.connection = this._connect();
    }

    /**
     * create a new MongoDb connection pool
     */
    _connect() {
        let config = this._config.MONGO;
        let userPass = config.USER && config.PASS ? `${config.USER}:${config.PASS}@` : ``;
        let uri = `mongodb://${userPass}${config.HOST}:${config.PORT}/${config.DATABASE}`;
        let options = {
            useMongoClient  : true,
            poolSize        : config.POOL_SIZE
        };

        Mongoose.Promise = Bluebird;
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
     * Close Mongoose connection
     */
    _disconnect() {

        Mongoose.connection.close();
        console.info('Connection to MongoDB closed');
    }
}

module.exports = MongoConnection;