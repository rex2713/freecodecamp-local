// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/:date?", (req, res) => {
  let inputData = req.params.date;
  if (!inputData) {
    console.log(inputData);
    inputData = new Date().toUTCString();
  }
  if (typeof inputData !== "number" && isNaN(inputData)) {
    let dataObject = new Date(inputData).toUTCString();
    // console.log(dataObject);
    let unixTimeStamp = new Date(inputData).getTime();
    if (unixTimeStamp !== "number" && isNaN(unixTimeStamp)) {
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: unixTimeStamp, utc: dataObject });
  } else {
    let unixTimeStamp = parseInt(inputData);
    let dataObject = new Date(unixTimeStamp).toUTCString();
    let testObj = new Date(dataObject).getTime();
    if (testObj !== "number" && isNaN(testObj)) {
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: unixTimeStamp, utc: dataObject });
  }

  //unix轉換utc測試
  // const unix = 1451001600000;
  // const unix1 = new Date(unix).toUTCString();
  // console.log(unix1);

  // let unixTimeStamp = Date.parse(dataObject);
  // console.log(unixTimeStamp);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// process.env.PORT
