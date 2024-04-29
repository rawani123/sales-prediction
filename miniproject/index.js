import express from 'express';
import mongoose from 'mongoose';
import Item from './models/data.model.js';
import cors from 'cors';

const app = express();
const port = 3000;

// MongoDB URI
const uri = "mongodb://localhost:27017/ml";

// Connect to MongoDB
mongoose.connect(uri);

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());

// API endpoint to retrieve data from MongoDB
app.get('/api/items', (req, res) => {
  Item.find({})
    .then(items => {
      // console.log(items)
      res.status(200).json({ success: true, data: items }); // Send retrieved items as JSON response
    })
    .catch(err => {
      console.error("Error occurred while retrieving items:", err);
      res.status(500).json({ error: "An error occurred while retrieving items" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
