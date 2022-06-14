const router = require('express').Router()
const userSchema = require('../models/user')

// create user

router.post('/create-user' ,async(req,res) =>{
const {username,email,password} = req.body

try {
   const data = await userSchema.create({
        username,
        email,
        password
    })
    res.status(201).json(data)
} catch (error) {
    console.log(error)
    res.status(500).json('server error')
}
})

// login 

router.post('/login' , async(req,res) =>{
    const {email,password} = req.body

    try {
        const data =await userSchema.findOne({email , password})
        data === null ? res.status(404).json('user not found') :
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json('server error')
    }
})

//token login

router.post('/tlogin' , async (req,res)=>{
    const {id,password} = req.body
    try{
        const data = await userSchema.findOne({id})
        data === null ? res.status(404).json('user not found') :
        (data.password === password) ? res.status(200).json(data) :
        res.status(401).json('unauthoraized')
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})

module.exports = router