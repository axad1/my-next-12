import { Hero } from "../../../db/operations";

export default async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const heroes = await Hero.findAll();
        res.json({ status: true, data: heroes });
        break;
      case "POST":
        const body = req.body;
        console.log("body => ", body);
        const hero = await Hero.create(req.body);
        res.status(201).json({ status: true, data: hero });
        break;

      default:
        throw new Error("Method not allowed");
    }
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};
