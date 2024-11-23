import { Hero } from "@/db/operations";
import { ValidateCreateHero } from "./route-validator";

export default async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const heroes = await Hero.findAll();
        res.json({ status: true, data: heroes });
        break;
      case "POST":
        await ValidateCreateHero(req, res);
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
