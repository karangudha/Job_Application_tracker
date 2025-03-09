import mongoose, { Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

export default mongoose.model('RefreshToken', refreshTokenSchema);