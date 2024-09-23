const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        default: null
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String, 
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    patientSummary: {
        type: String,
        required: false
    },
    approval: {
        type: Boolean,
        required: false,
        default: null
    },
    completionStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    appointmentType: {
        type: String,
        required: true,
        default: null
    },
    meetingId: {
        type: String,
        default: null
    }
}, { collection: 'appointments' });

const Patient = mongoose.model('Appointment', patientSchema);

module.exports = Patient;
