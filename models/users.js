import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    isActive: { type: Boolean, default: true }
});

// Pre-save hook to hash the password before saving the users
usersSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

// Method to compare given password with the hashed password stored in the database
usersSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const users = mongoose.model('users', usersSchema);

export default users;

