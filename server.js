const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const concertSchema = new mongoose.Schema(
  {
    artist: { type: String, default: '' },
    tourName: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    date: { type: String, default: '' },
    ticketPrice: { type: Number, min: 0, default: 0 },
    experience: { type: String, default: '' }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      }
    }
  }
);

const Concert = mongoose.model('Concert', concertSchema);

const exampleConcerts = [
  {
    artist: 'ATEEZ',
    tourName: 'The Fellowship',
    city: 'Berlin',
    country: 'Germany',
    date: '2023-02-15',
    ticketPrice: 120,
    experience: 'First time seeing my ultimate group. It was an unforgettable experience that made me fall even more in love with ATEEZ and their music.'
  },
  {
    artist: 'NCT DREAM',
    tourName: 'The Dream Show 2',
    city: 'Berlin',
    country: 'Germany',
    date: '2023-04-03',
    ticketPrice: 150,
    experience: "Felt like a dream I don't want to wake up from."
  }
];

app.get('/', (req, res) => {
  res.send('K-Pop Concert Tracker Backend Running');
});

app.get('/api/concerts', async (req, res, next) => {
  try {
    const concerts = await Concert.find().sort({ date: 1 });
    res.json(concerts);
  } catch (error) {
    next(error);
  }
});

app.post('/api/concerts', async (req, res, next) => {
  try {
    const newConcert = await Concert.create(req.body);
    res.status(201).json(newConcert);
  } catch (error) {
    next(error);
  }
});

app.get('/api/concerts/:id', async (req, res, next) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      return res.status(404).json({ message: 'Concert not found' });
    }

    res.json(concert);
  } catch (error) {
    next(error);
  }
});

app.put('/api/concerts/:id', async (req, res, next) => {
  try {
    const updatedConcert = await Concert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedConcert) {
      return res.status(404).json({ message: 'Concert not found' });
    }

    res.json(updatedConcert);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/concerts/:id', async (req, res, next) => {
  try {
    const deletedConcert = await Concert.findByIdAndDelete(req.params.id);

    if (!deletedConcert) {
      return res.status(404).json({ message: 'Concert not found' });
    }

    res.json({ message: 'Concert deleted' });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid concert ID' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing. Create backend/.env using .env.example.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const concertCount = await Concert.countDocuments();
    if (concertCount === 0) {
      await Concert.insertMany(exampleConcerts);
      console.log('Example concerts added to the empty database');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
