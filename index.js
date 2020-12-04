const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("./public"));

nunjucks.configure("views", {
	autoescape: true,
	express: app,
});

app.use(async (req, res, next) => {
	await next();
	res.render("index.html");
});

app.listen(PORT, () => console.log("Server is running on 8080"));
