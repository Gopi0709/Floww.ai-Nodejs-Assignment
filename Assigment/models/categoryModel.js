const db = require('./db');

class Category {
    static create({ name, type }) {
        const query = `INSERT INTO categories (name, type) VALUES (?, ?)`;
        
        return new Promise((resolve, reject) => {
            db.run(query, [name, type], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, type });
            });
        });
    }

    static findAll() {
        const query = `SELECT * FROM categories`;

        return new Promise((resolve, reject) => {
            db.all(query, [], (err, categories) => {
                if (err) return reject(err);
                resolve(categories);
            });
        });
    }
}

module.exports = Category;
