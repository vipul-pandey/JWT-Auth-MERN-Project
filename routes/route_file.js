const dotenv = require("dotenv");
const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({ path: './config.env' });

const People = require('../model/schema');
app.use(cookieParser());

router.post("/signup", async (req, res) => {
    try {
        const { name, gender, email, password, type, phone } = req.body;
        if (!name || !gender || !email || !password || !type || !phone) {
            res.status(422).json({ msg: "Plz filled all the fields  " })
        } else {
            const match = await People.findOne({ email: email });
            if (match) {
                return res.status(421).json({ msg: "Email already exists" })
            }
            const user = new People({ name, gender, email, password, type, phone })

            const result = await user.save();
            console.log(result)

            res.status(201).json({ msg: "User resistered successfully..." })
        }
    } catch (error) {
        res.send(error)
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: 'Plz fill both the fields ...' })
        }
        const user_login = await People.findOne({ email: req.body.email });
        if (user_login) {
            const isMatch = await bcrypt.compare(password, user_login.password);
            if (!isMatch) {
                return res.status(400).json({ status: 400, message: 'Invalid creditial' })
            }
            // generating token
            const token = jwt.sign({ _id: user_login._id }, process.env.SECRET)

            // token = await user_login.generateAuthToken();
            // console.log(token)

            res.cookie('jwt_token', token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000 // 1 day
            })
            return res.status(201).json(user_login)
        } else {
            return res.status(400).json({ status: 400, message: 'Invalid creditials' })
        }
    } catch (error) {
        res.send(error)
    }
});

router.get("/users", async (req, res) => {
    try {
        const cookie = req.cookies["jwt_token"];
        const claims = jwt.verify(cookie, process.env.SECRET);
        if (!claims) {
            throw createError(401, 'unauthorized')
        }
        const user = await People.findOne({ _id: claims._id })
        const { password, ...data } = await user.toJSON();
        res.send(data);
        // console.log(data)
    } catch (error) {
        res.status(402).send("You are not loggin")
    }
});

router.get('/student_list', async (req, res) => {
    try {
        const getList = await People.find({ "type": "Student" });
        res.status(200).send(getList)
    } catch (error) {
        res.status(404).send('not get the list')
    }
});

router.get('/student_list/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getOnlyOne = await People.findById(_id, req.body, {
            name: true
        });
        // console.log(getOnlyOne)
        res.send(getOnlyOne);
    } catch (e) {
        console.log('error aa rha h')
    }
});

router.patch('/student_list/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await People.findByIdAndUpdate(_id, req.body, {
            name: true
        });
        console.log(updateStudent)
        if (!updateStudent) {
            res.send('student not found')
        }
        res.send(updateStudent)
    } catch (e) {
        console.log(e)
    }
});

router.post('/logout', async (req, res) => {
    res.cookie('jwt_token', { maxAge: 0 })
    res.send({
        message: 'Logout successful'
    })
})

module.exports = router;


