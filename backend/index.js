//file to make the app run
const mongoose = require('mongoose');
const app = require('./src/setup');
require('dotenv').config()

try{
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then( () => {
        console.log(`We are listening on port ${process.env.PORT}`);
        app.listen(process.env.PORT)
    })
}catch(error){
    console.log(`App crashed ${error}`)
}