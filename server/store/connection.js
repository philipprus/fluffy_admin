const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
console.log(process.env.NODE_ENV);
const {get, KnownConfigKey } = require('../utils/config');

const { MongoConnection } = require('../utils/mongo-connection');

const url = process.env.NODE_ENV !== 'production' ? 'mongodb+srv://fl_temp_user:qwerty12345@cluster0-di3uu.mongodb.net/test?retryWrites=true&w=majority' : process.env.REACT_APP_MONGODB_URI;

const connection = new MongoConnection(url);

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

async function connectDb() {
    await connection.connect();
}
async function closeDb() {
    await connection.close();
}
module.exports = { connectDb, closeDb, };
