const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("views", "./views")
app.set("view engine","ejs");


app.get("/aboutus", (req, res) => {
    res.render("pages/aboutus");
})

app.get("/aboutus2", (req, res) => {
    res.render("pages/aboutus2");
})

app.get("/editprofile", (req, res) => {
    res.render("pages/editprofile");
})
app.get("/faq", (req, res) => {
    res.render("pages/faq");
})

app.get("/faq2", (req, res) => {
    res.render("pages/faq2");
})
app.get("/home", (req, res) => {
    res.render("pages/home", {page:"home"});
})

app.get("/", (req, res) => {
    res.render("pages/index");
})
app.get("/login-verify", (req, res) => {
    res.render("pages/login-verify");
})

app.get("/login", (req, res) => {
    res.render("pages/login");
})
app.get("/messages", (req, res) => {
    res.render("pages/messages");
})
app.get("/messaging", (req, res) => {
    res.render("pages/messaging");
})
app.get("/livechat", (req, res) => {
    res.render("pages/livechat")
})
app.get("/myschedule", (req, res) => {
    res.render("pages/myschedule", {page:"myschedule"});
})
app.get("/post", (req, res) => {
    res.render("pages/post");
})
app.get("/profile", (req, res) => {
    res.render("pages/profile", {page:"profile"});
})
app.get("/rating", (req, res) => {
    res.render("pages/rating");
})
app.get("/request_confirm", (req, res) => {
    res.render("pages/request_confirm");
})
app.get("/request", (req, res) => {
    res.render("pages/request", {page:"request"});
})
app.get("/schedule_confirm", (req, res) => {
    res.render("pages/schedule_confirm");
})
app.get("/schedule", (req, res) => {
    res.render("pages/schedule");
})
app.get("/session", (req, res) => {
    res.render("pages/session");
})
app.get("/settings", (req, res) => {
    res.render("pages/settings");
})
app.get("/shop", (req, res) => {
    res.render("pages/shop", {page:"shop"});
})

app.get("/signup_verif", (req, res) => {
    res.render("pages/signup_verif");
})

app.get("/signup", (req, res) => {
    res.render("pages/signup");
})

app.get("/viewprofile", (req, res) => {
    res.render("pages/viewprofile");
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
