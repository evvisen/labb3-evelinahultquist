const db = require("./../config/db");

//Hämta alla kategorier
function getAllCategories() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Category";
    db.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

//Lägg till en ny kategori
function createCategory(categoryName, categoryType) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO Category (categoryName, categoryType) VALUES (?, ?)";
    let params = [categoryName, categoryType];

    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

//Hämta en specifik kategori
function getCategoryById(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Category WHERE categoryId = ?";
    db.query(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Vi returnerar hela arrayen 'rows' till controllern
        resolve(rows);
      }
    });
  });
}

//radera en kategori
function deleteCategory(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Category WHERE categoryId= ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
    });
  });
}

//uppdatera en kategori
function updateCategory(id, categoryName, categoryType) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE Category SET categoryName = ?, categoryType = ? WHERE categoryId = ?";

    db.query(sql, [categoryName, categoryType, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

//hämta statistik
function getCategoryStats() {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT categoryType, COUNT(*) as count FROM Category GROUP BY categoryType";

    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}
module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getCategoryStats,
};
