const express = require("express");
const HttpError = require('./models/http-error')
const placesRoute = require("./routes/places-route");
const usersRouter = require('./routes/users-route')
const app = express();
app.use(express.json());

app.use("/api/places", placesRoute);
app.use("/api/users",usersRouter );
app.use((req,res,next)=>{
const error = new HttpError('Could not find this route',404);
throw error;
})
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unkwon error occure",
  });
});
app.listen(5000, () => {
  console.log("connect to localhost:5000");
});
