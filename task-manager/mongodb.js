// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
    // db.collection('users').insertOne({name:'nobel', age: 27})
    // db.collection('users').updateOne({
    //     _id: new ObjectID('61d9219e533bfb26cc2fdb4d')
    // }, {
    //     $set: {
    //         name: 'kalu'
    //     }
    // }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
    // db.collection('tasks').updateMany(
    //     { completed: false },
    //     { $set: { completed: true } }
    // ).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((err) => {
    //     console.log(err)
    // })
    // db.collection('users').deleteMany({
    //     age: 25
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
    db.collection('tasks').deleteOne({
        description: 'cleaning room'
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

})