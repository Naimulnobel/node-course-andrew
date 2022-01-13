const express = require('express')

const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router();
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    // user.save().then(() => { res.status(201).send(user) }).catch(err => {
    //     res.status(400).send(err)
    // })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }


})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)

    // User.find({}).then((allUsers) => res.status(200).send(allUsers)).catch(err => {
    //     res.status(400).send(err)
    // })
})
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(err)
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
// })
router.patch('/users/me', auth, async (req, res) => {
    const upadtes = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOpretor = upadtes.every((update) => allowedUpdates.includes(update))
    if (!isValidOpretor) {
        return res.status(404).send({ "error": "invalid poperty update" })
    }
    console.log(req.user)
    try {
        // const user= await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        // const user = await req.user

        upadtes.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        if (!req.user) {
            return res.status(404).send()
        }
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send()
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try {

        // const user = await User.findByIdAndDelete(req.user._id)
        // console.log(user)
        // if (!user) {
        //     res.status(404).send()
        // }
        // console.log('y')
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(token, user)
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
// User.watch().on('change', data => console.log(new Date(), data));
module.exports = router