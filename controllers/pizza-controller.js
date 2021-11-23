const { Pizza } = require("../models");

const pizzaController = {
  //GET all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //GET one pizza
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        //If no pizza found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //CREATE one pizza
  createPizza({ body }, res) {
    console.log(body);
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },
  //UPDATE one pizza by Id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //DELETE one pizza by Id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = pizzaController;
