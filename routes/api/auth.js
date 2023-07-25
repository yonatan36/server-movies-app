const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const usersValidationServise = require("../../validation/usersValidationServise");
const idValidationServise = require("../../validation/idValidationService");
const userAccessDataService = require("../../model/users/models/userAccessData");
const usersServiceModel = require("../../model/users/usersService");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const chalk = require("chalk");
const jwt = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");
const User = require("../../model/users/Users");
//http://localhost:8181/api/users/register
//register
router.post("/register", async (req, res) => {
  try {
    req.body = normalizeUser(req.body);
    const register = await usersValidationServise.registerUserValidation(
      req.body
    );
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await userAccessDataService.registerUser(req.body);
    res.status(200).json(register);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/users/login
//login
router.post("/login", async (req, res) => {
  try {
    await usersValidationServise.loginUserValidation(req.body);
    const userData = await userAccessDataService.getUserByEmail(req.body.email);
    if (!userData) {
      throw new CustomError("invalid email and/or password");
    }
    const isPasswordMatch = await bcrypt.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      throw new CustomError("invalid email and/or password");
    }
    const token = await jwt.generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
//http://localhost:8181/api/users/:id
//update user
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      let updateNormalUser = await normalizeUser(req.body, req.userData._id);
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      await usersValidationServise.updateUserValidation(req.body);
      updateNormalUser = await normalizeUser(req.body, req.userData._id);
      const updateUser = await usersServiceModel.updateUser(
        id,
        updateNormalUser
      );
      res.status(200).json({
        msg: `user - ${updateUser.name.firstName} ${updateUser.name.lastName} update!`,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

//http://localhost:8181/api/users
//get all users
router.get(
  "/",
  authmw,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      const getAll = await userAccessDataService.getUsers(req.body);

      res.json(getAll);
    } catch (err) {
      res.json(err).status(400);
    }
  }
);

router.get("/userInfo", authmw, (req, res) => {
  let user = req.userData;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.send(user))
    .catch((errorsFromMongoose) => res.status(500).send(errorsFromMongoose));
});

//http://localhost:8181/api/users/:id
//delete user
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const dataFromDb = await userAccessDataService.deleteUser(id);
      res.json({
        msg: `user - ${dataFromDb.name.firstName} ${dataFromDb.name.lastName} deleted`,
      });
    } catch (err) {
      res.json(err).status(400);
    }
  }
);

router.patch("/:id", authmw, async (req, res) => {
  try {
    const id = req.params.id;
    await idValidationServise.idValidation(id);
    const updateUser = await userAccessDataService.updateBizUser(id);

    res.json(
      `${updateUser.name.firstName} ${updateUser.name.lastName}  isBusiness - ${updateUser.isBusiness}`
    );
  } catch (err) {
    res.json(err).status(400);
  }
});

module.exports = router;
