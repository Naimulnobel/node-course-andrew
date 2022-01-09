const mongoose = require('mongoose');
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


// const me = new User({
//     name: '    jony',
//     age: 45,
//     email: 'Nohn@example.com',
//     password: 'kalu1234'
// })
// me.save().then(() => { console.log(me) }).catch((err) => { console.log(err) })


// const tasks = new Task({
//     description: 'creating api',
//     completed: false
// })
// tasks.save().then(() => { console.log(tasks) }).catch((err) => { console.log(err) })