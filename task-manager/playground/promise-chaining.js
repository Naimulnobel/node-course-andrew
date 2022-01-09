require('../src/db/mongoose')
const User = require('../src/models/user')
User.findByIdAndUpdate("61da5e9ce1feed06e7fb71c2", {age:27}).then(
    (user) => {
        console.log(user)
        return User.countDocuments({age:26})
    }
).then((result)=> {
    console.log(result)
}).catch((err) => {
    console.log(err)
})