const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

app.post("/send-message", (req, res) => {
  const { userName, message } = req.body;

  fs.readFile("messages.json", "utf8", (err, data) => {
    if (err) throw err;

    let messages = JSON.parse(data || "[]");

    messages.push({ userName, message });

    fs.writeFile("messages.json", JSON.stringify(messages, null, 2), err => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.get("/get-messages", (req, res) => {
  fs.readFile("messages.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data || "[]"));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
