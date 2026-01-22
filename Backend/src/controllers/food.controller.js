const foodModel = require('../models/foodmodel');
const {v4: uuid} = require('uuid')
const storageService = require('../services/storage.service');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

async function createFood(req, res){

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
        

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })

        return res.status(201).json({
            message: 'Food created successfully',
            food: foodItem
        })
    } 


async function getFoodItems(req, res){
    const foodItems = await foodModel.find({})
    return res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems
    })
}

async function likeFood(req, res){
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc: {likeCount: -1}
        })

        return res.status(200).json({
            message: 'Food Unliked Successfully'
        })
    }

    const Like = await likeModel.create({
        user: user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
        $inc: {likeCount: 1}
    })
    res.status(200).json({
        message: "Food Liked successfully",
        Like
    })
}

async function saveFood(req, res){
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })
    
        return res.status(200).json({
            message: 'Food Unsaved Successfully'
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    res.status(200).json({
        message: "Food Saved successfully",
        save
    })
}

async function getSavedFood(req, res){
    const user = req.user;
    const SavedFood = await saveModel.find({user: user._id}).populate('food');
    if(!SavedFood || SavedFood.length === 0){
        return res.status(200).json({
            message: "No saved food items found",
            SavedFood: []
        });
    }
    return res.status(200).json({
        message: "Saved food items fetched successfully",
        SavedFood
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood
}