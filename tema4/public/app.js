// public/app.js

const userForm = document.getElementById('userForm');
const userListDiv = document.getElementById('userList');

async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    displayUsers(data);
  } catch (err) {
    console.error('Eroare la preluarea utilizatorilor:', err);
  }
}

function displayUsers(users) {
  userListDiv.innerHTML = '';
  if (users.length === 0) {
    userListDiv.innerHTML = '<p><em>Nu există utilizatori în baza de date.</em></p>';
    return;
  }

  const ul = document.createElement('ul');
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `
      ${user.id}. ${user.name} - ${user.email}
      <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editează</button>
      <button onclick="deleteUser(${user.id})">Șterge</button>
    `;
    ul.appendChild(li);
  });
  userListDiv.appendChild(ul);
}

async function editUser(id, name, email) {
  const newName = prompt('Introduceți noul nume:', name);
  const newEmail = prompt('Introduceți noul email:', email);

  if (newName && newEmail) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, email: newEmail })
    });
    const updatedUser = await response.json();
    fetchUsers(); // Reîncărcăm lista după actualizare
  }
}

async function deleteUser(id) {
  const confirmDelete = confirm('Sunteți sigur că doriți să ștergeți acest utilizator?');
  if (confirmDelete) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers(); // Reîncărcăm lista după ștergere
  }
}

userForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const userData = {
    name: nameInput.value,
    email: emailInput.value
  };

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    fetchUsers(); // Reîncărcăm lista după adăugarea unui utilizator
    userForm.reset();
  } catch (err) {
    console.error('Eroare la trimiterea datelor formularului:', err);
  }
});

// Apelăm fetchUsers la încărcarea paginii pentru a arăta utilizatorii
fetchUsers();
