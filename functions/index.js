const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("views", "./views")
app.set("view engine","ejs");


app.get("/", (req, res) => {
    res.render("pages/index");
})

app.get("/profile", (req, res) => {
    res.render("pages/profile", {page:"profile"});
})

app.get("/home", (req, res) => {
    res.render("pages/home", {page:"home"});
})

app.get("/request", (req, res) => {
    res.render("pages/request", {page:"request"});
})

app.get("/shop", (req, res) => {
    res.render("pages/shop", {page:"shop"});
})


app.get("/myschedule", (req, res) => {
    res.render("pages/myschedule", {page:"myschedule"});
})


app.get("/editprofile", (req, res) => {
    res.render("pages/editprofile", {page:"editprofile"});
})
app.get("/login", (req, res) => {
    res.render("pages/login");
})

app.get("/signup", (req, res) => {
    res.render("pages/signup");
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
