const mongoose = require('mongoose');
const config = require('config');
const connectionString = config.get('mongoURI'); 

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString,{
            useNewUrlParser: true
        });
        console.log('Connected to DB...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectToDB;