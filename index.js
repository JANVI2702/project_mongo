const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const book_store = require("./models/userSchema");

const port = 8081;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("node_modules"));
app.use(express.static("public"));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  book_store
    .find({})
    .then((data) => {
      return res.render("index", {
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.post("/insertData", (req, res) => {
  let editId = req.body.editId;
  if (editId) {
    book_store
      .findByIdAndUpdate(editId, { ...req.body })
      .then((data) => {
        console.log("book data updates");
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    book_store
      .create({ ...req.body })
      .then((data) => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
});

app.get("/deleteData/:id", (req, res) => {
  let { id } = req.params;
  book_store
    .findByIdAndDelete(id)
    .then((data) => {
      console.log(data);
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.get("/editData/:id", (req, res) => {
  let { id } = req.params;
  book_store
    .findById(id)
    .then((data) => {
      return res.render("edit", {
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.listen(port, (err) => {
  if (!err) {
    database;
    console.log("server start successfully \nhttp://localhost:" + port);
  }
});
