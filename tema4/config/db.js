// config/db.js
const { Sequelize } = require('sequelize');

// Inițializează o instanță Sequelize pentru conexiunea la baza de date
const sequelize = new Sequelize('lab4', 'postgres', 'Pegasus@1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // dezactivează logging-ul pentru a evita poluarea consolei
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Testează conexiunea la baza de date
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexiune la baza de date reușită.');
    return true;
  } catch (error) {
    console.error('Eroare de conectare la baza de date:', error);
    return false;
  }
}

// Exportăm atât instanța sequelize cât și funcția de testare
module.exports = {
  sequelize,
  testConnection
};
