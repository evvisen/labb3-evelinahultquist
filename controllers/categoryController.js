const categoryService = require("./../services/categoryService");

//Visa alla kategorier
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Lägg till en ny kategori
exports.createCategory = async (req, res) => {
  const { categoryName, categoryType } = req.body;

  if (!categoryName || !categoryType) {
    return res.status(400).json({ message: "Både namn och typ krävs" });
  }

  try {
    const result = await categoryService.createCategory(
      categoryName,
      categoryType
    );
    return res.status(201).json({
      message: "kategori skapad!",
      error: "",
      id: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

//Hämta en specifik kategori
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await categoryService.getCategoryById(id);

    // Om databasen inte hittade någon rad är arrayen tom
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Kategorin hittades inte",
      });
    }

    // Om den finns skickar vi det första objektet i arrayen
    res.json(categories[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//Radera en kategori
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoryService.deleteCategory(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategorin hittades inte" });
    }

    res.json({ message: "Kategorin raderad!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//uppdatera en kategori
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, categoryType } = req.body;

  try {
    const result = await categoryService.updateCategory(
      id,
      categoryName,
      categoryType
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategorin hittades inte" });
    }

    res.json({ message: "Kategorin uppdaterad!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//visa statistik

exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await categoryService.getCategoryStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
