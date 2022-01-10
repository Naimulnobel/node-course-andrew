const express= require('express')
const router=new express.Router();
const User=require('../models/user')
router.post('/users', async(req, res) => {
    const user = new User(req.body)
    // user.save().then(() => { res.status(201).send(user) }).catch(err => {
    //     res.status(400).send(err)
    // })
    try {
        await user.save()
        res.status(201).send(user)
    }catch(err) {
     res.status(400).send(err)
    }

    
})
router.get('/users', async(req, res) => {
    try{
        const users=await User.find({})
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
    
    // User.find({}).then((allUsers) => res.status(200).send(allUsers)).catch(err => {
    //     res.status(400).send(err)
    // })
})
router.get('/users/:id',async(req,res)=>{
    const _id=req.params.id
    try {
        const user= await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(err)
    }
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
router.patch('/users/:id',async(req,res)=>{
    const upadtes= Object.keys(req.body)
    const allowedUpdates=['name','email','age','password']
    const isValidOpretor=upadtes.every((update)=>allowedUpdates.includes(update))
    const id= req.params.id
    if(!isValidOpretor){
        return res.status(404).send({"error":"invalid poperty update"})
    }
    try {
        const user= await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch (error) {
        res.status(400).send(err)
    }
})
router.delete('/users/:id', async(req, res) => {
    const id=req.params.id
    try {
       
        const user = await User.findByIdAndDelete(id)
        console.log(user)
        if (!user) {
            res.status(404).send()
        }    
        console.log('y')  
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})
module.exports =router