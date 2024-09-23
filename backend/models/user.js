const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    role: { type: String, enum: ['Patient', 'Admin', 'Doctor'], required: true },
    adminUniqueId: { 
        type: String, 
        required: function() { return this.role === 'Admin'; } 
    },  
    experience: { 
        type: String, 
        required: function() { return this.role === 'Doctor'; } 
    },    
    specialization: { 
        type: String, 
        required: function() { return this.role === 'Doctor'; } 
    }, 
    doctorIdNo: { 
        type: String, 
        required: function() { return this.role === 'Doctor'; } 
    },     
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uniqueId: { type: String } 
});

UserSchema.pre('save', async function(next) {
    if (this.isNew && this.role === 'Patient') {
        this.uniqueId = generateUniqueId(); 
    }

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

function generateUniqueId() {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
}

module.exports = mongoose.model('User', UserSchema);
