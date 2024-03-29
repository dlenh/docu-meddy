const express = require("express");
const app = express();
const PORT = 9999;
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(session);
const homeRoutes = require("./routes/home");
const editRoutes = require("./routes/edit");
const interactionRoutes = require("./routes/interaction");

require("dotenv").config({path: "./config/.env"});
require("./config/passport")(passport);
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(logger("dev"));

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// app.use("/", interactionRoutes);
app.use("/", homeRoutes);
app.use("/edit", editRoutes);
app.use("/interaction", interactionRoutes);

app.listen(PORT, () => console.log("Server is running!"));