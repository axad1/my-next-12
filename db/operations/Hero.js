const Hero = require("../models/Hero");

const findAll = async () => await Hero.find();

const create = async (hero) => await Hero.create(hero);

const findOne = async (filter) => await Hero.findOne(filter);

const findById = async (id) => await Hero.findById(id);

module.exports = {
  findAll,
  create,
  findOne,
  findById,
};
