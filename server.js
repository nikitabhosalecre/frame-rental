const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Equipment Data
let equipment = [
  { id: 1, name: '🚜 Tractor', price: 1500, image: 'https://via.placeholder.com/200', rating: 4 },
  { id: 2, name: '🌱 Seeder', price: 800, image: 'https://via.placeholder.com/200', rating: 3 },
  { id: 3, name: '🌾 Harvester', price: 3000, image: 'https://via.placeholder.com/200', rating: 5 },
  { id: 4, name: '💧 Sprayer', price: 600, image: 'https://via.placeholder.com/200', rating: 4 }
];

// Booking storage
let bookings = [];

// Get equipment
app.get('/equipment', (req, res) => {
  res.json(equipment);
});

// Rent equipment
app.post('/rent', (req, res) => {
  const { id, name, date } = req.body;

  bookings.push({ id, name, date });

  res.json({
    message: `✅ Booking confirmed for ${name} on ${date}`
  });
});

// View bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
app.get('/stats', (req, res) => {
  res.json({
    totalBookings: bookings.length,
    totalEquipment: equipment.length
  });
});
let selectedId;

function openModal(id) {
  selectedId = id;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function confirmBooking() {
  const name = document.getElementById('userName').value;
  const date = document.getElementById('date').value;

  fetch('http://localhost:5000/rent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id: selectedId, name, date })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    closeModal();
  });
}