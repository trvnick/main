// controllers/userController.js
const User = require('../models/User');

// Funcție pentru obținerea tuturor utilizatorilor
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Eroare la obținerea utilizatorilor:', error);
    res.status(500).json({ message: 'Eroare la obținerea utilizatorilor.' });
  }
};

// Funcție pentru crearea unui nou utilizator
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Eroare la crearea utilizatorului:', error);
    res.status(500).json({ message: 'Eroare la crearea utilizatorului.' });
  }
};

// Funcție pentru actualizarea unui utilizator existent
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // ID-ul utilizatorului din URL
  const { name, email } = req.body;  // Numele și emailul noi trimise în body

  try {
    const user = await User.findByPk(id);  // Căutăm utilizatorul după ID

    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit!' });
    }

    // Actualizăm datele utilizatorului
    user.name = name;
    user.email = email;

    await user.save();  // Salvăm modificările în baza de date

    return res.json(user);  // Răspundem cu utilizatorul actualizat
  } catch (error) {
    console.error('Eroare la actualizarea utilizatorului:', error);
    return res.status(500).json({ message: 'Eroare la actualizarea utilizatorului.' });
  }
};

// Funcție pentru ștergerea unui utilizator existent
exports.deleteUser = async (req, res) => {
  const { id } = req.params;  // ID-ul utilizatorului din URL

  try {
    const user = await User.findByPk(id);  // Căutăm utilizatorul după ID

    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit!' });
    }

    await user.destroy();  // Ștergem utilizatorul din baza de date

    return res.status(204).send();  // Răspuns 204 No Content (ștergerea a avut loc cu succes)
  } catch (error) {
    console.error('Eroare la ștergerea utilizatorului:', error);
    return res.status(500).json({ message: 'Eroare la ștergerea utilizatorului.' });
  }
};
