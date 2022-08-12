const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorMiddleware } = require("./middlewares");
const fileUpload = require("express-fileupload");

const corsOptions = {
	origin: "*",
	methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
	preflightContinue: true,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	allowedHeaders: ["Content-Type", "x-auth-token"],
	exposedHeaders: ["x-auth-token"]
};

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({}));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "logs")));
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api", require("./api"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	errorMiddleware(err, req, res, next);
});

module.exports = app;
