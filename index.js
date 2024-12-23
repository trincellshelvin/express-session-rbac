import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticate from './middleware/auth.js';
import authorize from './middleware/role.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

dotenv.config();

const mongoURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Connect to MongoDB
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/dashboard', authenticate, (req, res) => { 
    res.send('This is the dashboard, accessible only to authenticated users.'); 
});

app.get('/admin', [authenticate, authorize(['admin'])], (req, res) => {
    res.send('This is the admin panel, accessible only to admin users.');
});

async function verifyPassword(email, plainPassword) { 
    try { 
        const user = await User.findOne({ email }); 
        if (!user) { 
            console.log('User not found'); 
            return false; 
        } 
        const isMatch = await user.comparePassword(plainPassword); 
        if (!isMatch) { 
            console.log('Invalid password'); 
        } else { 
            console.log('Password is valid'); 
        } 
        return isMatch; 
    } catch (error) { 
        console.error('Error verifying password:', error); 
        return false; 
    }
}

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, age, isActive, role } = req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            return res.status(400).send({ error: 'Name, email, and password are required' });
        }

        const newUser = new User({
            name,
            email,
            password,
            age,
            isActive,
            role
        });

        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email, password });

        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        console.log('User found:', user);

        const isMatch = await user.comparePassword(password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const payload = {
            userId: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role // Include the role in the payload
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated JWT:', token);
        res.status(200).send({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: error.message });
    }
});


app.post('/users', async (req, res) => {
    try {
        const { name, email, age, isActive } = req.body;
        const newUser = new User({
            name,
            email,
            age,
            isActive
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/users/active', async (req, res) => {
    try {
        const activeUsers = await User.find({ isActive: true });
        res.status(200).send(activeUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, isActive } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age, isActive }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.put('/users/:id/deactivate', async (req, res) => {
    try {
        const { id } = req.params;
        const deactivatedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!deactivatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(deactivatedUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
