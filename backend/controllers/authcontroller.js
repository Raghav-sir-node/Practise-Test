import user from '../model/User.js'
import sendEmail from '../utils/sendEmail.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const generateToken = id => {
    return jwt.sign({ id }, "chutMaraniKe", { expiresIn: '7d' })
}

async function loginuser(req, resp) {
    const { email, password } = req.body

    try {
        const existingUser = await user.findOne({ email })

        if (existingUser && await bcrypt.compare(password, existingUser.password)) {
            resp.json({
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                token: generateToken(existingUser._id)
            })
        }
        else {
            resp.status(401).json({ message: "Invalid Email or Password" });
        }
    }
    catch (error) {
        console.log(error);
        return resp.status(501).json({ message: "Bhosda Error" })
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWRhZDY1ODI4MmY3ZTIyODM2NWZlMCIsImlhdCI6MTc4MDMyOTgzMiwiZXhwIjoxNzgwOTM0NjMyfQ.RDptjojSC7n9Z1YlwJqkPP81jnFgh9Pgqbept_gM_v8
async function registeruser(req, resp) {
    const { name, email, password, mobilenumber } = req.body;
    console.log(req.body)
    try {
        const existingUser = await user.findOne({ email });
    console.log(existingUser)

        if (existingUser) {
            return resp.status(400).json({ message: "Email already Registered" });
        }
        else {
            //encrypting the pass
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt);
            //insertion in DB
            const inserted = await user.create({ name, email, password: hashedPass, mobilenumber });

            if (inserted) {
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const message = `Thanks for Registering, Your OTP is ${otp}.
                Dont share your otp`
                // Mailing the otp
                await sendEmail(email, "Welcome- Your OTP is", message);

                resp.status(201).json({
                    id: inserted._id,
                    name: inserted.name,
                    email: inserted.email,
                    role: inserted.role,
                    token: generateToken(inserted._id)
                })

            }
            else {
                resp.status(500).json({ message: "not Inserted" })
            }
        }
    }
    catch (error) {
        resp.status(500).json({ message: "Server Error", error: error.message })
    }
}

async function getUser(req, resp) {
    try {
        const usersList = await user.find({}).select('-password')
        resp.json(usersList)
    }
    catch (error) {
        resp.status(500).json({ message: "Server Error" })
    }
}

export { loginuser, registeruser, getUser }
