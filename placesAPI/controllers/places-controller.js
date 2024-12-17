const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const DummyPlaces = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Beautiful Beach",
    description: "A serene beach with crystal-clear waters and golden sands.",
    address: "123 Ocean Drive, Seaside City",
    creator: "u1",
    location: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Mountain Retreat",
    description: "A peaceful mountain cabin with breathtaking views.",
    address: "456 Mountain Road, Highland Village",
    creator: "u2",
    location: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1505253213344-53a3b5e52e34",
    title: "Urban Getaway",
    description: "A modern apartment located in the heart of the city.",
    address: "789 City Street, Downtown Metropolis",
    creator: "u1",
    location: { lat: 51.5074, lng: -0.1278 },
  },
];

exports.gettAllPlaces = (req, res, next) => {
  res.status(200).json({ places: DummyPlaces });
};
exports.getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DummyPlaces.find((item) => {
    return item.id === Number(placeId);
  });

  console.log(place);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  res.status(200).json({
    message: "OK",
    place: place,
  });
};

exports.getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DummyPlaces.filter((item) => {
    return item.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user.", 404)
    );
  }
  console.log(places);
  res.status(200).json({
    message: "OK",
    places: places,
  });
};

exports.addNewPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Inavlid inputs", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DummyPlaces.push(createdPlace);
  res.status(201).json({
    message: "ok",
    place: createdPlace,
    allPlaces: DummyPlaces,
  });
};
//updatePlace,
exports.updatePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const { title, description, coordinates, address, creator } = req.body;

  const newPlace = {
    id: placeId,
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  const oldPlaceIndex = DummyPlaces.findIndex((item) => {
    return item.id === placeId;
  });

  if (!oldPlaceIndex) {
    HttpError("cannot found this place", 404);
  }
  DummyPlaces[oldPlaceIndex] = newPlace;

  res.status(200).json({ message: "ok", places: DummyPlaces });
};
//deletePlace,

exports.deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const placeIndex = DummyPlaces.findIndex((item) => {
    return item.id === placeId;
  });

  if (!placeIndex) {
    HttpError("cannot found this place", 404);
  }

  DummyPlaces.splice(placeIndex, 1);
  res.status(200).json({ message: "deleted" });
};
