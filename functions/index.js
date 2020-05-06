const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');




const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/", (req, res) => {
    res.render("pages/index");
})

app.get("/profile", (req, res) => {
    res.render("pages/profile");
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.helloWorld = functions.https.onRequest(app);
