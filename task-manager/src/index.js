const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => { res.status(201).send(user) }).catch(err => {
        res.status(400).send(err)
    })
})
app.get('/allUsers', (req, res) => {
    User.find({}).then((allUsers) => res.status(200).send(allUsers)).catch(err => {
        res.status(400).send(err)
    })
})
app.get('/users/:id',(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const tasks = new Task(req.body);
    tasks.save().then(() => { res.status(201).send(req.body) }).catch(err => { res.status(400).send(err) })
})
app.get('/tasks', (req, res)=>{
    Task.find({}).then(task => {
        res.send(task)
        
    }).catch(err => { 
        res.status(400).send(err)
    })
})

app.get('/tasks/:id', (req, res) => {
    const taskId=req.params.id
    Task.findById(taskId).then(task => {
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.listen(port, () => { console.log('listening on port' + port) })