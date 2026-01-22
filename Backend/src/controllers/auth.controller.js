const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodpartner.model');

async function registerUser(req, res){
const {fullName, email, password} = req.body;

const isUserAlreadyExists = await userModel.findOne({
    email
})
if (isUserAlreadyExists){
    return res.status(400).json({
        message: 'User already exists'
    })
}
const hashedPassword = await bcrypt.hash(password, 10);

const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
})

const token = jwt.sign({
    id: user._id,
}, process.env.JWT_SECRET)

res.cookie('token', token)

res.status(200).json({
    message: 'User registered successfully',
    user: {
        _id: user._id,
        email: user.email,
        fillName: user.fullName
    }
})
}

async function loginUser(req, res){
const {email, password} = req.body;
const user = await userModel.findOne({
    email
})

if(!user){
    return res.status(400).json({
        message: 'Invalid user ir password'
    })
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
    return res.status(400).json({
        message: 'Invalid user or password'
    })
}
const token = jwt.sign({
    id: user._id
}, process.env.JWT_SECRET)
res.cookie('token', token)
res.status(200).json({
    message: 'User logged in successfully',
    user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
    }
})
}

async function logoutUser(req, res){
res.clearCookie('token');
res.status(200).json({
    message: 'User logout successfully'
})
}

async function registerFoodpartner(req, res){
const {name, email, password, contactName, address, phone} = req.body;

const isaccountAlraedyExists = await foodPartnerModel.findOne({
    email
})
if(isaccountAlraedyExists){
    return res.status(400).json({
        message: 'Food partner account Already Exists'    })
}
const hashedPassword = await bcrypt.hash(password, 10);
const foodPartner = await foodPartnerModel.create({
    name,
    email,
    contactName,
    address,
    phone,
    password: hashedPassword
})
const token = jwt.sign({
    id: foodPartnerModel._id,
},process.env.JWT_SECRET)
res.cookie('token', token)
res.status(201).json({
    message: 'FoodPartner registered successfully',
    foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner,name,
        contactName: foodPartner.contactName,
        phone: foodPartner.phone,
        address: foodPartner.address
    }
})

}

async function loginFoodPartner(req, res){
const {email, password} = req.body;
const foodPartner = await foodPartnerModel.findOne({
    email
})
if(!foodPartner){
    return res.status(400).json({
        message: "invalid email or password"
    })
}
 const isPasswordvalid = await bcrypt.compare(password,foodPartner.password );
    if(!isPasswordvalid){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }
    const token = jwt.sign({
        id: foodPartner._id
    },process.env.JWT_SECRET)
    res.cookie('token', token)
    res.status(201).json({
        message: 'Foodpartner login successfullt',
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function logoutFoodPartner(req, res){
res.clearCookie('token');
res.status(200).json({
    message: 'Food Partner logout Successfully'
});
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodpartner,
    loginFoodPartner,
    logoutFoodPartner
}