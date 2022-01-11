const express = require('express')
require('./db/mongoose')
const res = require('express/lib/response')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => { console.log('listening on port' + port) })

const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const password = 'red1234'
//     const hasedPassword = await bcrypt.hash(password, 8)
//     console.log(password, hasedPassword)
//     const isMatch = await bcrypt.compare(password, hasedPassword)
//     console.log(isMatch)
// }
// myFunction()
const myFunction = async () => {
    const token = jwt.sign({ id: 'abc' }, 'thisismyid', { expiresIn: '7 days' })
    console.log(token)
    const data = jwt.verify(token, 'thisismyid')
    console.log(data)
}
myFunction()