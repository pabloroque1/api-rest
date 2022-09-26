const { response } = require("express");
const  Product = require("../models/product");

const productsGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("client", "name")
        .populate("category", "name")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    return res.status(200).json({
      total,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const productGet = async (req, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("client", "name")
      .populate("category", "name");

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const productCreate = async (req, res = response) => {
  const { state, client, ...body } = req.body;

  try {
    const productoDB = await Product.findOne({ name: body.name });

    if (productoDB) {
      return res.status(400).json({
        msg: `Product ${productoDB.nombre}, exists`,
      });
    }

    const data = {
      ...body,
      name: body.name.toUpperCase(),
      client: req.body.client,
    };

    const product = new Product(data);

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const productUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { state, client, ...data } = req.body;

  try {
    if (data.name) {
      data.name = data.name.toUpperCase();
    }

    data.client = req.client._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }
};

const productDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const productDeleted = await Product.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
    
    return res.status(200).json(productDeleted);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing request" });
  }

};

module.exports = {
  productsGet,
  productGet,
  productCreate,
  productUpdate,
  productDelete,
};
