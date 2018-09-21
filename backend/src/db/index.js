const mongoose = require('mongoose');
const db_config = require('../../path/to/db_config.json');

// DataBase options
const DB_options = {
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 , // Reconnect every 500ms
    poolSize: 10 , // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    promiseLibrary: require('bluebird')
}

// Database connect / disconnect
module.exports = (function () {
  mongoose.Promise = global.Promise;

  return {
    connect () {
      return mongoose.connect(db_config.mongoURI, DB_options).then(
        () => {
          console.log('Successfully connected to mongodb');
        }
      ).catch(e => {
        console.error(e);
      });
    },
    disconnect () {
      return mongoose.disconnect();
    }
  };
})();
