import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, getAllUsers } from '../models/userModel.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'your-secret-key', 
    { expiresIn: '24h' }
  );
};

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        msg: 'Please provide name, email, and password' 
      });
    }

    // Check if user already exists in database
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        msg: 'User already exists with this email' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into PostgreSQL
    const newUser = await createUser(name, email, hashedPassword);

    // Generate JWT token
    const token = generateToken(newUser.id);

    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.created_at
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }
    res.status(500).json({ msg: 'Server error during registration', error: error.message });
  }
};

// Login user using PostgreSQL
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        msg: 'Please provide email and password' 
      });
    }

    // Find user in PostgreSQL
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ 
        msg: 'Invalid credentials' 
      });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        msg: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error during login', error: error.message });
  }
};

// Get all users (sanitized, for debugging or administrative purposes)
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ msg: 'Server error fetching users', error: error.message });
  }
};