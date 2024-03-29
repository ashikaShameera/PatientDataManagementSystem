if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate"); //for boilerplate
const mongoose = require("mongoose"); //for database
const methodOverride = require("method-override");

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public"))); //this used for get css work
app.use(methodOverride("_method")); //This use for method-overide

const userRoutes = require("./routes/userRoute");
const patientRoute = require("./routes/patientRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoute = require("./routes/adminRoute");
const nurseRoute = require("./routes/nurseRoute");
const reportRoute = require("./routes/reportRoute");
const pharmacistRoute = require("./routes/pharmacistRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const insurerRoute = require("./routes/insurerRoute");
const paymentRoute = require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

//MongoDb connction code
mongoose.connect("mongodb://127.0.0.1:27017/PatientDataManagementSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(cookieParser());
app.use(express.json()); //for parsing url encorded
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/patient", patientRoute); //Going to patient route
app.use("/doctor", doctorRoute); //going to doctor route
app.use("/admin", adminRoute); //going to admin route
app.use("/nurse", nurseRoute);
app.use("/report", reportRoute);
app.use("/pharmacist", pharmacistRoute);
app.use("/admin/appointment", appointmentRoute); //going to admin/apponitmentRoute
app.use("/insurer", insurerRoute);
app.use("/payment", paymentRoute);
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.get("/", (req, res) => {
  res.render("home");
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
  console.log("SERVING ON PORT 8080");
});
