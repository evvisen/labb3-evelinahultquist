const db = require("./../config/db");

// 1. Hämta alla transaktioner med kategorinamn (INNER JOIN)
function getAllTransactions() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT t.transationId, t.transactionDate, t.transactionCompanyName, t.transactionAmount, c.categoryName
      FROM Transaction t
      INNER JOIN Category c ON t.transactionCategoryId = c.categoryId
    `;
    db.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// 2. Lägg till en transaktion
function createTransaction(data) {
  return new Promise((resolve, reject) => {
    const { userId, categoryId, amount, date, company } = data;
    const sql =
      "INSERT INTO Transaction (transactionUserId, transactionCategoryId, transactionAmount, transactionDate, transactionCompanyName) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [userId, categoryId, amount, date, company],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

// 3. Sök transaktioner (VG-krav)
function searchTransactions(searchTerm) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Transaction WHERE transactionCompanyName LIKE ?";
    db.query(sql, [`%${searchTerm}%`], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// 4. Uppdatera en transaktion
function updateTransaction(id, data) {
  return new Promise((resolve, reject) => {
    const { amount, categoryId, company } = data;
    const sql =
      "UPDATE Transaction SET transactionAmount = ?, transactionCategoryId = ?, transactionCompanyName = ? WHERE transationId = ?";
    db.query(sql, [amount, categoryId, company, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// 5. Radera en transaktion
function deleteTransaction(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Transaction WHERE transationId = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

//Visa spenderat per kategori (INNER JOIN)
function getSpendingByCategory() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT Category.categoryName, SUM(Transaction.transactionAmount) AS totalAmount
      FROM Transaction
      INNER JOIN Category ON Transaction.transactionCategoryId = Category.categoryId
      GROUP BY Category.categoryName
    `;

    db.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}
module.exports = {
  getAllTransactions,
  createTransaction,
  searchTransactions,
  updateTransaction,
  deleteTransaction,
  getSpendingByCategory,
};
