const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let concerts = [
  {
    id: 1,
    artist: "ATEEZ",
    tourName: "The Fellowship",
    city: "Berlin",
    country: "Germany",
    date: "2023-02-15",
    ticketPrice: 120,
    experience: "First time seing my ultimate group before realizing what I got myself into. It was an unforgettable experience that made me fall even more in love with ATEEZ and their music."
  },
  {
    id: 2,
    artist: "NCT DREAM",
    tourName: "The Dream Show 2",
    city: "Berlin",
    country: "Germany",
    date: "2023-04-03",
    ticketPrice: 150,
    experience: "Felt like a dream I don't want to wake up from."
  }
];

app.get('/', (req, res) => {
  res.send('K-Pop Concert Tracker Backend Running');
});

app.get('/api/concerts', (req, res) => {
  res.json(concerts);
});

app.post('/api/concerts', (req, res) => {
  const newConcert = {
    id: concerts.length + 1,
    artist: req.body.artist,
    tourName: req.body.tourName,
    city: req.body.city,
    country: req.body.country,
    date: req.body.date,
    ticketPrice: req.body.ticketPrice,
    experience: req.body.experience
  };

  concerts.push(newConcert);
  res.status(201).json(newConcert);
});

app.get('/api/concerts/:id', (req, res) => {
  const concertId = Number(req.params.id);
  const concert = concerts.find(item => item.id === concertId);

  if (!concert) {
    return res.status(404).json({ message: "Concert not found" });
  }

  res.json(concert);
});

app.put('/api/concerts/:id', (req, res) => {
  const concertId = Number(req.params.id);
  const concert = concerts.find(item => item.id === concertId);

  if (!concert) {
    return res.status(404).json({ message: "Concert not found" });
  }

  concert.artist = req.body.artist;
  concert.tourName = req.body.tourName;
  concert.city = req.body.city;
  concert.country = req.body.country;
  concert.date = req.body.date;
  concert.ticketPrice = req.body.ticketPrice;
  concert.experience = req.body.experience;

  res.json(concert);
});

app.delete('/api/concerts/:id', (req, res) => {
  const concertId = Number(req.params.id);
  concerts = concerts.filter(item => item.id !== concertId);

  res.json({ message: "Concert deleted" });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});