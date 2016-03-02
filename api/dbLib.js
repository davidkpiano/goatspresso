
const dbName = 'goatspresso';
const mongoUrl =  process.env.MONGOURL || 'mongodb://localhost:27017/';

module.exports = {
    name:  'goatspresso',
    url:  mongoUrl + dbName,
}