import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/users.js';  
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;  

// Middleware to parse JSON bodies
app.use(express.json());

dotenv.config();

const mongoURL = process.env.MONGO_URL;

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

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, age, isActive } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).send({ error: 'Name, email, and password are required' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            age, 
            isActive 
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
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
