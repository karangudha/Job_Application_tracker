import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validate: validator.isEmail,
                message: 'Please enter a valid email'
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be at least 6 characters"],
            select: true,
        },
        location: {
            type: String,
            default: 'India',
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
);

//middleware:

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//compare password:
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export default mongoose.model('User', userSchema);