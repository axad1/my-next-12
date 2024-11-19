const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const checkValidation = async (req, res, validations) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const result = validationResult(req, { strictParams: ["body"] });
  if (!result.isEmpty()) return res.status(404).json(result.array());
  req.body = matchedData(req, {
    locations: ["body"],
  });
  req.params = matchedData(req, {
    locations: ["params"],
  });
};

const CreateHero = checkSchema(
  {
    superHero: {
      exists: {
        bail: true,
        errorMessage: "Superhero name required",
      },
      trim: true,
      notEmpty: true,
      errorMessage: "Superhero name value is invalid",
    },
    realName: {
      exists: {
        bail: true,
        errorMessage: "Real name required",
      },
      trim: true,
      notEmpty: true,
      errorMessage: "Superhero name value is invalid",
    },
  },
  ["body"]
);

const GetHero = checkSchema(
  {
    id: {
      isNumeric: true,
      errorMessage: "id should be a numeric value",
    },
  },
  ["params"]
);

const UpdateHero = checkSchema(
  {
    id: {
      in: "params",
      isInt: true,
      errorMessage: "id should be a numeric value",
    },
    content: {
      optional: true,
      trim: true,
      notEmpty: true,
      escape: true,
      errorMessage: "content value is invalid",
    },
    completed: {
      optional: true,
      isBoolean: {
        errorMessage: "completed field should contain boolean value",
      },
    },
  },
  ["body"]
);

const ValidateCreateHero = (req, res) => checkValidation(req, res, CreateHero);
const ValidateUpdateHero = (req, res) => checkValidation(req, res, UpdateHero);

module.exports = {
  ValidateCreateHero,
};
