const transactionService = require("../services/transactionService");

// Hämta alla med JOIN
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Skapa ny
exports.createTransaction = async (req, res) => {
  try {
    const {
      transactionUserId,
      transactionCategoryId,
      transactionAmount,
      transactionDate,
      transactionCompanyName,
    } = req.body;

    const result = await transactionService.createTransaction({
      userId: transactionUserId,
      categoryId: transactionCategoryId,
      amount: transactionAmount,
      date: transactionDate,
      company: transactionCompanyName,
    });

    res
      .status(201)
      .json({ message: "Transaktion skapad", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sök (VG)
exports.searchTransactions = async (req, res) => {
  try {
    const { q } = req.query;
    const results = await transactionService.searchTransactions(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Uppdatera
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionAmount, transactionCategoryId, transactionCompanyName } =
      req.body;

    const result = await transactionService.updateTransaction(id, {
      amount: transactionAmount,
      categoryId: transactionCategoryId,
      company: transactionCompanyName,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaktionen hittades inte" });
    }
    res.json({ message: "Transaktion har uppdaterats!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Radera
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await transactionService.deleteTransaction(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaktionen hittades inte" });
    }
    res.json({ message: "Transaktionen har raderats!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//spenderat per kategori
exports.getSpendingStats = async (req, res) => {
  try {
    const stats = await transactionService.getSpendingByCategory();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
