import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { UserModel, ShelterModel } from './models/User.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/users')

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, terms } = req.body
    UserModel.create({ firstName, lastName, email, password, terms })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.post('/addshelter', (req, res) => {
    const { firstName, lastName, email, password, shelterName, phone, address } = req.body
    ShelterModel.create({ firstName, lastName, email, password, shelterName, phone, address })
        .then(shelter => res.json(shelter))
        .catch(err => res.json(err))
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user && user.password === password) {
                const accessToken = jwt.sign({ email: email, userType: 'user' }, 'user-access-secret', { expiresIn: '1m' })
                const refreshToken = jwt.sign({ email: email, userType: 'user' }, 'user-refresh-secret', { expiresIn: '10m' })
                res.cookie('accessToken', accessToken, { maxAge: 60000 })
                res.cookie('refreshToken', refreshToken, { maxAge: 600000, httpOnly: true, secure: true, sameSite: 'strict' })
                return res.json({ Login: true })
            } else {
                return res.json({ Login: false, Message: "Invalid email or password" })
            }
        })
        .catch(err => res.json(err))
})

app.post('/shelterlogin', (req, res) => {
    const { email, password } = req.body;
    ShelterModel.findOne({ email })
        .then(shelter => {
            if (shelter && shelter.password === password) {
                const accessToken = jwt.sign({ email: email, userType: 'shelter' }, 'shelter-access-secret', { expiresIn: '1m' })
                const refreshToken = jwt.sign({ email: email, userType: 'shelter' }, 'shelter-refresh-secret', { expiresIn: '10m' })
                res.cookie('accessToken', accessToken, { maxAge: 60000 })
                res.cookie('refreshToken', refreshToken, { maxAge: 600000, httpOnly: true, secure: true, sameSite: 'strict' })
                return res.json({ Login: true })
            } else {
                return res.json({ Login: false, Message: "Invalid email or password" })
            }
        })
        .catch(err => res.json(err))
})

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.json({ valid: false, message: "No access token" })
    }
    jwt.verify(accessToken, 'user-access-secret', (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid access token" })
        }
        req.user = decoded;
        next();
    })
}

const verifyShelter = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.json({ valid: false, message: "No access token" })
    }
    jwt.verify(accessToken, 'shelter-access-secret', (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid access token" })
        }
        req.shelter = decoded;
        next();
    })
}

// Route to fetch user data based on the user's email
app.get('/user-data', verifyUser, (req, res) => {
    UserModel.findOne({ email: req.user.email })
        .then(user => {
            if (user) {
                return res.json(user);
            } else {
                return res.json({ message: "User not found" });
            }
        })
        .catch(err => res.json(err))
})

app.get('/shelter-data', (req, res) => {
    ShelterModel.findOne({ email: req.shelter.email })
        .then(shelter => {
            if (shelter) {
                return res.json(shelter);
            } else {
                return res.status(404).json({ message: "Shelter not found" });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        });
})


app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ valid: true, message: "User authorized" })
})

app.get('/shelterdashboard', verifyShelter, (req, res) => {
    return res.json({ valid: true, message: "Shelter authorized" })
})

app.listen(3001, () => {
    console.log("Server is Running")
})
