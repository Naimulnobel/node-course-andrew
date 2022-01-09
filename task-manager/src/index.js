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
app.post('/tasks', (req, res) => {
    const tasks = new Task(req.body);
    tasks.save().then(() => { res.status(201).send(req.body) }).catch(err => { res.status(400).send(err) })
})
app.listen(port, () => { console.log('listening on port' + port) })