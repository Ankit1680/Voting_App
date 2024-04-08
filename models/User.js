const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email: {
        type: String,
        
    },
    address:{
        type: String,
        required: true,
    },
    aadharCard: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['voter','admin'],
        default: 'voter',
    },
    isVoted:{
        type: Boolean,
        default:false,
    }
});

UserSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only when the password is modified
    if (!person.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with hashedPassword
        person.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
});



UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
