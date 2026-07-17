const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/users.json');
const users = JSON.parse(fs.readFileSync(file, 'utf8'));

users.forEach(u => {
  u.weeklyPoints = Math.floor(u.ecoPoints * (Math.random() * 0.4));
  u.monthlyPoints = Math.floor(u.ecoPoints * (0.4 + Math.random() * 0.4));
});

fs.writeFileSync(file, JSON.stringify(users, null, 2));
