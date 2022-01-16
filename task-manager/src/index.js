const express = require('express')
require('./db/mongoose')
const multer = require('multer')
const res = require('express/lib/response')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000
// app.use((req, res, next) => {
//    if(req.method === 'GET'){

//    }else{
//        next()
//    }
// })
// app.use((req, res, next) => {
//     res.status(503).send("Site is currently unavailable. Please try again")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => { console.log('listening on port' + port) })

const jwt = require('jsonwebtoken')
const Task = require('./models/task')
const User = require('./models/user')
// const myFunction = async () => {
//     const password = 'red1234'
//     const hasedPassword = await bcrypt.hash(password, 8)
//     console.log(password, hasedPassword)
//     const isMatch = await bcrypt.compare(password, hasedPassword)
//     console.log(isMatch)
// }
// myFunction()
// const myFunction = async () => {
//     const token = jwt.sign({ id: 'abc' }, 'thisismyid', { expiresIn: '7 days' })
//     console.log(token)
//     const data = jwt.verify(token, 'thisismyid')
//     console.log(data)
// }
// myFunction()
// const main = async () => {
//     // const task = await Task.findById("61e0eacf893fe303a93d462a")
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user=await User.findById('61dff6340b6306050ee1b9eb')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()
const upload = multer({ dest: 'images' })
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()

})