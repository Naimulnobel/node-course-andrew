const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')
router.post('/tasks', auth, async (req, res) => {
    // const tasks = new Task(req.body);
    const tasks = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await tasks.save()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(500).send(err)
    }
    // tasks.save().then(() => { res.status(201).send(req.body) }).catch(err => { res.status(400).send(err) })
})

router.get('/tasks', auth, async (req, res) => {

    const match={}
    const sort={}
    if (req.query.completed) {
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'? -1: 1
    }
    try {
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.send(500).send(err)
    }


    // Task.find({}).then(task => {
    //     res.send(task)

    // }).catch(err => { 
    //     res.status(400).send(err)
    // })
})

router.get('/tasks/:id',auth, async (req, res) => {
    const taskId = req.params.id
    try {
        // const task = await Task.findById(taskId)
        const task= await Task.findOne({_id:taskId,owner:req.user._id})
        if (!task) {
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

router.patch('/tasks/:id',auth, async (req, res) => {
    const id = req.params.id
    const upadtes = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOpretor = upadtes.every((update) => allowedUpdates.includes(update))
    if (!isValidOpretor) {
        return res.status(404).send({ "error": "invalid poperty update" })
    }
    try {
        // const tasks= await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        const tasks = await Task.findOne({_id:id, owner:req.user._id})
        
        if (!tasks) {
            return res.status(404).send()
        }
        upadtes.forEach(update => tasks[update] = req.body[update])
        await tasks.save()

        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
});
router.delete('/tasks/:id', auth,async (req, res) => {
    const id = req.params.id
    try {

        const task = await Task.findOneAndDelete({_id:id, owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (error) { 
        res.status(500).send()
    }
})
module.exports = router