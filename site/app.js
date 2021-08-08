require('dotenv').config();
const express = require("express");
const app = express();
const port = 3001;

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const userRouter = require("./routes/users");
const animalRouter = require("./routes/animals");

// Database
const db = require("./util/database");
const passport = require("passport");

const User = require("./models/user");
const Animal = require("./models/animals");

const initPassport = require("./util/passport-config");
initPassport(passport);

// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(
  session({
    secret: "MySecret",
    store: new SequelizeStore({
      db: db,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use(animalRouter);
app.use(userRouter);

User.hasMany(Animal, {as:"Poster",foreignKey:"postedById"});
Animal.belongsTo(User, {as:"Poster",foreignKey:"postedById"})
// Animal

User.belongsToMany(Animal, {
    through: "animal_user",
    as: "requests",
    foreignKey: "user_id"
});

Animal.belongsToMany(User, {
    through: "animal_user",
    as: "applicants",
    foreignKey: "animal_id"
});

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
