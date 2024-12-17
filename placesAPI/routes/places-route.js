const { Router } = require("express");
const { check } = require("express-validator");
const {
  getPlacesById,
  getPlacesByUserId,
  addNewPlace,
  updatePlace,
  deletePlace,
  gettAllPlaces,
} = require("../controllers/places-controller");
const router = Router();

router.get("/", gettAllPlaces);

router.get("/:pid", getPlacesById);

router.get("/user/:uid", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  addNewPlace
);
router.put("/:pid", updatePlace);
router.delete("/:pid", deletePlace);
module.exports = router;
