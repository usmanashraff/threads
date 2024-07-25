import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type:String,
        required:true
    },
    image:{
        type:String
    },
    bio:{
        type:String,
    },

    threads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }],
    onBoarded:{
        type:Boolean,
        default: false
    },
    communities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community'
    }]
    
})

const User = mongoose.models?.users || mongoose.model('users', userSchema)

export default User;