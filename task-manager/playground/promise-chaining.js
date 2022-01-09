require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
// User.findByIdAndUpdate("61da5e9ce1feed06e7fb71c2", {age:27}).then(
//     (user) => {
//         console.log(user)
//         return User.countDocuments({age:26})
//     }
// ).then((result)=> {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })
Task.deleteMany({completed: false}).then(function(){
    console.log("Data deleted"); // Success
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log(result)
}

).catch(function(error){
    console.log(error); // Failure
});