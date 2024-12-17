const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "ahmed@gmail.com",
    places: 10,
    image: "",
    password: "123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "ahmed@gmail.com",
    places: 1,
    image: "",
    password: "123",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "ahmed@gmail.com",
    places: 5,
    image: "",
    password: "123",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "ahmed@gmail.com",
    places: 2,
    image: "",
    password: "123",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "ahmed@gmail.com",
    places: 3,
    image: "",
    password: "123",
  },
];

exports.getUsers = (req, res, next) => {
  if (!DUMMY_USERS || DUMMY_USERS.length === 0) {
    return next(new HttpError("Could not find any users.", 404));
  }

  res.status(200).json({ message: "ok", users: DUMMY_USERS });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((item) => {
    return item.email === email && item.password === password;
  });

  if (!user) {
    return next(new HttpError("email or password wrong", 404));
  }

  res.status(200).json({
    message: "user login successifully",
  });
};
exports.register = (req, res, next) => {
  const { email, name, password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return next(new HttpError("passwords not matched"), 401);
  }
const checkUser = DUMMY_USERS.find((item)=>{
  return item.email===email;
})

if(checkUser){
  return next(new HttpError("this user already exist"), 200);
}
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ message: "user created success" });
};
