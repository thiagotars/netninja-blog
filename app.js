const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// connect to db
const dbURI =
  "mongodb+srv://thiagotarsitano:Kvz152424@cluster0.ryazgd4.mongodb.net/net-ninja-blog?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    //  mongoose connect is async, placing app.listen inside here makes sure app will only start listening once connection is done
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    })
  )
  .catch((err) => console.log(err));

// REGISTER VIEW ENGINE
// app.set lets us configure some application settings. view engine is one of those settings. and we are gonna use ejs as view engine
// now it knows that ejs is gonna be use to create template
// this will automatically look in views folder
app.set("view engine", "ejs");

// MIDDLEWARE
// urlencoded parses urlencoded data into an object. good to work with forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about new blog",
//     body: "more about new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("652d9c751a04181c29beb248")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/", (req, res) => {
//   //   res.send("<p>home page</p>");
//   //   res.sendFile("./views/index.html", { root: __dirname });
//   // send and sendfile will automatically adds status code 200

//   // when using ejs as view engine, use res.render
//   //   first argument - ejs file in views folder || second argument - object passed into ejs file
//   const blogs = [
//     {
//       title: "Yoshi finds eggs",
//       snippet: "Blah blah blah lorem ipsum, Blah blah blah lorem ipsum.",
//     },
//     {
//       title: "Mario finds stars",
//       snippet: "Blah blah blah lorem ipsum, Blah blah blah lorem ipsum.",
//     },
//     {
//       title: "How to defeat Bowser",
//       snippet: "Blah blah blah lorem ipsum, Blah blah blah lorem ipsum.",
//     },
//   ];
//   res.render("index", { title: "Home", blogs });
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// app.use(blogRoutes);
// we can scope using '/blogs' here, so in blogsRoutes, we only use the complemetary paths
app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  //   res.send("<p>about page</p>");
  //   res.sendFile("./views/about.html", { root: __dirname });
  // send and sendfile will automatically adds status code 200
  res.render("about", { title: "About" });
});

// app.get("/blogs/create", (req, res) => {
//   //   res.send("<p>about page</p>");
//   //   res.sendFile("./views/about.html", { root: __dirname });
//   // send and sendfile will automatically adds status code 200
//   res.render("create", { title: "Create a new blog" });
// });

//redirect with express
app.get("/about-us", (req, res) => {
  res.redirect("/about");
  // redirect will automatically adds status code 301
});

// 'use' will run every time if the code gets to it. so it will try matching all path above, if doesnt find match this middleware runs
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  // if we doesnt explicitly declare a 404 code, sendFile will automatically send a 200 status
  res.render("404", { title: "404" });
});
