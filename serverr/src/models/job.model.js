import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, "company name is required"],
    },
    position: {
        type: String,
        required: [true, "job position is required"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending',
    },
    worktype: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance'],
        default: 'full-time',
    },
    location: {
        type: String,
        required: [true, "Work location is required"],
        default: "Pune",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},
    { timestamps: true }
);

export default mongoose.model('Job', jobSchema);