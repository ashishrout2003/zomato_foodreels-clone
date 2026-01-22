const mongoose = require('mongoose');
const saveschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
},{
    timestamps: true
})

const saveModel = mongoose.model('save', saveschema)
module.exports = saveModel;