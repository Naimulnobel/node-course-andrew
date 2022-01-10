const express = require('express')
const router=new express.Router()
const tasks = require('../models/task')
router.post('/tasks', async(req, res) => {
    const tasks = new Task(req.body);
    try {
        await tasks.save()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(500).send(err)
    }
    // tasks.save().then(() => { res.status(201).send(req.body) }).catch(err => { res.status(400).send(err) })
})

router.get('/tasks', async(req, res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.send(500).send(err)
    }
    

    // Task.find({}).then(task => {
    //     res.send(task)
        
    // }).catch(err => { 
    //     res.status(400).send(err)
    // })
})

router.get('/tasks/:id', async(req, res) => {
    const taskId=req.params.id
    try {
        const task= await Task.findById(taskId)
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
        
    }
    // Task.findById(taskId).then(task => {
    //     if(!task){
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch(err => {
    //     res.status(500).send(err)
    // })
})

router.patch('/tasks/:id', async(req, res) => {
    const id = req.params.id
    const upadtes= Object.keys(req.body)
    const allowedUpdates=['completed','description']
    const isValidOpretor=upadtes.every((update)=>allowedUpdates.includes(update))
    if (!isValidOpretor) {
        return res.status(404).send({"error":"invalid poperty update"})
    }
    try {
        const tasks= await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if(!tasks){
            return res.status(404).send()
        }
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
});
router.delete('/tasks/:id', async(req, res) => {
    const id=req.params.id
    try {
       
        const task = await Task.findByIdAndDelete(id)
        
        if (!task) {
            res.status(404).send()
        }    
          
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})
module.exports =router