// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a schema for the members collection
const memberSchema = new mongoose.Schema({
  name: String,
  email: String, // Make sure it's email and not Email (case-sensitive)
  age: Number,
  parent_id: Number,
});

// Create a model from the schema
const Member = mongoose.model('Member', memberSchema);

// API routes

// GET all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find(); // Fetch all members
    console.log(members); // Log members to check the email
    res.json(members); // Return the members
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new member
app.post('/members', async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body to make sure email is being sent
    const newMember = new Member(req.body); // Create a new member from the body
    await newMember.save(); // Save the new member to DB
    res.status(201).json(newMember); // Respond with the new member's data
  } catch (error) {
    res.status(500).json({ message: 'Error saving member' });
  }
});

// PUT (update) a member by ID
app.put('/members/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember); // Return the updated member
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
});

// DELETE a member by ID
app.delete('/members/:id', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    res.json(deletedMember); // Return the deleted member
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});
