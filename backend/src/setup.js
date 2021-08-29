//file for app setup
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

//routes import
const UserRoutes = require('./routes/user');
const TagRoutes = require('./routes/tag');
const PostRoutes = require('./routes/post');

//setup app JSON
app.use(express.json());
app.use(cors());

//section for routes
app.use('/api', UserRoutes);
app.use('/api', TagRoutes);
app.use('/api', PostRoutes);


// setup global error handler
app.use( (error, req, res, next) => {
    const status = error.statusCode || 500;
    let message = error.message;
    console.log(error);
    if(status == 500){
        message = "Internal server error";
        //Email system staff
    }
    return res.status(status).json({
        message: message,
        data: []
    })
})
//home route
app.get('/', (req, res) => {
    return res.send('<h1 style="text-align:center;color:purple;">How you got access to me 🤨?<br /> I will call FBI.👨🏼‍💻</h1>')
})
module.exports = app;