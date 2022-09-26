const { response } = require("express");
const  Category  = require("../models/category");

const categoriesGet = async (req, res = response) => {


  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  try {
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .populate("client", "name")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);
    return res.status(200).json({ total, categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const categoryGet = async (req, res = response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("client", "name");
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const categoryCreate = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const id = req.body._id;

  try {
    const categoriaDB = await Category.findOne({ name });

    if (categoriaDB) {
      return res.status(400).json({
        msg: `Category ${categoriaDB.name}, exists`,
      });
    }

    const data = {
      name,
      client: id,
    };

    const category = new Category(data);

    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const categoryUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { state, client, ...data } = req.body;

  try {
    data.name = data.name.toUpperCase();

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }

  
};

const categoryDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const categoryDeleted = await Category.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );

    return res.status(200).json(categoryDeleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }

};

module.exports = {
    categoriesGet,
    categoryGet,
    categoryCreate,
    categoryUpdate,
    categoryDelete,
};
