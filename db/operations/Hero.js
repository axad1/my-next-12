const Hero = require("@/db/models/Hero");

const findAll = () => Hero.find();

const create = (hero) => Hero.create(hero);

const findOne = (filter) => Hero.findOne(filter);

const findById = (id) => Hero.findById(id);

const updateById = (id, data) =>
  Hero.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => Hero.findByIdAndDelete(id);

module.exports = {
  findAll,
  create,
  findOne,
  findById,
  updateById,
  deleteById,
};
