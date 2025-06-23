const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: function () { return !this.googleId; }, // Not required if using Google
            unique: true,
            trim: true,
            minlength: 3,
            sparse: true // Allows null values to prevent unique index conflicts
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: function () { return !this.googleId; }, // Not required if using Google
            minlength: 6,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true // Allows null values to prevent unique index conflicts
        },
        displayName: {
            type: String,
            trim: true
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'staff', 'staff_warehouse', 'staff_shipping'],
            default: 'user'
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        phone: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Skip hashing if password isn't modified or if using Google auth
    if (!this.isModified('password') || this.googleId) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    // Check if password exists before comparing
    if (!this.password) {
        return false; // No password (likely Google OAuth user)
    }
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
