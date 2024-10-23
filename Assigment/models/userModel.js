const db = require('./db');
const bcrypt = require('bcryptjs');

class User {
  static create({ username, email, password }) {
    console.log(username , email , password)
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

      db.run(query, [username, email, hashedPassword], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  static findByEmail(email) {
    console.log(email)
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`;
      db.get(query, [email], (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = ?`;
      db.get(query, [id], (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  }
}

module.exports = User;
