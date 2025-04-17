// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rutele existente (GET și POST)
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// Rutele pentru editare și ștergere utilizatori
router.put('/users/:id', userController.updateUser);  // Modifică utilizatorul după ID
router.delete('/users/:id', userController.deleteUser);  // Șterge utilizatorul după ID

module.exports = router;
