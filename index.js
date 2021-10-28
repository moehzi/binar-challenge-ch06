const { Router, request } = require("express");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes/routes");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(expressLayouts);

app.use("/assets", express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => console.log(`app listening on port localhost:${PORT}`));
