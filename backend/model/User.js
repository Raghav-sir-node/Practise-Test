import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
    },
     "mobilenumber": {
        type: Number,
        required: true,
        unique: true
    },
    "role": {
        type: String,
        enum: ['user', 'admin'], //Enumeration
        default: "user",
    },
    "verified":{
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", userSchema)