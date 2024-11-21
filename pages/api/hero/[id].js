import { Hero } from "@/db/operations";
import {
  ValidateGetHero,
  ValidateUpdateHero,
  ValidateDeleteHero,
} from "./route-validator";

export default async (req, res) => {
  try {
    const {
      query: { id },
    } = req;
    switch (req.method) {
      case "GET": {
        await ValidateGetHero(req, res);
        const hero = await Hero.findById(id);
        if (!hero) throw new Error("Record not found against this id");
        res.json({ status: true, data: hero });
        break;
      }
      case "PUT": {
        await ValidateUpdateHero(req, res);
        const hero = await Hero.updateById(id, req.body);
        if (!hero) throw new Error("Record not found against this id");
        res.status(200).json({ status: true, data: hero });
        break;
      }
      case "DELETE": {
        await ValidateDeleteHero(req, res);
        const hero = await Hero.deleteById(id);
        if (!hero) throw new Error("Record not found against this id");
        res.status(200).json({ status: true, data: hero });
        break;
      }
      default:
        throw new Error("Method not allowed");
    }
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};
