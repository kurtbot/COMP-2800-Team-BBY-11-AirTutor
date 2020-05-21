var minus_sign = "<svg aria-hidden=\"true\" id=\"minus-svg\" focusable=\"false\"data-prefix=\"fas\" data-icon=\"minus\" class=\"svg - inline--fa fa - minus fa - w - 14\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path fill=\"currentColor\" d=\"M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z\"></path></svg>";
var plus_sign = "<svg aria-hidden=\"true\" id=\"plus-svg\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plus\" class=\"svg-inline--fa fa-plus fa-w-14\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path fill=\"currentColor\" d=\"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z\"></path></svg>"

addOpen(document.getElementById("question1"), document.getElementById("sign1"), document.getElementById("answer1"));
addOpen(document.getElementById("question2"), document.getElementById("sign2"), document.getElementById("answer2"));
addOpen(document.getElementById("question3"), document.getElementById("sign3"), document.getElementById("answer3"));
addOpen(document.getElementById("question4"), document.getElementById("sign4"), document.getElementById("answer4"));
addOpen(document.getElementById("question5"), document.getElementById("sign5"), document.getElementById("answer5"));
addOpen(document.getElementById("question6"), document.getElementById("sign6"), document.getElementById("answer6"));
addOpen(document.getElementById("question7"), document.getElementById("sign7"), document.getElementById("answer7"));
addOpen(document.getElementById("question8"), document.getElementById("sign8"), document.getElementById("answer8"));

function addClose(question, signLoc, answer) {
    answer.style.display = "block";
    signLoc.innerHTML = minus_sign;
    question.onclick = function () {
        addOpen(question, signLoc, answer);
    };
}

function addOpen(question, signLoc, answer) {
    answer.style.display = "none";
    signLoc.innerHTML = plus_sign;
    question.onclick = function () {
        addClose(question, signLoc, answer);
    };
}

/**
 * Open and close side navigation
 * Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav
 */

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}