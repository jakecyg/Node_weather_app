const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const weatherStack = require("./utils/weatherStack");

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//storing express app location
const app = express();

//Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

/* #region  Express Route Handler */
//Setup static directory to serve. This is how the server sends response when a user tries to get smth at a different route.
//ex. app.com/help, app.com/about
//2 arguments: 1= partial route 2= function(what you want to do when certain route is called)
//this automatically sets the getter for the root directory and fetches the index.html file by default
/* #endregion */
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  //by callig res.render: express goes off and gets that view; it then converts it into html and makes sure the html gets back to the requester.
  res.render("index", {
    title: "Weather",
    name: "Jake Choi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jake Choi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "Help Page",
    name: "Jake Choi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide a valid location.",
    });
  }
  geoCode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      weatherStack(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          currentWeather: data,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

/* #region  404 Render */
//This matches for everything that hasn't matches yet
//ex. with the /help page, it starts top to bottom of this page in order to find the corresponding route
app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    message: "Help article not found.",
    name: "Jake Choi",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    message: "Page not found",
    name: "Jake Choi",
  });
});
/* #endregion */

//start server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
