const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send('<h2 style="color:red;">Пожалуйста, заполните все поля.</h2>');
  }

  const user = { username, password };

  // Сохраняем в файл
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  }
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  // Красивый HTML-ответ
  res.send(`
    <div style="
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      border-radius: 15px;
      background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    ">
      <h2 style="color: #10b981;">✅ Успешно зарегистрировано!</h2>
      <p><strong>👤 Имя пользователя:</strong> ${username}</p>
      <p><strong>🔒 Пароль:</strong> ${password}</p>
      <a href="/" style="display:inline-block; margin-top:15px; text-decoration:none; color:white; background:#3b82f6; padding:10px 20px; border-radius:8px;">Назад</a>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
