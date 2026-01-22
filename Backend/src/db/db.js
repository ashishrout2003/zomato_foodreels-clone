const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('MongoDB is connected');
        
    })
    .catch((err)=>{
        console.log('MongoDB is connection error:', err);
        
    })
}module.exports = connectDB;