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
      isMongoId: true,
      errorMessage: "Invalid MongoId",
    },
  },
  ["query"]
);

const DeleteHero = checkSchema(
  {
    id: {
      isMongoId: true,
      errorMessage: "Invalid MongoId",
    },
  },
  ["query"]
);

const UpdateHero = checkSchema(
  {
    id: {
      in: "query",
      isMongoId: true,
      errorMessage: "Invalid MongoId",
    },
    superHero: {
      optional: true,
      trim: true,
      notEmpty: true,
      escape: true,
      errorMessage: "superHero value is invalid",
    },
    realName: {
      optional: true,
      trim: true,
      notEmpty: true,
      escape: true,
      errorMessage: "realName value is invalid",
    },
  },
  ["body"]
);

const ValidateCreateHero = (req, res) => checkValidation(req, res, CreateHero);
const ValidateGetHero = (req, res) => checkValidation(req, res, GetHero);
const ValidateUpdateHero = (req, res) => checkValidation(req, res, UpdateHero);
const ValidateDeleteHero = (req, res) => checkValidation(req, res, DeleteHero);

module.exports = {
  ValidateCreateHero,
  ValidateGetHero,
  ValidateUpdateHero,
  ValidateDeleteHero,
};
