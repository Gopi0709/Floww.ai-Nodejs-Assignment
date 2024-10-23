const db = require('./db');

class Transaction {
  static create({ type, category, amount, date, description, userId }) {
    const query = `INSERT INTO transactions (type, category, amount, date, description, user_id) VALUES (?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(query, [type, category, amount, date, description, userId], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  static findAllByUser(userId) {
    const query = `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`;

    return new Promise((resolve, reject) => {
      db.all(query, [userId], (err, transactions) => {
        if (err) return reject(err);
        resolve(transactions);
      });
    });
  }

  static findById(id) {
    const query = `SELECT * FROM transactions WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, transaction) => {
        if (err) return reject(err);
        resolve(transaction);
      });
    });
  }

  static update(id, { type, category, amount, date, description }) {
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.run(query, [type, category, amount, date, description, id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  static delete(id) {
    const query = `DELETE FROM transactions WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Transaction;
