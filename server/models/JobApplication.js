//Job application model
const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Applied'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
