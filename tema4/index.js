// index.js (punctul de intrare al aplicației)

// Importăm modulele necesare
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize, testConnection } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User'); // Importăm explicit modelul User

// Creăm aplicația Express
const app = express();

// Middleware pentru parsarea datelor JSON și a datelor din formulare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servim fișierele statice din directorul "public" (frontend-ul)
app.use(express.static(path.join(__dirname, 'public')));

// Montăm rutele API sub prefixul /api
app.use('/api', userRoutes);

// Pornim sincronizarea cu baza de date și apoi serverul
const PORT = 3000;

async function startServer() {
  try {
    // Testăm conexiunea la baza de date
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Nu s-a putut stabili conexiunea cu baza de date. Serverul nu pornește.');
      process.exit(1);
    }

    // Sincronizăm modelele cu baza de date
    await sequelize.sync();
    console.log('Modelele au fost sincronizate cu baza de date.');

    // Pornim serverul
    app.listen(PORT, () => {
      console.log(`Serverul a pornit. Ascultă la http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Eroare la pornirea serverului:', error);
    process.exit(1);
  }
}

startServer();
