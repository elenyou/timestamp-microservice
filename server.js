// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/api/timestamp/:date_string?", function(req, res) {
  const dateString= req.params.date_string;
  const getTimestamp = (date) => ({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  let timestamp;

  if (dateString === undefined || dateString.trim() === "") {
   timestamp = getTimestamp(new Date());
  } else {
    const date = !isNaN(dateString)
      ? new Date(parseInt(dateString))
      : new Date(dateString);

    if (!isNaN(date.getTime())) {
      timestamp = getTimestamp(date);
    } else {
      timestamp = {
        error: "invalid date"
      };
    }
    res.end(JSON.stringify(timestamp));
  }
});

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
