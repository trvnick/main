// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Definim modelul 'User' ce corespunde tabelului "users" din baza de date
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Sincronizăm modelul cu baza de date
User.sync().then(() => {
  console.log('Modelul User a fost sincronizat cu baza de date.');
}).catch(err => {
  console.error('Eroare la sincronizarea modelului User:', err);
});

module.exports = User;
