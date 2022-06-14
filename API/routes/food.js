const router = require('express').Router()
const foodSchema = require('../models/food')
//get all 

router.get('/food' , async (req,res) =>{
    try {
        const food = await foodSchema.find()
        food.length === 0 ? res.status(404).json('no food to show') :
        res.status(200).json(food)
    } catch (err) {
        console.log(err)
        res.status(500).json('server error')
    }
})

//add new

router.post('/add-food',async(req,res) =>{
try {
    const {title , description , price} = req.body
    const data = await foodSchema.create({
        title,
        description,
        price
    })
    res.status(201).json({data,message :'meal added successfully'})
} catch (err) {
    console.log(err)
    res.status(500).json(err.message)
}

})

module.exports = router